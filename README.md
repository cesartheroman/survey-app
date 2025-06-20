# Waterlily Technical Take-Home - Survey App

## Cesar's Gameplan

### Step 0: Setup + Planning Checklist
[x] Commit done

### Step 1: Setup up initial schema
[x] Commit done

### Step 2: Seed DB
[x] Commit done

### Step 3: Build API Routes
[x] GET /api/survey (questions)
[x] POST /api/responses (answers)
[x] GET /api/review/:sessionId (questions)
[x] Commit done

### Step 4: Build FE Components
[x] QuestionRenderer Form Component
[x] Landing Page? -> Link /survey page
[x] Survey Page -> Will render the all survey questions -> Button -> POST /api/responses
[] Review Page -> Will show the users's responses (if any) by their sessionId
[] etc: utils/shared types
[x] MVP Done!
[x] Commit Done!

### Step 5: Potential Improvements???

### Step 6: Wrap Up
[x] Push all commits
[x] Briefly summarize if had more time
[x] Update README - Trade-offs

## Trade-offs, Design Choices, Future Improvements
- I chose to start the project using the T3 stack to leverage its opinionated, full-stack, and type-safe foundation. This significantly accelerated my initial setup and development velocity by providing a pre-configured architecture with SQLite, Next.js, and TypeScript.

- I chose SQLite for its simplicity and zero-configuration setup, which was ideal for rapid prototyping. The trade-off was the lack of native JSON type support, which required me to serialize my options data into a string, but I was more than happy to accept this trade-off given constraints.

- I didn't exactly choose Next.js, as it's the default within the T3 stack, but the monolithic approach simplified my development workflow and dependency management, compared to maintaining separate front-end and back-end repositories. My familiarity with the Pages Router allowed for rapid implementation of both API routes and client-side pages, even if I ran out of time at the end.

- I chose to start my development process with a focus on data modeling in Prisma. Defining the schema and relationships first provided a clear "source of truth" for the application's data. I really like this approach because it clarifies the application's requirements upfront and makes it easier to design components and APIs that align directly with the underlying data structures.

Future Improvements: 
- Handle form validation, user auth, and would have liked to finish the review submission page.
