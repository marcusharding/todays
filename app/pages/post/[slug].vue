<template>
    <div class="post">
        <h1>{{ data?.title }}</h1>
    </div>
</template>

<script setup>
// QUERIES
import { postSingleQuery } from '~/queries/repeatables/posts';
import { postMetaQuery } from '~/queries/helpers/pageMeta';

// PARAMS
const params = useRoute().query;
const isPreview = params.preview === 'true';
const { slug } = useRoute().params;

// DATA
const { data, error: dataError } = await useSanityQuery(postSingleQuery(isPreview), { slug });
const { data: meta, error: metaError } = await useSanityQuery(postMetaQuery(slug));

if (dataError.value) {
    console.error('Error fetching page data:', dataError.value);
}

if (metaError.value) {
    console.error('Error fetching meta data:', metaError.value);
}

// META
useMeta(meta?.value?.metaData, data?.value);
</script>

<style lang="scss" scoped></style>
