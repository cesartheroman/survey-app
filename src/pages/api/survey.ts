import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // check that req.method is GET
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end(`Request Method ${req.method} Not Allowed`);
  }

  try {
    // db call to get questions
    const questions = await db.question.findMany(); // NOTE: will we need include? Response
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    return res.status(200).json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
