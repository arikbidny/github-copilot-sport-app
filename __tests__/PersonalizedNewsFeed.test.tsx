import "@testing-library/jest-dom";
import { allTeams, nbaTeams, soccerTeams, getTeamById } from "../src/lib/teams-data";
import { mockNewsArticles, getArticlesByTeamIds, getAllArticles } from "../src/lib/news-data";

describe("Teams Data", () => {
  it("should have 20 total teams", () => {
    expect(allTeams).toHaveLength(20);
  });

  it("should have 10 NBA teams", () => {
    expect(nbaTeams).toHaveLength(10);
    expect(nbaTeams.every(team => team.league === 'NBA')).toBe(true);
  });

  it("should have 10 Soccer teams", () => {
    expect(soccerTeams).toHaveLength(10);
    expect(soccerTeams.every(team => team.league === 'Soccer')).toBe(true);
  });

  it("should find team by ID", () => {
    const lakers = getTeamById('lakers');
    expect(lakers).toBeDefined();
    expect(lakers?.name).toBe('Los Angeles Lakers');
    expect(lakers?.league).toBe('NBA');
  });
});

describe("News Data", () => {
  it("should have sample news articles", () => {
    expect(mockNewsArticles.length).toBeGreaterThan(0);
  });

  it("should filter articles by team IDs", () => {
    const lakersArticles = getArticlesByTeamIds(['lakers']);
    expect(lakersArticles.length).toBeGreaterThan(0);
    expect(lakersArticles.every(article => article.teamIds.includes('lakers'))).toBe(true);
  });

  it("should return all articles", () => {
    const allArticles = getAllArticles();
    expect(allArticles).toHaveLength(mockNewsArticles.length);
  });

  it("should return articles sorted by date", () => {
    const allArticles = getAllArticles();
    for (let i = 1; i < allArticles.length; i++) {
      const prevDate = new Date(allArticles[i - 1].publishedAt);
      const currDate = new Date(allArticles[i].publishedAt);
      expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime());
    }
  });
});