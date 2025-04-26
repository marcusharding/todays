<template>
    <div class="default">
        <main>
            <slot />
        </main>
    </div>
</template>

<script>
// STORE
import { useGlobalStore } from '~/store/global';

export default {
    name: 'DefaultLayout',
    data() {
        return { globalStore: useGlobalStore() };
    }
};
</script>

<style lang="scss" scoped>
.default {
    background-color: #F5F4F3;
}
</style>