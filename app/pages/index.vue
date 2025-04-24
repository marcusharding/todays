<template>
    <div class="index">
        <Hero :data="data" />
        <PageBuilder v-if="data?.pageBuilder" :components="data?.pageBuilder?.pageBuilderBlocks" />
    </div>
</template>

<script setup>
// QUERIES
import { homepageQuery } from '~/queries/pages/homepage';
import { metaQuery } from '~/queries/helpers/pageMeta';

// COMPONENTS
import PageBuilder from '~/components/PageBuilder';
import Hero from '~/components/reUsable/Hero';

// PARAMS
const params = useRoute().query;
const isPreview = params.preview === 'true';

// DATA
const { data, error: dataError } = await useSanityQuery(homepageQuery(isPreview));
const { data: meta, error: metaError } = await useSanityQuery(metaQuery('homepage'));

if (dataError.value) {
    console.error('Error fetching page data:', dataError.value);
}

if (metaError.value) {
    console.error('Error fetching meta data:', metaError.value);
}

// META
useMeta(meta?.value?.metaData, data?.value);
</script>
