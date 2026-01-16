<template>
    <div v-if="showGate" class="pin-gate" :class="{ 'is-checking': isChecking }">
        <div class="pin-container">
            <input
                ref="pinInput"
                v-model="pin"
                type="password"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="4"
                placeholder="PIN"
                class="pin-input"
                autofocus
                @keyup.enter="checkPin"
            />
            <p v-if="error" class="pin-error">{{ error }}</p>
        </div>
    </div>
    <slot v-else />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const CORRECT_PIN = '3160';
const STORAGE_KEY = 'todays-authenticated';

const pin = ref('');
const error = ref('');
const isAuthenticated = ref(false);
const isChecking = ref(true);
const pinInput = ref(undefined);

const showGate = computed(() => isChecking.value || !isAuthenticated.value);

const checkPin = () => {
    if (pin.value === CORRECT_PIN) {
        isAuthenticated.value = true;
        localStorage.setItem(STORAGE_KEY, 'true');
        error.value = '';
    } else {
        error.value = 'Incorrect PIN';
        pin.value = '';
    }
};

onMounted(() => {
    // Check localStorage on client only
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
        isAuthenticated.value = true;
    }
    isChecking.value = false;

    // Focus input if not authenticated
    if (!isAuthenticated.value) {
        pinInput.value?.focus();
    }
});
</script>

<style lang="scss" scoped>
.pin-gate {
    position: fixed;
    inset: 0;
    background: #f2efed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    &.is-checking .pin-container {
        opacity: 0;
    }
}

.pin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 24px;

    @include laptop-up {
        padding: 40px;
    }
}

.pin-input {
    background: transparent;
    border: none;
    border-bottom: 2px solid color(AlmostBlack, 0.2);
    color: color(AlmostBlack);
    text-align: center;
    width: 140px;
    padding: 0.75rem;
    letter-spacing: 0.5rem;
    outline: none;
    transition: border-color 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    @include typography('heading-6');

    @include laptop-up {
        @include typography('heading-5');
        width: 180px;
    }

    &:focus {
        border-color: color(AlmostBlack, 0.5);
    }

    &::placeholder {
        color: color(AlmostBlack, 0.3);
        letter-spacing: normal;
    }
}

.pin-error {
    @include typography('body-s');
    color: color(AlmostBlack, 0.6);
    margin: 0;
}
</style>
