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

  // extract sessionId
  const { sessionId } = req.query;
  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ message: "No session id found" });
  }

  try {
    // Fetch responses for the given sessionId, and include the related question
    const responsesWithQuestions = await db.response.findMany({
      where: {
        sessionId: sessionId,
      },
      include: {
        Question: true,
      },
    });

    // Extract just the questions from the responses
    const questions = responsesWithQuestions.map(
      (response) => response.Question,
    );

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this session" });
    }

    // NOTE: What's the difference between both of these?
    console.log({ responsesWithQuestions });
    return res.status(200).json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
