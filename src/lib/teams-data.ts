// Teams data for NBA and Soccer
export interface Team {
  id: string;
  name: string;
  league: 'NBA' | 'Soccer';
  logo?: string;
  city: string;
  country?: string;
}

export const nbaTeams: Team[] = [
  { id: 'lakers', name: 'Los Angeles Lakers', league: 'NBA', city: 'Los Angeles' },
  { id: 'warriors', name: 'Golden State Warriors', league: 'NBA', city: 'San Francisco' },
  { id: 'celtics', name: 'Boston Celtics', league: 'NBA', city: 'Boston' },
  { id: 'nets', name: 'Brooklyn Nets', league: 'NBA', city: 'Brooklyn' },
  { id: 'bucks', name: 'Milwaukee Bucks', league: 'NBA', city: 'Milwaukee' },
  { id: 'heat', name: 'Miami Heat', league: 'NBA', city: 'Miami' },
  { id: 'bulls', name: 'Chicago Bulls', league: 'NBA', city: 'Chicago' },
  { id: 'knicks', name: 'New York Knicks', league: 'NBA', city: 'New York' },
  { id: 'spurs', name: 'San Antonio Spurs', league: 'NBA', city: 'San Antonio' },
  { id: 'mavs', name: 'Dallas Mavericks', league: 'NBA', city: 'Dallas' },
];

export const soccerTeams: Team[] = [
  { id: 'barcelona', name: 'FC Barcelona', league: 'Soccer', city: 'Barcelona', country: 'Spain' },
  { id: 'realmadrid', name: 'Real Madrid', league: 'Soccer', city: 'Madrid', country: 'Spain' },
  { id: 'manchester-united', name: 'Manchester United', league: 'Soccer', city: 'Manchester', country: 'England' },
  { id: 'liverpool', name: 'Liverpool FC', league: 'Soccer', city: 'Liverpool', country: 'England' },
  { id: 'psg', name: 'Paris Saint-Germain', league: 'Soccer', city: 'Paris', country: 'France' },
  { id: 'bayern', name: 'Bayern Munich', league: 'Soccer', city: 'Munich', country: 'Germany' },
  { id: 'juventus', name: 'Juventus', league: 'Soccer', city: 'Turin', country: 'Italy' },
  { id: 'chelsea', name: 'Chelsea FC', league: 'Soccer', city: 'London', country: 'England' },
  { id: 'milan', name: 'AC Milan', league: 'Soccer', city: 'Milan', country: 'Italy' },
  { id: 'arsenal', name: 'Arsenal FC', league: 'Soccer', city: 'London', country: 'England' },
];

export const allTeams: Team[] = [...nbaTeams, ...soccerTeams];

export const getTeamById = (id: string): Team | undefined => {
  return allTeams.find(team => team.id === id);
};

export const getTeamsByIds = (ids: string[]): Team[] => {
  return allTeams.filter(team => ids.includes(team.id));
};