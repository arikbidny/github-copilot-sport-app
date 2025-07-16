import React from "react";
import Image from "next/image";

interface GameResult {
  id: string;
  event_date: string;
  event_home_team: string;
  event_away_team: string;
  event_home_team_logo: string;
  event_away_team_logo: string;
  event_final_result: string;
  event_status: string;
  event_stadium: string;
}

export default async function NBAScores() {
  try {
    const response = await fetch("http://localhost:3000/api/nba-results", {
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch NBA scores");
    }

    const data = await response.json();
    const results: GameResult[] = data.result;

    return (
      <div>
        <h1 className="text-2xl font-bold">NBA Scores</h1>
        <div className="grid grid-cols-2 gap-4">
          {results.map((game) => (
            <div key={game.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={game.event_away_team_logo}
                    alt={`${game.event_away_team} logo`}
                    className="w-6 h-6 mr-2"
                    width={24}
                    height={24}
                  />
                  <div>{game.event_away_team}</div>
                </div>
                <div className="text-xl font-bold">
                  {game.event_final_result}
                </div>
                <div className="flex items-center">
                  <Image
                    src={game.event_home_team_logo}
                    alt={`${game.event_home_team} logo`}
                    className="w-6 h-6 mr-2"
                    width={24}
                    height={24}
                  />
                  <div>{game.event_home_team}</div>
                </div>
              </div>
              <div className="text-center mt-2 text-gray-600">
                {new Date(game.event_date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading NBA scores:", error);
    return (
      <div>
        <h1 className="text-2xl font-bold">NBA Scores</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            Failed to load NBA scores. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
