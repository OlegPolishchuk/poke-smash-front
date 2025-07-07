<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { Motion } from 'motion-v';
import { PokemonService } from '@/services/pokemon/pokemon.service';
import { getPartsPercentage, getPokemonColor, getPokemonImage } from '@/lib/utils';
import { useSettingsStore } from '@/stores/settings.store.ts';
import { Badge } from '@/ui/components/ui/badge';
import { Progress } from '@/ui/components/ui/progress';
import type { PokemonWithStats } from '@/api/pokemon/pokemon.api.ts';

const DEFAULT_LIMIT = 20;

const settingsStore = useSettingsStore();

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
      :style="{ borderColor: getPokemonColor(pokemon) }"
    >
      <div :style="{ color: getPokemonColor(pokemon) }" class="flex items-center gap-6">
        <p>#{{ pokemon.id }}</p>

        <div class="flex items-center gap-4">
          <img
            class="max-w-[50px] max-h-[50px]"
            :src="getPokemonImage({ pokemon, cardStyle: settingsStore.cardStyle })"
            :alt="pokemon.name"
          />

          <div class="flex flex-col justify-between">
            <div class="flex flex-wrap items-center gap-2 text-background">
              <Badge v-for="(type, i) in pokemon.types" :key="i" :variant="type.type.name"
                >{{ type.type.name }}
              </Badge>
            </div>

            <RouterLink
              :to="`/pokemon/${pokemon.id}`"
              class="flex items-center gap-2 hover:underline"
            >
              <p>{{ pokemon.name }}</p>
            </RouterLink>
          </div>
        </div>

        <div class="w-full max-w-[500px] ml-auto mr-6 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <p class="text-dislike">
              Passes
              <span class="text-foreground">{{
                getPartsPercentage(pokemon.dislikes, pokemon.likes)[0].toFixed(2)
              }}</span>
            </p>
            <p class="text-secondary">
              Smashes
              <span class="text-foreground">{{
                getPartsPercentage(pokemon.likes, pokemon.dislikes)[0].toFixed(2)
              }}</span>
            </p>
          </div>
          <Progress
            :model-value="getPartsPercentage(pokemon.likes, pokemon.dislikes)[0]"
            :class="
              getPartsPercentage(pokemon.likes, pokemon.dislikes)[0] === 0 &&
              getPartsPercentage(pokemon.likes, pokemon.dislikes)[1] === 0
                ? 'opacity-30'
                : ''
            "
            class="h-[20px] rounded bg-dislike rotate-180"
            indicator-class=" bg-secondary rounded"
          />
        </div>
      </div>
    </Motion>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="h-10 text-center py-2 text-gray-500">Загрузка...</div>
  </div>
</template>
