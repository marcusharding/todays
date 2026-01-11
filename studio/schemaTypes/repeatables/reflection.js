export default {
    name: 'reflection',
    type: 'document',
    title: 'Reflection',
    fields: [
        {
            name: 'reflection',
            type: 'string',
            title: 'Reflection',
            validation: (Rule) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'reflection'
        }
    }
};
