<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from '@/ui/components/ui/skeleton';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';
import { MAX_POKEMON_STATS } from '@/services/constants.ts';
import { toPercent } from '@/lib/utils.ts';
import PokemonPhysicStatItem from '@/ui/components/pokemon-stats/pokemon-physic-stat-item.vue';

const MAX_EDGES = 15;

const { pokemon, isLoading } = defineProps<{ pokemon: Pokemon; isLoading: boolean }>();

const stats = computed(() => pokemon.stats);
</script>

<template>
  <div class="mb-5 rounded-xl bg-gray-300 p-4">
    <p class="text-xl text-muted-foreground mb-2">Stats</p>

    <div>
      <div class="grid grid-cols-6 gap-2">
        <template v-if="isLoading">
          <div v-for="n in MAX_POKEMON_STATS.length" :key="n" class="flex flex-col gap-2">
            <Skeleton class="h-[180px] w-full" />
            <Skeleton class="h-[28px] w-[80%] mx-auto" />
          </div>
        </template>

        <template v-else>
          <div v-for="(stat, index) in stats" :key="index" class="flex flex-col gap-2">
            <div class="relative h-[180px] w-full bg-background flex flex-col-reverse">
              <ul class="absolute top-0 left-0 w-full h-full flex flex-col justify-between z-10">
                <li v-for="n in MAX_EDGES" :key="n" class="w-full h-[4px] bg-gray-300" />
              </ul>

              <PokemonPhysicStatItem
                :value="
                  toPercent(
                    stat.base_stat,
                    MAX_POKEMON_STATS.find((s) => s.name === stat.stat.name)?.value,
                  )
                "
              />
            </div>

            <small class="text-sm font-medium leading-none text-center">{{ stat.stat.name }}</small>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
