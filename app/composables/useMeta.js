import { useGlobalStore } from '~/store/global';

export const useMeta = (metadata = {}, data = {}) => {
    const globalStore = useGlobalStore();
    const metaImage = globalStore?.siteSettings?.metaImage?.url || '';

    const getMetaData = () => ({
        title: metadata?.title || data?.title || '',
        description: metadata?.description || data?.description || '',
        image: metadata?.imageUrl || metaImage
    });

    const { title, description, image } = getMetaData();

    useHead({
        title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:image', content: image }
        ]
    });
};
