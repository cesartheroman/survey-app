import QuestionRenderer from "~/components/QuestionRenderer";
import type { Question } from "@prisma/client";
import { useEffect, useState } from "react";

type Answer = Record<number, string>;

const SurveyPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/survey");
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }

        const questions = (await res.json()) as Question[];
        setQuestions(questions);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions().catch((e) => console.error(e));
  }, []);

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const sessionId = crypto.randomUUID();

    const payload = {
      sessionId,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId, 10),
        answer,
      })),
    };

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit responses.");
      }

      setSubmissionStatus("success");
      setAnswers({});
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // handleChange
  const handleChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading questions...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8 p-8">
      <h1 className="text-3xl font-bold">Long-Term Care Survey</h1>
      <div className="space-y-6">
        {questions.map((q) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            value={answers[q.id] ?? ""}
            onChange={(value) => handleChange(q.id, value)}
          />
        ))}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Answers"}
        </button>
      </div>

      {submissionStatus === "success" && (
        <div className="rounded-md bg-green-100 p-4 text-center text-green-800">
          Thank you! Your responses have been submitted successfully.
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="rounded-md bg-red-100 p-4 text-center text-red-800">
          Something went wrong. Please try submitting again.
        </div>
      )}
    </form>
  );
};

export default SurveyPage;
