// Mock soccer data for demonstration when API is not available
export const mockSoccerMatches = [
  {
    event_key: "1",
    league_name: "Premier League",
    event_away_team: "Manchester City",
    event_home_team: "Arsenal",
    event_final_result: "2 - 1",
    event_status: "finished",
    event_date: "2024-12-16",
    event_time: "90",
    event_away_team_logo: null,
    event_home_team_logo: null
  },
  {
    event_key: "2",
    league_name: "La Liga",
    event_away_team: "Real Madrid",
    event_home_team: "Barcelona",
    event_final_result: "1 - 3",
    event_status: "finished",
    event_date: "2024-12-16",
    event_time: "90",
    event_away_team_logo: null,
    event_home_team_logo: null
  },
  {
    event_key: "3",
    league_name: "Bundesliga",
    event_away_team: "Borussia Dortmund",
    event_home_team: "Bayern Munich",
    event_final_result: "2 - 2",
    event_status: "inplay",
    event_date: "2024-12-16",
    event_time: "67",
    event_away_team_logo: null,
    event_home_team_logo: null
  },
  {
    event_key: "4",
    league_name: "Serie A",
    event_away_team: "Inter Milan",
    event_home_team: "Juventus",
    event_final_result: "0 - 1",
    event_status: "finished",
    event_date: "2024-12-15",
    event_time: "90",
    event_away_team_logo: null,
    event_home_team_logo: null
  },
  {
    event_key: "5",
    league_name: "Ligue 1",
    event_away_team: "Marseille",
    event_home_team: "Paris Saint-Germain",
    event_final_result: "vs",
    event_status: "not_started",
    event_date: "2024-12-17",
    event_time: null,
    event_away_team_logo: null,
    event_home_team_logo: null
  },
  {
    event_key: "6",
    league_name: "Premier League",
    event_away_team: "Liverpool",
    event_home_team: "Chelsea",
    event_final_result: "1 - 0",
    event_status: "inplay",
    event_date: "2024-12-16",
    event_time: "78",
    event_away_team_logo: null,
    event_home_team_logo: null
  }
];

// League configurations for the Top 5 European leagues
export const europeanLeagues = [
  { id: 152, name: "Premier League", country: "England" },
  { id: 302, name: "La Liga", country: "Spain" },
  { id: 207, name: "Serie A", country: "Italy" },
  { id: 175, name: "Bundesliga", country: "Germany" },
  { id: 168, name: "Ligue 1", country: "France" }
];