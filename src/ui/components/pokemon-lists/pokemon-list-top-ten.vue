<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';
import PokemonCardList from '@/ui/components/pokemon-card/pokemon-card-list.vue';
import type { PokemonWithStats } from '@/api/pokemon/pokemon.api.ts';

import { Motion } from 'motion-v';

const pokemons = ref<PokemonWithStats[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  pokemons.value = await PokemonService.getPokemonListTopTen();
  isLoading.value = false;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <Motion
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.id"
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
