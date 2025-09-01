import React from "react";
import SoccerScoresClient from "@/components/soccer-scores-client";

interface Match {
  event_key: string;
  league_name: string;
  event_away_team: string;
  event_home_team: string;
  event_final_result: string;
  event_status: string;
  event_date: string;
  event_time?: string;
  event_away_team_logo?: string;
  event_home_team_logo?: string;
  league_country?: string;
}

/**
 * Soccer Scores Page - Displays live soccer scores and match information
 * Covers major European leagues with real-time updates
 */
export default async function SoccerScores() {
  try {
    // Fetch soccer results from our API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/soccer-results`, {
      cache: 'no-store', // Always fetch fresh data for live scores
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch soccer data');
    }
    
    const data = await response.json();
    const matches: Match[] = data.result || [];

    return <SoccerScoresClient matches={matches} />;
    
  } catch (error) {
    console.error("Error loading soccer scores:", error);
    return (
      <div>
        <h1 className="text-2xl font-bold">Soccer Scores</h1>
        <div className="mt-4 text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 text-lg">Unable to load soccer scores at the moment.</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
}