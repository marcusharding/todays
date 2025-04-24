export const footerQuery = (isPreview) => /* groq */ `
    *[_type == "footer"] {
        logo {
            asset->
        },
        legalLinks {
            copyright,
            privacyPolicy {
                label,
                "slug": page->slug.current
            },
            termsAndConditions {
                label,
                "slug": page->slug.current
            }
        },
        contactItems {
            contactEmail {
                ...,
                "asset": icon.asset->
            },
            socialPlatforms[] {
                label,
                url,
                "asset": icon.asset->
            }
        }
    }
    ${isPreview ? '| order((_id in path("drafts.**")) desc)' : '| order((_id in path("drafts.**")) asc)'}[0]
`;
