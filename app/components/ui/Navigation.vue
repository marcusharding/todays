<template>
    <nav
        v-if="data?.navigationItems?.length > 0"
        ref="navigation"
        :class="{ 'nav-open': navOpen }"
        :aria-expanded="navOpen"
    >
        <ul ref="navWrapper" class="nav-wrapper">
            <li v-for="{ label, slug } in data?.navigationItems" :key="label" ref="navLinks">
                <NuxtLink :to="slug" exact-active-class="active">
                    {{ label }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script>
// STORE
import { useGlobalStore } from '~/store/global';

export default {
    name: 'Navigation',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        navOpen() {
            return useGlobalStore().navOpen;
        }
    }
};
</script>

<style lang="scss" scoped>
nav ul {
    z-index: 1001;
}

nav.nav-open {
    height: 100vh;
    overflow: hidden;
}

nav .nav-wrapper {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    list-style: none;
    z-index: 1001;

    @include tablet-up {
        display: flex;
        flex-direction: row;
        gap: 41px;
    }
}

nav .nav-wrapper li {
    pointer-events: auto;
}

nav .nav-wrapper li.home-mobile-only {
    @include tablet-up {
        display: none;
    }
}

nav.nav-open .nav-wrapper {
    @include tablet-down {
        position: absolute;
        top: 75px;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        z-index: 1001;

        height: fit-content;
        width: 100%;
        background-color: color(TrueBlack);
        padding: 64px 24px 0;
    }
}

nav.nav-open .nav-wrapper li a {
    @include tablet-down {
        color: color(AlmostWhite);
    }
}

nav .nav-wrapper li a {
    position: relative;
    text-decoration: none;
    color: color(TrueBlack);
    font-size: rems(32);
    font-weight: 700;
    letter-spacing: -0.32px;
    line-height: 1.5;

    @include tablet-up {
        font-size: rems(18);
    }

    &:after {
        content: '';
        position: absolute;
        left: 0;
        width: 0;
        bottom: 0;
        height: 3px;
        background-color: color(TrueBlack);
        transition: width 0.3s ease-in-out;
    }

    &:hover:after {
        width: 100%;
        margin-bottom: -5px;
    }

    &:not(:hover):after {
        width: 0;
        margin-bottom: -5px;
        right: 0;
        left: auto;
    }
}

nav .nav-wrapper li a.active {
    position: relative;
}

nav .nav-wrapper li a.active:after {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    height: 3px;
    background-color: color(TrueBlack);
}

.nav-open .nav-wrapper li a.active {
    opacity: 30%;
}

.nav-open .nav-wrapper li a.active:after {
    display: none;
}
</style>
