export const postSingleQuery = (isPreview) => /* groq */ `
    *[_type == "post" && slug.current == $slug] {
        _type,
        _id,
        title,
        "slug": slug.current
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;

export const sitemapPostsQuery = /* groq */ `
    *[_type == "post"] {
        slug, 
        _updatedAt
    }
`;
