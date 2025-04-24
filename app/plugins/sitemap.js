import { sitemapPostsQuery } from '~/queries/repeatables/posts';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('sitemapQuery', { sitemapPostsQuery });
});
