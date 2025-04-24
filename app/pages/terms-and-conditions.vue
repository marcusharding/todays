<template>
    <div class="terms-and-conditions">
        <Hero :data="data" />
        <PortableText v-if="data?.rich_text?.copy" :value="data?.rich_text?.copy" />
    </div>
</template>

<script setup>
// QUERIES
import { termsAndConditionsQuery } from '~/queries/pages/terms-and-conditions';
import { metaQuery } from '~/queries/helpers/pageMeta';

// MODULES
import { PortableText } from '@portabletext/vue';

// COMPONENTS
import Hero from '~/components/reUsable/Hero';

// PARAMS
const params = useRoute().query;
const isPreview = params.preview === 'true';

// DATA
const { data, error: dataError } = await useSanityQuery(termsAndConditionsQuery(isPreview));
const { data: meta, error: metaError } = await useSanityQuery(metaQuery('termsAndConditions'));

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
.terms-and-conditions :deep(ul) {
    list-style-position: inside;
}

.terms-and-conditions :deep(p),
.terms-and-conditions :deep(li) {
    margin-bottom: 40px;
    @include typography('body-m');
}

.terms-and-conditions :deep(li) {
    list-style-type: disc;
}
</style>
