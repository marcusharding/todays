export default {
    name: 'reflection',
    type: 'document',
    title: 'Reflection',
    fields: [
        {
            name: 'topic',
            type: 'string',
            title: 'Topic',
            description: 'What today is about',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'reflection',
            type: 'text',
            title: 'Reflection',
            description: 'The reflection for the day',
            validation: (Rule) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'topic',
            subtitle: 'reflection'
        }
    }
};
