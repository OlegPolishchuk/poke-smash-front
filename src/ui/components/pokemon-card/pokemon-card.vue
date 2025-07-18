<script setup lang="ts">
import { Card, CardContent } from '@/ui/components/ui/card';

import { PokemonService } from '@/services/pokemon/pokemon.service.ts';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';
import CardBackground from '@/ui/components/ui/card/CardBackground.vue';
import CardImg from '@/ui/components/ui/card/CardImg.vue';
import { Badge } from '@/ui/components/ui/badge';
import { computed } from 'vue';
import type { CardStyle } from '@/services/constants.ts';
import { getPokemonImage } from '@/lib/utils.ts';

const { pokemon, pokemonSpecies, cardStyle } = defineProps<{
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  cardStyle: CardStyle;
}>();

const pokemonDescription = computed(() => {
  const enText = pokemonSpecies.flavor_text_entries.find((text) => text.language.name === 'en');

  if (!enText) return pokemonSpecies.flavor_text_entries[0].flavor_text;

  return enText.flavor_text;
});

const pokemonImgSrc = computed(() => getPokemonImage({ pokemon, cardStyle }));
</script>

<template>
  <Card
    v-if="pokemon"
    class="relative aspect-[0.75] min-h-[300px] max-h-[450px] rounded-[1.5em] overflow-hidden card-shadow select-none"
  >
    <CardBackground
      :src="`/backgrounds/bg-${PokemonService.getPokemonBackground(pokemon.types[0].type.name)}.png`"
    />
    <CardImg :src="pokemonImgSrc" :alt="pokemon.name" />

    <CardContent class="relative z-20 mt-auto text-background">
      <h2
        class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-2 capitalize"
      >
        <RouterLink :to="`/pokemon/${pokemon.id}`" class="hover:underline">
          {{ pokemon.name }}
        </RouterLink>
      </h2>

      <div class="flex flex-wrap items-center gap-2">
        <Badge v-for="(type, index) in pokemon.types" :key="index" :variant="type.type.name"
          >{{ type.type.name }}
        </Badge>
      </div>

      <p class="leading-7 [&:not(:first-child)]:mt-2 font-medium">
        {{ pokemonDescription }}
      </p>
    </CardContent>
  </Card>
</template>
