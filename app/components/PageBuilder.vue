<template>
    <template v-for="component in components" :key="component._key">
        <DummyBlock v-if="component._type === 'dummyBlock'" :data="component" />
    </template>
</template>

<script>
// COMPONENTS
import DummyBlock from './pageBuilder/DummyBlock';

export default {
    name: 'PageBuilder',
    components: { DummyBlock },
    props: {
        components: {
            type: Array,
            required: true
        }
    }
};
</script>
