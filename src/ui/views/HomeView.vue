<script setup lang="ts">
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';
import { ref, watchEffect } from 'vue';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';
import { Button } from '@/ui/components/ui/button';
import PokemonCard from '@/ui/components/pokemon-card/pokemon-card.vue';
import CardStyleSelect from '@/ui/components/card-style-select/card-style-select.vue';
import type { CardStyle } from '@/services/constants/constants.ts';
import { Motion } from 'motion-v'
import { getRandomCardAngle } from '@/lib/utils.ts';


const pokemon = ref<Pokemon | null>(null);
const pokemonSpecies = ref<PokemonSpecies | null>(null);
const cardStyle = ref<CardStyle>('showdown');

watchEffect(async () => {
  const randomPokemonId = PokemonService.getRandomPokemonId();

  const promises = await Promise.all([
    PokemonService.getPokemon(randomPokemonId),
    PokemonService.getPokemonSpecies(randomPokemonId),
  ]);

  pokemon.value = promises[0];
  pokemonSpecies.value = promises[1];
});
</script>

<template>
  <header class="flex items-center container py-2">
    <CardStyleSelect :style="cardStyle" @on-change="(style) => (cardStyle = style)" />
    <Button variant="link" class="ml-auto">Stats</Button>
  </header>
  <main class="container flex flex-col gap-5 items-center w-full">


    <h1 class="font-bold text-[calc(1rem+4vh)]">
      <span class="font-pokemon text-poke poke-stroke">Poke</span>
      <span class="text-destructive uppercase font-sans ml-4 tracking-[-4px]">smash</span>
    </h1>


    <Motion
      class="w-fit"
      :initial="{ scale: 0, y: '-100%' }"
      :animate="{ scale: 1, y: 0, rotate: getRandomCardAngle()}"
      :transition="{
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.2,
    }"
    >
      <PokemonCard
        v-if="pokemon && pokemonSpecies"
        :pokemon="pokemon"
        :pokemon-species="pokemonSpecies"
        :card-style="cardStyle"
      />
    </Motion>
  </main>
</template>
