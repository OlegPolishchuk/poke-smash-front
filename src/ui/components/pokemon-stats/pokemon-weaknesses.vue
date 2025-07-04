<script setup lang="ts">
import { Badge } from '@/ui/components/ui/badge';
import { ref, watch } from 'vue';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';
import { Skeleton } from '@/ui/components/ui/skeleton';
import { MAX_POKEMON_STATS } from '@/services/constants.ts';

const { pokemon } = defineProps<{ pokemon: Pokemon | undefined }>();

const weaknesses = ref<string[]>([]);

watch(
  () => pokemon,
  async (newPokemon) => {
    if (!newPokemon) return;

    // Создаем массив промисов с явной типизацией
    const pr: Promise<{ weaknesses: string[] } | null>[] =
      newPokemon.types?.map((type) => PokemonService.getPokemonWeaknesses(type.type.name)) || [];

    try {
      // Ожидаем выполнения всех промисов
      const weaknessesRes = await Promise.all(pr);

      // Фильтруем null-результаты и объединяем weaknesses
      const allWeaknesses = weaknessesRes
        .filter((res) => res !== null)
        .flatMap((res) => res!.weaknesses);

      // Удаляем дубликаты
      weaknesses.value = Array.from(new Set(allWeaknesses));
    } catch (error) {
      console.error('Error fetching weaknesses:', error);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="mb-5">
    <p class="text-xl text-muted-foreground mb-2">Weaknesses</p>

    <div class="flex flex-wrap items-center gap-2 text-background">
      <template v-if="!pokemon">
        <Skeleton v-for="(_, index) in MAX_POKEMON_STATS" :key="index" class="w-[50px] h-[20px]" />
      </template>

      <template v-else>
        <Badge v-for="(weakness, index) in weaknesses" :key="index" :variant="weakness"
          >{{ weakness }}
        </Badge>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
