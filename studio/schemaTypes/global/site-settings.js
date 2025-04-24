export default {
    name: 'siteSettings',
    type: 'document',
    title: 'Site Settings',
    fields: [
        {
            name: 'metaImage',
            type: 'image',
            title: 'Global Meta Image',
            description: 'Image Size: 1200 x 600.'
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings'
            };
        }
    }
};
