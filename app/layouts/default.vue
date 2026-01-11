<template>
    <PinGate>
        <div class="default">
            <main>
                <slot />
            </main>
        </div>
    </PinGate>
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
