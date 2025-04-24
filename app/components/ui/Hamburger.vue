<template>
    <button
        ref="hamburger"
        class="hamburger"
        aria-label="hamburger"
        :class="{ active: navOpen }"
        @click="click($event.target)"
        @submit="click($event.target)"
    >
        <span></span>
        <span></span>
    </button>
</template>

<script>
// STORE
import { useGlobalStore } from '~/store/global';

export default {
    name: 'Hamburger',
    data() {
        return { globalStore: useGlobalStore() };
    },
    computed: {
        navOpen() {
            return this.globalStore?.navOpen;
        }
    },
    methods: {
        click() {
            this.globalStore.setNavOpen(!this.navOpen);
        }
    }
};
</script>

<style lang="scss" scoped>
.hamburger {
    position: relative;
    bottom: -12px;

    width: 32px;
    height: 32px;

    border: none;
    background-color: transparent;

    pointer-events: auto;

    @include tablet-up {
        display: none;
    }
}

.hamburger.active {
    transform: scale(1);

    position: absolute;
    top: 10px;
    left: 0;

    margin-left: 24px;
}

.hamburger span {
    display: inline-block;
    position: absolute;
    left: 8px;
    height: 2px;
    border-radius: 62px;
    width: 28px;
    transition: all 0.2s;
    background-color: black;

    pointer-events: none;

    &:nth-of-type(1) {
        top: 0;
    }

    &:nth-of-type(2) {
        top: 12px;
    }
}

.hamburger.active span {
    &:nth-of-type(1),
    &:nth-of-type(2) {
        top: 10px;
    }

    &:nth-of-type(1) {
        transform: rotate(45deg);
    }

    &:nth-of-type(2) {
        transform: rotate(-45deg);
    }
}

.hamburger {
    transition: background-color 0.2s ease-in;
}

.hamburger.theme-cream span {
    background-color: color(AlmostWhite);
}

.hamburger.theme-black span {
    background-color: color(TrueBlack);
}

.hamburger.active span {
    background-color: color(TrueWhite);
}
</style>
