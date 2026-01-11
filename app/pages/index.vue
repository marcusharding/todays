<template>
    <div class="index container site-content-container">
        <ModeDropdown v-model="currentMode" />

        <!-- Quote Mode -->
        <p v-if="currentMode === 'quote'" class="clickable" @click="handleClick">
            {{ showEasterEgg ? whatImWorkingOn : quoteOfTheDay?.quote }}
        </p>

        <!-- Question Mode -->
        <template v-else-if="currentMode === 'question'">
            <p>{{ questionOfTheDay?.question }}</p>
            <div v-if="questionOfTheDay?.name" class="attribution">
                <p class="attribution-name">{{ questionOfTheDay.name }}</p>
                <p v-if="questionOfTheDay.date" class="attribution-date">
                    {{ formatDate(questionOfTheDay.date) }}
                </p>
                <p v-if="questionOfTheDay.location" class="attribution-location">
                    {{ questionOfTheDay.location }}
                </p>
            </div>
        </template>

        <!-- Reflection Mode -->
        <p v-else-if="currentMode === 'reflection'">
            {{ reflectionOfTheDay?.reflection }}
        </p>
    </div>
</template>

<script setup>
// QUERIES
import { homepageQuery } from '~/queries/pages/homepage';
import { questionsQuery } from '~/queries/pages/questions';
import { reflectionsQuery } from '~/queries/pages/reflections';
import { metaQuery } from '~/queries/helpers/pageMeta';
import { onMounted, ref, computed, watch } from 'vue';
import { useGlobalStore } from '~/store/global';

// CONSTANTS
const MODE_STORAGE_KEY = 'todays-mode';

// DATA
const { data: quotesData, error: quotesError } = await useSanityQuery(homepageQuery);
const { data: questionsData, error: questionsError } = await useSanityQuery(questionsQuery);
const { data: reflectionsData, error: reflectionsError } = await useSanityQuery(reflectionsQuery);
const { data: meta, error: metaError } = await useSanityQuery(metaQuery('homepage'));

if (quotesError.value) {
    console.error('Error fetching quotes:', quotesError.value);
}
if (questionsError.value) {
    console.error('Error fetching questions:', questionsError.value);
}
if (reflectionsError.value) {
    console.error('Error fetching reflections:', reflectionsError.value);
}
if (metaError.value) {
    console.error('Error fetching meta data:', metaError.value);
}

// META
useMeta(meta?.value?.metaData, quotesData?.value);

// STORE
const globalStore = useGlobalStore();

// MODE STATE
const currentMode = ref('quote');

// EASTER EGG STATE (for quotes)
const clickCount = ref(0);
const showEasterEgg = ref(false);
let clickTimeout = undefined;

// HELPER: Get day of year for consistent daily selection
const getDayOfYear = () => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).formatToParts(new Date());

    const y = Number(parts.find((p) => p.type === 'year').value);
    const m = Number(parts.find((p) => p.type === 'month').value) - 1;
    const d = Number(parts.find((p) => p.type === 'day').value);
    const startOfYearUTC = Date.UTC(y, 0, 0);
    const todayUTC = Date.UTC(y, m, d);
    return Math.floor((todayUTC - startOfYearUTC) / (1000 * 60 * 60 * 24));
};

// COMPUTED
const quoteOfTheDay = computed(() => {
    const list = quotesData.value || [];
    if (!list.length) return undefined;
    return list[getDayOfYear() % list.length];
});

const questionOfTheDay = computed(() => {
    const list = questionsData.value || [];
    if (!list.length) return undefined;
    return list[getDayOfYear() % list.length];
});

const reflectionOfTheDay = computed(() => {
    const list = reflectionsData.value || [];
    if (!list.length) return undefined;
    return list[getDayOfYear() % list.length];
});

const whatImWorkingOn = computed(() => {
    return globalStore.siteSettings?.whatImWorkingOn || 'Nothing specific at the moment.';
});

// METHODS
const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

const handleClick = () => {
    clickCount.value++;

    if (clickTimeout) {
        clearTimeout(clickTimeout);
    }

    if (clickCount.value >= 10) {
        showEasterEgg.value = true;
        clickCount.value = 0;
    } else {
        clickTimeout = window.setTimeout(() => {
            clickCount.value = 0;
        }, 2000);
    }
};

const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

// WATCHERS
watch(currentMode, (newMode) => {
    localStorage.setItem(MODE_STORAGE_KEY, newMode);
    // Reset easter egg when switching modes
    showEasterEgg.value = false;
    clickCount.value = 0;
});

onMounted(() => {
    // Restore saved mode
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
    if (savedMode && ['quote', 'question', 'reflection'].includes(savedMode)) {
        currentMode.value = savedMode;
    }

    setVh();
    window.addEventListener('resize', setVh);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', setVh);
    if (clickTimeout) {
        clearTimeout(clickTimeout);
    }
});
</script>

<style lang="scss" scoped>
.index.container {
    height: 100dvh;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.index p {
    @include typography('heading-6');

    @include laptop-up {
        @include typography('heading-4');
        text-align: center;
    }

    &.clickable {
        cursor: pointer;
        user-select: none;
        transition: opacity 0.2s ease;
        -webkit-tap-highlight-color: transparent;
        tap-highlight-color: transparent;

        &:hover {
            opacity: 0.8;
        }
    }
}

.attribution {
    position: absolute;
    bottom: 2rem;
    left: 24px;
    right: 24px;
    text-align: left;

    @include laptop-up {
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        right: auto;
    }
}

.attribution p {
    font-size: 16px !important;
    line-height: 1.4;
    font-style: italic;
    font-weight: 300 !important;
    margin: 0;

    @include laptop-up {
        font-size: 20px !important;
    }
}

.attribution-name {
    opacity: 0.5;
}

.attribution-date {
    margin-top: 0.25rem;
    opacity: 0.45;
}

.attribution-location {
    margin-top: 0.25rem;
    opacity: 0.45;
}
</style>
