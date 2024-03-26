import { NextResponse } from "next/server";
import { fetchRecentImageIds } from "@/database/redis/recentImageIds/fetctRecentImageIds";

export const GET = async function () {
  const imageIds = await fetchRecentImageIds();

  return new NextResponse(JSON.stringify({ 
    imageIds
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

