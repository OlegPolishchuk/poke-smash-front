<script setup lang="ts">
import { getPartsPercentage, getPokemonColor, getPokemonImage } from '@/lib/utils.ts';
import { useSettingsStore } from '@/stores/settings.store.ts';
import type { PokemonWithStats } from '@/api/pokemon/pokemon.api.ts';
import { Badge } from '@/ui/components/ui/badge';
import { Progress } from '@/ui/components/ui/progress';

const { pokemon } = defineProps<{ pokemon: PokemonWithStats }>();

const settingsStore = useSettingsStore();
</script>

<template>
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

        <RouterLink :to="`/pokemon/${pokemon.id}`" class="flex items-center gap-2 hover:underline">
          <p>{{ pokemon.name }}</p>
        </RouterLink>
      </div>
    </div>

    <div class="w-full max-w-[500px] ml-auto mr-6 flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <p class="text-dislike">
          Passes
          <span class="text-foreground"
            >{{ getPartsPercentage(pokemon.dislikes, pokemon.likes)[0].toFixed(1) }}%</span
          >
        </p>
        <p class="text-secondary">
          Smashes
          <span class="text-foreground"
            >{{ getPartsPercentage(pokemon.likes, pokemon.dislikes)[0].toFixed(1) }}%</span
          >
        </p>
      </div>

      <div class="flex items-center gap-2">
        <small class="text-sm font-medium leading-none text-foreground">
          {{ pokemon.dislikes }}</small
        >
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
        <small class="text-sm font-medium leading-none text-foreground"> {{ pokemon.likes }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
