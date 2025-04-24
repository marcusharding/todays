<template>
    <Close v-if="icon === 'close'" />
</template>

<script>
// COMPONENTS
import Close from '~/components/svg/icons/Close';

export default {
    name: 'IconPicker',
    components: { Close },
    props: {
        icon: {
            type: String,
            required: true
        }
    }
};
</script>
