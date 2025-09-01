"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useFavoriteTeams } from "@/hooks/use-favorite-teams";

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

interface SoccerScoresClientProps {
  matches: Match[];
}

/**
 * Client-side Soccer Scores component with search, filter, and favoriting functionality
 */
export default function SoccerScoresClient({ matches }: SoccerScoresClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const { favoriteTeams, toggleFavorite, isFavorite } = useFavoriteTeams();

  // Get unique leagues for filter dropdown
  const leagues = useMemo(() => {
    const uniqueLeagues = Array.from(new Set(matches.map(match => match.league_name)));
    return uniqueLeagues.sort();
  }, [matches]);

  // Filter matches based on search, filters, and favorites
  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchesSearch = searchTerm === "" || 
        match.event_away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.event_home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.league_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLeague = selectedLeague === "all" || match.league_name === selectedLeague;
      
      const matchesStatus = selectedStatus === "all" || match.event_status === selectedStatus;

      const matchesFavorites = !showFavoritesOnly || 
        isFavorite(match.event_away_team) || isFavorite(match.event_home_team);

      return matchesSearch && matchesLeague && matchesStatus && matchesFavorites;
    });
  }, [matches, searchTerm, selectedLeague, selectedStatus, showFavoritesOnly, isFavorite]);

  // Sort matches to show favorites first
  const sortedMatches = useMemo(() => {
    return [...filteredMatches].sort((a, b) => {
      const aHasFavorite = isFavorite(a.event_away_team) || isFavorite(a.event_home_team);
      const bHasFavorite = isFavorite(b.event_away_team) || isFavorite(b.event_home_team);
      
      if (aHasFavorite && !bHasFavorite) return -1;
      if (!aHasFavorite && bHasFavorite) return 1;
      return 0;
    });
  }, [filteredMatches, isFavorite]);

  // Group sorted matches by league
  const matchesByLeague = useMemo(() => {
    return sortedMatches.reduce((acc, match) => {
      const league = match.league_name || "Other";
      if (!acc[league]) {
        acc[league] = [];
      }
      acc[league].push(match);
      return acc;
    }, {} as Record<string, Match[]>);
  }, [sortedMatches]);

  // Sort leagues by priority
  const leaguePriority = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"];
  const sortedLeagues = Object.keys(matchesByLeague).sort((a, b) => {
    const aIndex = leaguePriority.indexOf(a);
    const bIndex = leaguePriority.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const getMatchStatusDisplay = (match: Match) => {
    switch (match.event_status) {
      case 'inplay':
        return {
          text: `${match.event_time || ''}' Live`,
          className: 'bg-red-100 text-red-800 animate-pulse'
        };
      case 'finished':
        return {
          text: 'Full Time',
          className: 'bg-gray-100 text-gray-800'
        };
      case 'not_started':
        return {
          text: new Date(match.event_date).toLocaleDateString(),
          className: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          text: new Date(match.event_date).toLocaleDateString(),
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const handleTeamFavorite = (teamName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(teamName);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Soccer Scores</h1>
          <div className="text-sm text-gray-500">
            Live scores from top European leagues
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Updates</span>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* First row: Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search teams or leagues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Second row: Filters */}
        <div className="flex flex-wrap gap-4">
          {/* League Filter */}
          <div className="min-w-48">
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Leagues</option>
              {leagues.map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div className="min-w-40">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="inplay">Live</option>
              <option value="finished">Finished</option>
              <option value="not_started">Upcoming</option>
            </select>
          </div>
          
          {/* Favorites Toggle */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Show favorites only ({favoriteTeams.length})
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {(searchTerm || selectedLeague !== "all" || selectedStatus !== "all" || showFavoritesOnly) && (
        <div className="mb-4 text-sm text-gray-600">
          Showing {sortedMatches.length} of {matches.length} matches
          {favoriteTeams.length > 0 && " (favorites first)"}
        </div>
      )}
      
      {sortedMatches.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚽</div>
          <p className="text-gray-600 text-lg">
            {searchTerm || selectedLeague !== "all" || selectedStatus !== "all" || showFavoritesOnly
              ? "No matches found for your search criteria." 
              : "No matches available at the moment."
            }
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {searchTerm || selectedLeague !== "all" || selectedStatus !== "all" || showFavoritesOnly
              ? "Try adjusting your filters or search terms." 
              : "Check back later for live scores and upcoming fixtures."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedLeagues.map((leagueName) => (
            <div key={leagueName} className="space-y-4">
              {/* League Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{leagueName}</h2>
                <span className="text-sm text-gray-500">
                  ({matchesByLeague[leagueName].length} matches)
                </span>
              </div>
              
              {/* Matches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchesByLeague[leagueName].map((match) => {
                  const status = getMatchStatusDisplay(match);
                  const isLive = match.event_status === 'inplay';
                  const hasAnyFavorite = isFavorite(match.event_away_team) || isFavorite(match.event_home_team);
                  
                  return (
                    <div 
                      key={match.event_key} 
                      className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
                        isLive ? 'ring-2 ring-red-200 bg-red-50' : ''
                      } ${hasAnyFavorite ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''}`}
                    >
                      <div className="space-y-3">
                        {/* League badge for mobile + favorite indicator */}
                        <div className="flex items-center justify-between md:justify-center">
                          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded md:hidden">
                            {match.league_name}
                          </span>
                          {hasAnyFavorite && (
                            <span className="text-xs text-yellow-600 font-medium bg-yellow-100 px-2 py-1 rounded">
                              ⭐ Favorite
                            </span>
                          )}
                        </div>
                        
                        {/* Match info */}
                        <div className="flex justify-between items-center">
                          {/* Away team */}
                          <div className="flex items-center flex-1 min-w-0">
                            {match.event_away_team_logo ? (
                              <Image
                                src={match.event_away_team_logo}
                                alt={`${match.event_away_team} logo`}
                                width={28}
                                height={28}
                                className="mr-2 rounded"
                              />
                            ) : (
                              <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-blue-200 rounded mr-2 flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600">
                                  {match.event_away_team.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 min-w-0">
                              <span className="text-sm font-medium truncate">
                                {match.event_away_team}
                              </span>
                              <button
                                onClick={(e) => handleTeamFavorite(match.event_away_team, e)}
                                className={`text-sm ${
                                  isFavorite(match.event_away_team) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                                } transition-colors`}
                                title={`${isFavorite(match.event_away_team) ? 'Remove from' : 'Add to'} favorites`}
                              >
                                ⭐
                              </button>
                            </div>
                          </div>
                          
                          {/* Score */}
                          <div className={`text-lg font-bold mx-4 min-w-fit ${
                            isLive ? 'text-red-600' : 'text-gray-800'
                          }`}>
                            {match.event_final_result}
                          </div>
                          
                          {/* Home team */}
                          <div className="flex items-center flex-1 justify-end min-w-0">
                            <div className="flex items-center gap-1 min-w-0">
                              <button
                                onClick={(e) => handleTeamFavorite(match.event_home_team, e)}
                                className={`text-sm ${
                                  isFavorite(match.event_home_team) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                                } transition-colors`}
                                title={`${isFavorite(match.event_home_team) ? 'Remove from' : 'Add to'} favorites`}
                              >
                                ⭐
                              </button>
                              <span className="text-sm font-medium truncate">
                                {match.event_home_team}
                              </span>
                            </div>
                            {match.event_home_team_logo ? (
                              <Image
                                src={match.event_home_team_logo}
                                alt={`${match.event_home_team} logo`}
                                width={28}
                                height={28}
                                className="ml-2 rounded"
                              />
                            ) : (
                              <div className="w-7 h-7 bg-gradient-to-br from-green-100 to-green-200 rounded ml-2 flex items-center justify-center">
                                <span className="text-xs font-bold text-green-600">
                                  {match.event_home_team.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Match status and time */}
                        <div className="flex justify-center">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${status.className}`}>
                            {status.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Footer info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Covering Premier League, La Liga, Serie A, Bundesliga, and Ligue 1</p>
        <p className="mt-1">🔄 Updates every 30 seconds during live matches</p>
        {favoriteTeams.length > 0 && (
          <p className="mt-1">⭐ Favorite teams: {favoriteTeams.join(", ")}</p>
        )}
      </div>
    </div>
  );
}