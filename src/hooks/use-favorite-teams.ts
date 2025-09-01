"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for managing favorite teams
 * Uses localStorage to persist favorites across sessions
 */
export function useFavoriteTeams() {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('soccer-favorite-teams');
      if (saved) {
        setFavoriteTeams(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorite teams:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('soccer-favorite-teams', JSON.stringify(favoriteTeams));
    } catch (error) {
      console.error('Error saving favorite teams:', error);
    }
  }, [favoriteTeams]);

  const toggleFavorite = (teamName: string) => {
    setFavoriteTeams(prev => 
      prev.includes(teamName)
        ? prev.filter(team => team !== teamName)
        : [...prev, teamName]
    );
  };

  const isFavorite = (teamName: string) => favoriteTeams.includes(teamName);

  return {
    favoriteTeams,
    toggleFavorite,
    isFavorite
  };
}