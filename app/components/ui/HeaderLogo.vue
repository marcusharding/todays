<template>
    <NuxtLink v-if="logo" :to="`/`" class="header-logo" aria-label="Back to home">
        <NuxtImg ref="logo" :src="$urlFor(logo).url()" alt="" :class="{ 'nav-open': navOpen }" />
    </NuxtLink>
</template>

<script>
// STORE
import { useGlobalStore } from '~/store/global';

export default {
    name: 'HeaderLogo',
    props: {
        logo: {
            type: Object,
            required: false,
            default: () => undefined
        }
    },
    computed: {
        navOpen() {
            return useGlobalStore()?.navOpen;
        }
    }
};
</script>

<style lang="scss" scoped>
img.nav-open {
    filter: invert(1);
}

.header-logo {
    pointer-events: auto;
}

.header-logo img {
    width: 35px;
    height: 27px;
}
</style>
