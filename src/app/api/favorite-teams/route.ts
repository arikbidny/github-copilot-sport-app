import { NextRequest, NextResponse } from "next/server";
import { getFavoriteTeams, setFavoriteTeams } from "@/lib/user-storage";

/**
 * GET endpoint to retrieve user's favorite teams
 * Returns array of team IDs
 */
export async function GET() {
  try {
    const favoriteTeams = getFavoriteTeams();
    return NextResponse.json({ 
      favoriteTeams,
      success: true 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch favorite teams", success: false },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint to update user's favorite teams
 * Expects: { teamIds: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamIds } = body;

    if (!Array.isArray(teamIds)) {
      return NextResponse.json(
        { error: "teamIds must be an array", success: false },
        { status: 400 }
      );
    }

    // Validate team IDs (basic validation)
    const validTeamIds = teamIds.filter(id => typeof id === 'string' && id.length > 0);
    
    setFavoriteTeams(validTeamIds);

    return NextResponse.json({ 
      favoriteTeams: validTeamIds,
      success: true 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update favorite teams", success: false },
      { status: 500 }
    );
  }
}