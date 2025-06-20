import { db } from "~/server/db";

const questions = [
  {
    title: "What is your age?",
    description: "Your age helps us understand general demographic trends.",
    type: "number",
    options: null,
    required: true,
    order: 1,
  },
  {
    title: "What is your highest level of education completed?",
    description: null,
    type: "select",
    options: JSON.stringify([
      "High School Diploma/GED",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
      "Other",
    ]),
    required: false,
    order: 2,
  },
  // Health Questions
  {
    title: "Do you currently have any pre-existing medical conditions?",
    description: "e.g., Diabetes, Heart Disease, Cancer, Alzheimer's, etc.",
    type: "text",
    options: null,
    required: false,
    order: 3,
  },
  // Financial Questions
  {
    title: "What is your approximate annual household income before taxes?",
    description:
      "This helps us understand financial capacity for long-term care.",
    type: "select",
    options: JSON.stringify([
      "Less than $25,000",
      "$25,000 - $49,999",
      "$50,000 - $74,999",
      "$75,000 - $99,999",
      "$100,000 - $149,999",
      "$150,000 or more",
    ]),
    required: true,
    order: 4,
  },
];

async function main() {
  console.log("Start seeding...");
  try {
    await db.question.deleteMany();
    await db.response.deleteMany();

    await db.question.createMany({
      data: questions,
    });
  } catch (err) {
    throw new Error(
      `Failed to seed db: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
