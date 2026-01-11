export const questionsQuery = /* groq */ `
    *[_type == "question"] | order(_createdAt asc) {
        question,
        name,
        date,
        location
    }
`;
