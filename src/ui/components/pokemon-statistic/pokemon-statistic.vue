<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon.store.ts';
import { computed, ref, watchEffect } from 'vue';
import type { CardStyle } from '@/services/constants.ts';
import { PokemonService, TYPE_COLOR_MAP } from '@/services/pokemon/pokemon.service.ts';
import { getPokemonBg, getPokemonImage } from '@/lib/utils.ts';
import ActionProgress from '@/ui/components/action-progress/action-progress.vue';
import type { PokemonStatistic } from '@/api/pokemon/pokemon.api.ts';

const { cardStyle } = defineProps<{ cardStyle: CardStyle }>();

const pokeStore = usePokemonStore();
const stats = ref<PokemonStatistic>();

const textClasses = 'scroll-m-20 text-xl font-semibold tracking-tight';

const pokemonImgSrc = computed(() =>
  getPokemonImage({ pokemon: pokeStore.prevPokemon!, cardStyle }),
);
const pokemonTextColor = computed(() => `var(--color-${TYPE_COLOR_MAP[pokeStore.typeColor]})`);

watchEffect( async () => {
  if(pokeStore.prevPokemon?.id) {
    stats.value = await PokemonService.getPokemonStatistic(pokeStore.prevPokemon?.id)
  }
})

</script>

<template>
  <div
    v-if="pokeStore.prevPokemon?.id"
    class="w-full max-w-[530px] flex flex-col gap-2 justify-center items-center"
  >
    <h4 :class="textClasses">
      What Others Chose for
      <span class="capitalize" :style="{ color: pokemonTextColor }">{{ pokeStore.prevPokemon?.name }}</span
      >...
    </h4>

    <div class="w-full grid grid-cols-[1fr_120px_1fr] items-center gap-2">
      <div class="flex flex-col items-end gap-2">
        <p :class="textClasses">Passes</p>
        <ActionProgress :value="33" variant="pass" class="rotate-180" />
        <p :class="textClasses">{{stats?.disliked}}</p>
      </div>

      <div
        class="w-[120px] h-[120px] flex items-center justify-center rounded-xl border-[4px] relative select-none"
        :style="{
          backgroundImage: getPokemonBg(pokeStore.prevPokemon!),
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          borderColor: pokemonTextColor,
        }"
      >
        <img :src="pokemonImgSrc" :alt="pokeStore.prevPokemon?.name" />
      </div>

      <div class="flex flex-col gap-2">
        <p :class="textClasses">Smashes</p>
        <ActionProgress variant="smash" :value="80" />
        <p :class="textClasses">{{stats?.likes}}</p>
      </div>
    </div>
  </div>
</template>
