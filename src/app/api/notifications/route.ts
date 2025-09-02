import { NextRequest, NextResponse } from "next/server";
import { getFavoriteTeams } from "@/lib/user-storage";
import { getArticlesByTeamIds } from "@/lib/news-data";

/**
 * GET endpoint for notifications based on favorite teams
 * Query parameters:
 * - limit: number (optional, default 5)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');

    const favoriteTeams = getFavoriteTeams();
    
    if (favoriteTeams.length === 0) {
      return NextResponse.json({
        notifications: [],
        message: "No favorite teams selected for notifications",
        success: true
      });
    }

    // Get recent articles for favorite teams
    const articles = getArticlesByTeamIds(favoriteTeams);
    
    // Transform articles to notification format
    const notifications = articles.slice(0, limit).map(article => ({
      id: `notif_${article.id}`,
      title: article.title,
      message: article.summary,
      type: article.category,
      teamIds: article.teamIds,
      timestamp: article.publishedAt,
      read: false
    }));

    return NextResponse.json({
      notifications,
      count: notifications.length,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notifications", success: false },
      { status: 500 }
    );
  }
}