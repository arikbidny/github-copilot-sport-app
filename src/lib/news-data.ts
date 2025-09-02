// News and Articles data models
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  teamIds: string[];
  category: 'news' | 'match' | 'transfer' | 'injury' | 'highlight';
  league: 'NBA' | 'Soccer' | 'General';
  publishedAt: string;
  imageUrl?: string;
  source: string;
}

// Mock news data for development
export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Lakers Sign New Point Guard in Trade Deal',
    summary: 'The Los Angeles Lakers acquire veteran point guard in surprising trade deadline move.',
    teamIds: ['lakers'],
    category: 'transfer',
    league: 'NBA',
    publishedAt: '2024-01-15T10:00:00Z',
    source: 'ESPN',
  },
  {
    id: '2',
    title: 'Curry Breaks Another Three-Point Record',
    summary: 'Stephen Curry continues to rewrite the NBA record books with historic shooting performance.',
    teamIds: ['warriors'],
    category: 'highlight',
    league: 'NBA',
    publishedAt: '2024-01-14T22:30:00Z',
    source: 'NBA.com',
  },
  {
    id: '3',
    title: 'Barcelona Secures Victory in El Clasico',
    summary: 'FC Barcelona defeats Real Madrid 2-1 in thrilling El Clasico match at Camp Nou.',
    teamIds: ['barcelona', 'realmadrid'],
    category: 'match',
    league: 'Soccer',
    publishedAt: '2024-01-14T20:15:00Z',
    source: 'UEFA.com',
  },
  {
    id: '4',
    title: 'Manchester United Injury Update',
    summary: 'Key player expected to return from injury ahead of crucial Premier League fixtures.',
    teamIds: ['manchester-united'],
    category: 'injury',
    league: 'Soccer',
    publishedAt: '2024-01-13T14:20:00Z',
    source: 'BBC Sport',
  },
  {
    id: '5',
    title: 'NBA All-Star Voting Results Announced',
    summary: 'Eastern and Western Conference All-Star starters revealed, fans show strong support for young stars.',
    teamIds: ['lakers', 'celtics', 'bucks', 'warriors'],
    category: 'news',
    league: 'NBA',
    publishedAt: '2024-01-12T16:45:00Z',
    source: 'NBA.com',
  },
  {
    id: '6',
    title: 'PSG Eyes Summer Transfer Targets',
    summary: 'Paris Saint-Germain reportedly interested in several high-profile players for summer window.',
    teamIds: ['psg'],
    category: 'transfer',
    league: 'Soccer',
    publishedAt: '2024-01-11T11:30:00Z',
    source: 'Sky Sports',
  },
  {
    id: '7',
    title: 'Celtics Extend Winning Streak to 10 Games',
    summary: 'Boston Celtics continue dominant run with convincing victory over conference rivals.',
    teamIds: ['celtics'],
    category: 'match',
    league: 'NBA',
    publishedAt: '2024-01-10T23:00:00Z',
    source: 'ESPN',
  },
  {
    id: '8',
    title: 'Champions League Quarter-Final Draw Results',
    summary: 'UEFA Champions League quarter-final matchups revealed, setting up exciting spring fixtures.',
    teamIds: ['barcelona', 'bayern', 'psg', 'liverpool'],
    category: 'news',
    league: 'Soccer',
    publishedAt: '2024-01-09T13:15:00Z',
    source: 'UEFA.com',
  },
];

export const getArticlesByTeamIds = (teamIds: string[]): NewsArticle[] => {
  if (teamIds.length === 0) return [];
  
  return mockNewsArticles.filter(article => 
    article.teamIds.some(id => teamIds.includes(id))
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const getAllArticles = (): NewsArticle[] => {
  return mockNewsArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getArticleById = (id: string): NewsArticle | undefined => {
  return mockNewsArticles.find(article => article.id === id);
};