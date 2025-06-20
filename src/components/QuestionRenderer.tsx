import type { Question } from "@prisma/client";

const QuestionRenderer = ({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) => {
  const inputId = `question-${question.id}`;

  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name: inputId,
      required: question.required,
      value: value || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => {
        onChange(e.target.value);
      },
      className:
        "mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    };

    switch (question.type) {
      case "text":
        return <input type="textarea" {...commonProps} />;
      case "number":
        return <input type="number" {...commonProps} />;
      case "select":
        let options: string[] = [];

        try {
          if (question.options) {
            const parsedOptions = JSON.parse(question.options) as string[];
            if (Array.isArray(parsedOptions)) {
              options = parsedOptions;
            }
          }
        } catch (error) {
          console.error("Failed to parse question options:", error);
          return <p>Error: Could not load options.</p>;
        }

        return (
          <select {...commonProps}>
            <option value="" disabled>
              -- Please select an option --
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={inputId}
        className="block text-lg font-medium text-gray-800"
      >
        {question.title}
      </label>
      {question.description && (
        <p className="mt-1 text-sm text-gray-600">{question.description}</p>
      )}
      {renderInput()}
    </div>
  );
};

export default QuestionRenderer;
