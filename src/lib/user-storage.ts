// Shared storage for user preferences
// In a real application, this would be stored in a database

let userFavoriteTeams: string[] = [];

export const getFavoriteTeams = (): string[] => {
  return userFavoriteTeams;
};

export const setFavoriteTeams = (teamIds: string[]): void => {
  userFavoriteTeams = teamIds;
};