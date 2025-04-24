<template>
    <div class="default" :class="{ fixed: navOpen }">
        <Header />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script>
// STORE
import { useGlobalStore } from '~/store/global';

export default {
    name: 'DefaultLayout',
    data() {
        return { globalStore: useGlobalStore() };
    },
    computed: {
        navOpen() {
            return this.globalStore?.navOpen;
        }
    },
    watch: {
        $route() {
            this.globalStore.setNavOpen(false);
            window.scrollTo({ top: 0 });
        }
    }
};
</script>

<style lang="scss" scoped></style>
