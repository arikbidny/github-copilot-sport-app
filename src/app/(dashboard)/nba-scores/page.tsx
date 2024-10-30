import React from "react";

export default async function NBAScores() {
  let data = await fetch("http://localhost:3001/api/nba-results");
  let games = await data.json();

  const results = games.result;
  console.log(results);
  return (
    <div>
      <h1 className="text-2xl font-bold">NBA Scores</h1>
      <div className="grid grid-cols-2 gap-4">
        {results.map((game: any) => (
          <div key={game.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={game.event_away_team_logo}
                  alt={`${game.event_away_team} logo`}
                  className="w-6 h-6 mr-2"
                />
                <div>{game.event_away_team}</div>
              </div>
              <div className="text-xl font-bold">{game.event_final_result}</div>
              <div className="flex items-center">
                <img
                  src={game.event_home_team_logo}
                  alt={`${game.event_home_team} logo`}
                  className="w-6 h-6 mr-2"
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
}