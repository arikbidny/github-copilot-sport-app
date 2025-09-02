import { NextRequest, NextResponse } from "next/server";
import { allTeams, nbaTeams, soccerTeams } from "@/lib/teams-data";

/**
 * GET endpoint to retrieve available teams
 * Query parameters:
 * - league: 'NBA' | 'Soccer' | 'all' (optional, default 'all')
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const league = searchParams.get('league') || 'all';

    let teams;
    
    switch (league.toLowerCase()) {
      case 'nba':
        teams = nbaTeams;
        break;
      case 'soccer':
        teams = soccerTeams;
        break;
      default:
        teams = allTeams;
    }

    return NextResponse.json({
      teams,
      league,
      count: teams.length,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teams", success: false },
      { status: 500 }
    );
  }
}