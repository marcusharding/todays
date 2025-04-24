// MODULES
import { defineStore } from 'pinia';

// QUERIES
import { navigationQuery } from '~/queries/global/navigation';
import { footerQuery } from '~/queries/global/footer';
import { siteSettingsQuery } from '~/queries/global/site-settings';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        navOpen: false,
        navigation: undefined,
        footer: undefined,
        siteSettings: undefined
    }),
    actions: {
        setNavOpen(value) {
            this.navOpen = value;
        },

        async fetchData(query) {
            try {
                const { $sanity } = useNuxtApp();

                if (!$sanity) {
                    console.error('$sanity is not defined');
                    return {};
                }

                const result = await $sanity.fetch(query());
                return result || {};
            } catch (error) {
                console.error(`Error fetching data: ${error.message}`);
                return {};
            }
        },

        async fetchNavigation() {
            this.navigation = await this.fetchData(navigationQuery);
        },

        async fetchFooter() {
            this.footer = await this.fetchData(footerQuery);
        },

        async fetchSiteSettings() {
            this.siteSettings = await this.fetchData(siteSettingsQuery);
        }
    }
});
