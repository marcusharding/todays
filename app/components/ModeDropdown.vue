<template>
    <div class="mode-dropdown">
        <button class="dropdown-trigger" @click="toggleDropdown">
            <span class="current-mode">{{ currentLabel }}</span>
            <span class="dropdown-arrow" :class="{ open: isOpen }">▾</span>
        </button>
        <Transition name="dropdown">
            <div v-if="isOpen" class="dropdown-menu">
                <button
                    v-for="option in options"
                    :key="option.value"
                    class="dropdown-option"
                    :class="{ active: modelValue === option.value }"
                    @click="selectOption(option.value)"
                >
                    {{ option.label }}
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const options = [
    { value: 'quote', label: "Today's Quote" },
    { value: 'question', label: "Today's Question" },
    { value: 'reflection', label: "Today's Reflection" }
];

const currentLabel = computed(() => {
    const option = options.find((o) => o.value === props.modelValue);
    return option ? option.label : "Today's...";
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (value) => {
    emit('update:modelValue', value);
    isOpen.value = false;
};

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
    document.addEventListener('click', (event) => {
        const dropdown = document.querySelector('.mode-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            isOpen.value = false;
        }
    });
}
</script>

<style lang="scss" scoped>
.mode-dropdown {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 100;

    @include laptop-up {
        top: 2rem;
        right: 2rem;
    }
}

.dropdown-trigger {
    background: color(AlmostBlack, 0.08);
    border: 1px solid color(AlmostBlack, 0.3);
    color: color(AlmostBlack);
    padding: 0.625rem 1.125rem;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    @include typography('body-m');
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        border-color: color(AlmostBlack, 0.5);
        background: color(AlmostBlack, 0.12);
    }
}

.current-mode {
    font-weight: 500;
}

.dropdown-arrow {
    opacity: 0.6;
    transition: transform 0.2s ease;
    font-size: 0.75rem;

    &.open {
        transform: rotate(180deg);
    }
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: color(AlmostWhite);
    border: 1px solid color(AlmostBlack, 0.15);
    border-radius: 4px;
    overflow: hidden;
    min-width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-option {
    display: block;
    width: 100%;
    padding: 0.625rem 1rem;
    background: transparent;
    border: none;
    color: color(AlmostBlack, 0.7);
    @include typography('body-s');
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background: color(AlmostBlack, 0.08);
        color: color(AlmostBlack);
    }

    &.active {
        color: color(AlmostBlack);
        background: color(AlmostBlack, 0.1);
    }
}

// Transition styles
.dropdown-enter-active,
.dropdown-leave-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
