export const reflectionsQuery = /* groq */ `
    *[_type == "reflection"] | order(_createdAt asc) {
        topic,
        reflection
    }
`;
