<template>
    <header ref="header" class="header" :class="{ 'nav-open': navOpen }">
        <div class="header-wrapper wide-content-container">
            <Hamburger />
            <HeaderLogo :logo="logo" />
            <Navigation :data="globalStore?.navigation" />
        </div>
    </header>
</template>

<script>
// MODULES
import throttle from 'lodash.throttle';

// STORE
import { useGlobalStore } from '~/store/global';

// UTILS
import { BREAKPOINTS } from '~/lib/configs';

// COMPONENTS
import Navigation from './ui/Navigation';
import HeaderLogo from './ui/HeaderLogo';
import Hamburger from './ui/Hamburger';

export default {
    name: 'HeaderComponent',
    components: {
        Hamburger,
        HeaderLogo,
        Navigation
    },
    data() {
        return { globalStore: useGlobalStore() };
    },
    computed: {
        navOpen() {
            return this.globalStore?.navOpen;
        },
        logo() {
            return this.globalStore?.navigation?.logo;
        }
    },
    watch: {
        $route() {
            this.resetHeader();
        }
    },
    mounted() {
        window.addEventListener('resize', throttle(this.closeMobileNav, 200));
    },
    unmounted() {
        window.removeEventListener('resize', throttle(this.closeMobileNav, 200));
    },
    methods: {
        closeMobileNav() {
            if (window.innerWidth > BREAKPOINTS.TABLET) {
                this.globalStore.setNavOpen(false);
            }
        },
        resetHeader() {
            this.isScrolled = false;
            this.isFixed = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding-block-start: 40px;
    padding-right: 0;
    position: absolute;
    width: 100%;
    z-index: 1000;
    background-color: transparent;
    transform: translateY(0);
    box-shadow: none;
    will-change: transform, box-shadow;

    @include tablet-up {
        padding-block-start: 80px;
    }
}

.header.nav-open {
    padding-block-start: 0;
    background: color(TrueBlack);
    padding-top: 40px;
    pointer-events: auto;
    transform: none !important;
}

.header .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-open .header-wrapper {
    align-items: start;
    background: color(TrueBlack);
}

.header.nav-open {
    @include tablet-down {
        position: fixed;
        width: 100%;
        height: fit-content;
        background-color: color(TrueBlack);
        z-index: 100;
        transform: translateY(0);
        box-shadow: none;
    }
}

.header.nav-open .header-wrapper {
    flex-direction: column-reverse;
    align-items: end;
}
</style>
