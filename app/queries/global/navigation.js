export const navigationQuery = (isPreview) => /* groq */ `
    *[_type == "navigation"] {
        logo {
            asset->,
            "url": asset->url
        },
        navigationItems[] {
            label,
            "slug": page->slug.current
        }
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;
