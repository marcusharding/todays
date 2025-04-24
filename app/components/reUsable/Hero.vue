<template>
    <section class="hero site-content-container">
        <h1>{{ data?.heading }}</h1>
    </section>
</template>

<script>
export default {
    name: 'Hero',
    props: {
        data: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.hero {
    height: 100vh;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
