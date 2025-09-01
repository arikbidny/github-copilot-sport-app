import { NextRequest, NextResponse } from "next/server";
import { mockSoccerMatches, europeanLeagues } from "@/lib/soccer-data";

/**
 * GET /api/soccer-results
 * Fetches soccer match results from the AllSportsAPI
 * Covers major European leagues: Premier League, La Liga, Serie A, Bundesliga, Ligue 1
 * Falls back to mock data when API is not available
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_NBA_API_KEY;
    
    // If no API key is available, return mock data for demonstration
    if (!apiKey) {
      console.log("No API key found, returning mock soccer data");
      return NextResponse.json({
        result: mockSoccerMatches,
        success: 1
      });
    }

    const url = new URL("https://apiv2.allsportsapi.com/football/");
    
    // Get current date and next week for recent and upcoming matches
    const currentDate = new Date();
    const fromDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
    const toDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week ahead
    
    // Fetch matches from multiple leagues
    const allMatches = [];
    
    for (const league of europeanLeagues) {
      try {
        const params = {
          met: "Fixtures",
          APIkey: apiKey,
          from: fromDate.toISOString().split('T')[0],
          to: toDate.toISOString().split('T')[0],
          leagueId: league.id.toString(),
        };

        const urlWithParams = `${url}?${new URLSearchParams(
          params as Record<string, string>
        ).toString()}`;

        const response = await fetch(urlWithParams);
        
        if (response.ok) {
          const data = await response.json();
          if (data.result && Array.isArray(data.result)) {
            // Add league information to each match
            const matchesWithLeague = data.result.map((match: any) => ({
              ...match,
              league_name: league.name,
              league_country: league.country
            }));
            allMatches.push(...matchesWithLeague);
          }
        }
      } catch (leagueError) {
        console.error(`Error fetching ${league.name}:`, leagueError);
        // Continue with other leagues
      }
    }

    // If we got some matches from API, return them
    if (allMatches.length > 0) {
      return NextResponse.json({
        result: allMatches,
        success: 1
      });
    }

    // If API calls failed, fall back to mock data
    console.log("API calls failed, returning mock soccer data");
    return NextResponse.json({
      result: mockSoccerMatches,
      success: 1
    });
    
  } catch (error) {
    console.error("Error fetching soccer results:", error);
    
    // Return mock data on any error
    return NextResponse.json({
      result: mockSoccerMatches,
      success: 1
    });
  }
}