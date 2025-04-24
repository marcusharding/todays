<template>
    <div class="privacy-policy site-content-container">
        <Hero :data="data" />
        <PortableText :value="data?.rich_text?.copy" />
    </div>
</template>

<script setup>
// QUERIES
import { privacyPolicyQuery } from '~/queries/pages/privacy-policy';
import { metaQuery } from '~/queries/helpers/pageMeta';

// MODULES
import { PortableText } from '@portabletext/vue';

// COMPONENTS
import Hero from '~/components/reUsable/Hero';

// PARAMS
const params = useRoute().query;
const isPreview = params.preview === 'true';

// DATA
const { data, error: dataError } = await useSanityQuery(privacyPolicyQuery(isPreview));
const { data: meta, error: metaError } = await useSanityQuery(metaQuery('privacy-policy'));

if (dataError.value) {
    console.error('Error fetching page data:', dataError.value);
}

if (metaError.value) {
    console.error('Error fetching meta data:', metaError.value);
}

// META
useMeta(meta?.value?.metaData, data?.value);
</script>

<style lang="scss" scoped>
.privacy-policy :deep(p) {
    margin-bottom: 40px;
    @include typography('body-m');
}

.privacy-policy :deep(p strong) {
    font-weight: 700;
}

.privacy-policy :deep(ul) {
    margin-bottom: 80px;
    list-style-position: inside;
}

.privacy-policy :deep(li) {
    margin-bottom: 20px;
}

.privacy-policy :deep(li) {
    list-style-type: disc;
}
</style>
