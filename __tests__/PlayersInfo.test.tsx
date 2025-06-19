import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import PlayersInfo from "../src/app/(dashboard)/players-info/page";

// Mock fetch
global.fetch = jest.fn();

describe("PlayersInfo", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders loading state initially", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<PlayersInfo />);
    expect(screen.getByText("Loading players...")).toBeInTheDocument();
  });

  it("renders player cards when data is loaded", async () => {
    const mockPlayers = [
      {
        id: 1,
        name: "LeBron James",
        team: "Los Angeles Lakers",
        position: "Forward",
        birthDate: "December 30, 1984",
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlayers,
    });

    render(<PlayersInfo />);

    await waitFor(() => {
      expect(screen.getByText("LeBron James")).toBeInTheDocument();
      expect(screen.getByText("Forward • Los Angeles Lakers")).toBeInTheDocument();
      expect(screen.getByText("December 30, 1984")).toBeInTheDocument();
    });
  });

  it("renders error state when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<PlayersInfo />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});
