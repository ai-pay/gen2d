
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { getNumberFreeGenerations } from "@/database/redis/freeCredits/getNumberFreeCredits";

export const GET = async function () {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized. Login to make a request" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const freeGenerations = await getNumberFreeGenerations(session.user.id);

  return new NextResponse(JSON.stringify({freeGenerations}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

};

