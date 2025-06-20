import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

type SubmissionBody = {
  sessionId: string;
  answers: {
    questionId: number;
    answer: string;
  }[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // check that req.method is POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end(`Request Method ${req.method} Not Allowed`);
  }

  // sessionId + anser validation
  const { sessionId, answers } = req.body as SubmissionBody;
  if (!sessionId || !Array.isArray(answers) || !answers.length) {
    res.status(400).json({ message: "Submission invalid" });
  }

  try {
    // Map: [sessionId: 432, {questionId: 123, answer: 30}, {questionId: 8734, answer: "hi there"}]]
    const createResponses = answers.map((item) => {
      // db call to create responses
      return db.response.create({
        data: {
          sessionId: sessionId,
          questionId: item.questionId,
          answer: item.answer,
        },
      });
    });

    // transaction?
    await db.$transaction(createResponses);
    return res
      .status(201)
      .json({ message: "Response submitted successfully!" });
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
