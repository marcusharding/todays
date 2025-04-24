export const privacyPolicyQuery = (isPreview) => /* groq */ `
    *[_type == "privacyPolicy"] {
        heading,
        rich_text
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;
