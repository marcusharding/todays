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
    background: transparent;
    border: 1px solid color(TrueWhite, 0.2);
    color: color(TrueWhite);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;

    &:hover {
        border-color: color(TrueWhite, 0.4);
        background: color(TrueWhite, 0.05);
    }
}

.current-mode {
    opacity: 0.8;
}

.dropdown-arrow {
    opacity: 0.5;
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
    background: color(AlmostBlack);
    border: 1px solid color(TrueWhite, 0.15);
    border-radius: 4px;
    overflow: hidden;
    min-width: 100%;
}

.dropdown-option {
    display: block;
    width: 100%;
    padding: 0.625rem 1rem;
    background: transparent;
    border: none;
    color: color(TrueWhite, 0.7);
    font-size: 0.875rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;

    &:hover {
        background: color(TrueWhite, 0.08);
        color: color(TrueWhite);
    }

    &.active {
        color: color(TrueWhite);
        background: color(TrueWhite, 0.1);
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
