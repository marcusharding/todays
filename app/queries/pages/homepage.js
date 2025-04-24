import { dummyBlock } from '~/queries/global/page-builder';

export const homepageQuery = (isPreview) => /* groq */ `
    *[_type == "homepage"] {
        heading,
        pageBuilder {
            pageBuilderBlocks[] {
                ${dummyBlock}
            }
        },
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;
