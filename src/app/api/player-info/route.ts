import { NextResponse } from "next/server";
import { playerInfo } from "@/lib/player-info";

export async function GET() {
  try {
    // Filter player data to include only required fields
    const filteredPlayers = playerInfo.map((player) => ({
      id: player.id,
      name: player.name,
      team: player.team,
      position: player.position,
      birthDate: player.birthDate,
    }));

    return NextResponse.json(filteredPlayers);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch player information" },
      { status: 500 }
    );
  }
}
