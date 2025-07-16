import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConferenceCard from "../src/components/conference-card";

// Mock fetch globally
global.fetch = jest.fn();

const mockConferenceData = {
  title: "Test Conference",
  date: "2024-11-01",
  time: "8:00 PM",
  location: "Test Arena",
  transcription: "This is a test transcription for the press conference.",
};

describe("ConferenceCard", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders conference card with correct information", () => {
    render(<ConferenceCard {...mockConferenceData} />);
    
    expect(screen.getByText("Test Conference")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-11-01")).toBeInTheDocument();
    expect(screen.getByText("Time: 8:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Location: Test Arena")).toBeInTheDocument();
    expect(screen.getByText("This is a test transcription for the press conference.")).toBeInTheDocument();
    expect(screen.getByText("Summarize with AI")).toBeInTheDocument();
  });

  it("shows loading state when summarizing", async () => {
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ summary: "Test summary" })
      }), 100))
    );

    render(<ConferenceCard {...mockConferenceData} />);
    
    const button = screen.getByText("Summarize with AI");
    fireEvent.click(button);

    expect(screen.getByText("Summarizing...")).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("displays summary when API call succeeds", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ summary: "This is a test summary" })
    });

    render(<ConferenceCard {...mockConferenceData} />);
    
    const button = screen.getByText("Summarize with AI");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("AI Summary")).toBeInTheDocument();
      expect(screen.getByText("This is a test summary")).toBeInTheDocument();
    });
  });

  it("shows error when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: "API Error" })
    });

    render(<ConferenceCard {...mockConferenceData} />);
    
    const button = screen.getByText("Summarize with AI");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Failed to generate summary. Please try again.")).toBeInTheDocument();
    });
  });

  it("calls summarize API with correct data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ summary: "Test summary" })
    });

    render(<ConferenceCard {...mockConferenceData} />);
    
    const button = screen.getByText("Summarize with AI");
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcription: mockConferenceData.transcription }),
      });
    });
  });
});