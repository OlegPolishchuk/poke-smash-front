<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon.store.ts';
import { computed } from 'vue';
import type { CardStyle } from '@/services/constants.ts';
import { TYPE_COLOR_MAP } from '@/services/pokemon/pokemon.service.ts';
import { getPokemonBg, getPokemonImage } from '@/lib/utils.ts';

const { cardStyle } = defineProps<{ cardStyle: CardStyle }>();

const pokeStore = usePokemonStore();

const textClasses = 'scroll-m-20 text-xl font-semibold tracking-tight';

const pokemonImgSrc = computed(() =>
  getPokemonImage({ pokemon: pokeStore.prevPokemon!, cardStyle }),
);
const pokemonTextColor = computed(() => `var(--color-${TYPE_COLOR_MAP[pokeStore.typeColor]})`);
</script>

<template>
  <div v-if="pokeStore.prevPokemon?.id" class="flex flex-col gap-2 justify-center items-center">
    <h4 :class="textClasses">
      What Others Chose for
      <span :style="{ color: pokemonTextColor }">{{ pokeStore.prevPokemon?.name }}</span
      >...
    </h4>

    <div class="flex items-center gap-2">
      <div class="flex flex-col gap-2">
        <p :class="textClasses">Passes</p>
        <div />
        <p :class="textClasses">10245</p>
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
        <div />
        <p :class="textClasses">1045245</p>
      </div>
    </div>
  </div>
</template>
