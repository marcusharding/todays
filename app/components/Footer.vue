<template>
    <footer>
        <div class="container">
            <div class="wrapper">
                <NuxtImg
                    v-if="footer?.logo.asset"
                    class="logo"
                    :src="$urlFor(footer.logo.asset).url()"
                    alt=""
                />
                <ul class="legal-links-wrapper links-xs">
                    <li>
                        <p>
                            {{ footer?.legalLinks?.copyright?.label }}
                        </p>
                    </li>
                    <li>
                        <NuxtLink :to="footer?.legalLinks?.privacyPolicy.slug">
                            {{ footer?.legalLinks?.privacyPolicy.label }}
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="footer?.legalLinks?.termsAndConditions.slug">
                            {{ footer?.legalLinks?.termsAndConditions.label }}
                        </NuxtLink>
                    </li>
                </ul>
                <ul class="social-links-wrapper">
                    <li
                        v-for="socialItem in footer?.contactItems?.socialPlatforms"
                        :key="socialItem.label"
                    >
                        <NuxtLink :to="socialItem.url" target="_blank" :title="socialItem.label">
                            <NuxtImg :src="$urlFor(socialItem.asset).url()" alt="" />
                        </NuxtLink>
                    </li>

                    <li>
                        <a
                            v-if="footer?.contactItems?.contactEmail?.asset"
                            :href="`mailto:${footer?.contactItems?.contactEmail?.email}`"
                            :title="footer?.contactItems?.contactEmail?.label"
                        >
                            <NuxtImg
                                :src="$urlFor(footer?.contactItems?.contactEmail?.asset).url()"
                                alt=""
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
// STORE
import { useGlobalStore } from '~/store/global';

export default {
    name: 'FooterComponent',
    data() {
        return { globalStore: useGlobalStore() };
    },
    computed: {
        footer() {
            return this.globalStore?.footer;
        }
    }
};
</script>

<style lang="scss" scoped>
footer {
    position: relative;
    padding-block-start: 150px;
}

footer .container {
    margin: 0 auto;
}

footer .wrapper {
    display: grid;
    gap: 50px;

    color: color(AlmostWhite);
    background-color: color(TrueBlack);

    padding: 40px 25px;

    grid-template-areas:
        'logo'
        'social'
        'legal';

    @include tablet-up {
        padding: 40px 36px;

        grid-template-areas:
            'logo logo'
            'social social'
            'legal legal';
        padding: 60px 82px;
    }

    @include laptop-up {
        grid-template-areas:
            'logo'
            'legal legal social';

        grid-template-columns: minmax(500px, auto) minmax(100px, 180px);
        gap: 100px 30px;
    }

    @include desktop-up {
        padding: 100px 126px;

        grid-template-columns: minmax(532px, auto) repeat(2, minmax(100px, 254px));
        gap: 150px 30px;
    }
}

footer .logo {
    grid-area: logo;
    width: min(100%, 194px);

    @include tablet-up {
        width: min(100%, 296px);
    }
}

footer .legal-links-wrapper li a {
    transition: 0.3s ease-in-out;

    &:hover,
    &:focus {
        opacity: 0.6;
    }
}

footer .legal-links-wrapper li:not(:first-child) {
    list-style-type: disc;

    &::marker {
        color: color(AlmostWhite);
    }
    @include tablet-up {
        &::marker {
            color: color(AlmostBlack);
        }
    }
}

footer .social-links-wrapper {
    grid-area: social;

    display: flex;
    gap: 12px;

    margin: 100px 0 -20px;

    @include mobile-up {
        gap: 20px;
    }

    @include tablet-up {
        margin: auto;
    }
}

footer .social-links-wrapper img {
    width: 20px;
    height: 20px;

    transition: 0.3s ease-in-out;

    &:hover,
    &:focus {
        opacity: 0.6;
    }
}
</style>
