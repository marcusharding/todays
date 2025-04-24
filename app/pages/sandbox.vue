<template>
    <div class="sandbox">
        <div class="hero site-content-container">
            <h1>{{ data?.heading }}</h1>
        </div>
        <PageBuilder v-if="data?.pageBuilder" :components="data?.pageBuilder?.pageBuilderBlocks" />
    </div>
</template>

<script setup>
// QUERIES
import { sandboxQuery } from '~/queries/pages/sandbox';

// COMPONENTS
import PageBuilder from '~/components/PageBuilder';

// PARAMS
const params = useRoute().query;
const isPreview = params.preview === 'true';

// DATA
const { data, error: dataError } = await useSanityQuery(sandboxQuery(isPreview));

if (dataError.value) {
    console.error('Error fetching page data:', dataError.value);
}
</script>

<style lang="scss" scoped>
.sandbox {
    min-height: 100vh;
}

.sandbox .hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.sandbox h1 {
    color: color(TrueBlack);
}
</style>
