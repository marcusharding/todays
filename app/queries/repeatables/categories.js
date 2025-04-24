export const categoriesQuery = () => /* groq */ `
    *[_type == "category" && !(_id in path("drafts.**"))] | order(sortOrder desc) {
        _id,
        sortOrder,
        title,
        "machineName": machineName.current
    }
`;
