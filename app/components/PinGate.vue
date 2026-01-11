<template>
    <div v-if="!isAuthenticated" class="pin-gate">
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
import { ref, onMounted } from 'vue';

const CORRECT_PIN = '3160';
const STORAGE_KEY = 'todays-authenticated';

const pin = ref('');
const error = ref('');
const isAuthenticated = ref(false);
const pinInput = ref(undefined);

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
    // Check if already authenticated
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
        isAuthenticated.value = true;
    } else {
        // Focus input on mount
        pinInput.value?.focus();
    }
});
</script>

<style lang="scss" scoped>
.pin-gate {
    position: fixed;
    inset: 0;
    background: color(TrueBlack);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.pin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.pin-input {
    background: transparent;
    border: none;
    border-bottom: 2px solid color(TrueWhite, 0.3);
    color: color(TrueWhite);
    font-size: 2rem;
    text-align: center;
    width: 120px;
    padding: 0.5rem;
    letter-spacing: 0.5rem;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: color(TrueWhite, 0.6);
    }

    &::placeholder {
        color: color(TrueWhite, 0.3);
        letter-spacing: normal;
    }
}

.pin-error {
    color: #ff6b6b;
    font-size: 0.875rem;
    margin: 0;
}
</style>
