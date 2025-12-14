export const homepageQuery = /* groq */ `
    *[_type == "quote"] | order(_createdAt asc) {
        quote
    }
`;
