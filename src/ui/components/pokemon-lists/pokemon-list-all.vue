<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { PokemonService } from '@/services/pokemon/pokemon.service';
import type { PokemonWithStats } from '@/api/pokemon/pokemon.api.ts';
import PokemonCardList from '@/ui/components/pokemon-card/pokemon-card-list.vue';
import { Motion } from 'motion-v';

const DEFAULT_LIMIT = 20;

const offset = ref(0);
const limit = ref(DEFAULT_LIMIT);
const pokemons = ref<PokemonWithStats[]>([]);
const hasMore = ref(true);
const isLoading = ref(false);

// Для ссылок на DOM-элементы карточек
const itemRefs = ref<HTMLElement[]>([]);

// Ссылка на текущего наблюдаемого элемента
let stopObserver: (() => void) | null = null;

// Подгрузка данных
const loadData = async (isAppending = false) => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  try {
    const data = await PokemonService.getPokemonList({
      limit: limit.value,
      offset: offset.value,
    });

    if (isAppending) {
      pokemons.value = [...pokemons.value, ...data.results];
    } else {
      pokemons.value = data.results;
    }

    hasMore.value = !!data.next;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  } finally {
    isLoading.value = false;
    // Ждём, пока элементы появятся в DOM
    await nextTick();
    observeNearEnd();
  }
};

// Функция отслеживания элемента `length - 5`
const observeNearEnd = () => {
  if (stopObserver) stopObserver(); // остановка предыдущего наблюдателя

  const triggerIndex = pokemons.value.length - 5;
  const el = itemRefs.value[triggerIndex];

  if (el) {
    const { stop } = useIntersectionObserver(el, ([entry]) => {
      if (entry.isIntersecting && hasMore.value && !isLoading.value) {
        offset.value += limit.value;
        loadData(true);
      }
    });
    stopObserver = stop;
  }
};

// Инициализирующая загрузка
loadData(false);

// Очистка наблюдателя при размонтировании
onUnmounted(() => {
  if (stopObserver) stopObserver();
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <Motion
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.id"
      :ref="(el) => (itemRefs[index] = el)"
      tag="div"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ delay: (index % 20) * 0.1, duration: 0.3 }"
      class="px-2 py-4 border rounded-lg transition-all"
    >
      <PokemonCardList :pokemon="pokemon" />
    </Motion>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="h-10 text-center py-2 text-gray-500">Загрузка...</div>
  </div>
</template>
