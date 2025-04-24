export const sandboxQuery = (isPreview) => /* groq */ `
    *[_type == "sandbox"] {
        heading,
        pageBuilder {
            pageBuilderBlocks[] {
            }
        },
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;
