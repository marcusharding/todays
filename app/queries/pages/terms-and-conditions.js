export const termsAndConditionsQuery = (isPreview) => /* groq */ `
    *[_type == "termsAndConditions"] {
        heading,
        rich_text
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;
