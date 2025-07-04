<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';
import type { EvolutionChain } from '@/entities/pokemon/evolution.ts';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';
import { getPokemonImage } from '@/lib/utils.ts';
import { useSettingsStore } from '@/stores/settings.store.ts';
import { ChevronRight } from 'lucide-vue-next';
import { Badge } from '@/ui/components/ui/badge';

const { evolutionsId, pokemon } = defineProps<{
  evolutionsId: number | string | undefined;
  pokemon: Pokemon;
}>();

const settingsStore = useSettingsStore();

const isLoading = ref(false);
const evolutions = ref<EvolutionChain>();
const pokemonsQueue = ref<Pokemon[]>([]);

const generatePokemonPromises = async (evolutions: EvolutionChain, pokemonName: string) => {
  const first = evolutions.chain.species.name;
  const second = evolutions.chain.evolves_to[0].species.name;
  const third = evolutions.chain.evolves_to[0].evolves_to[0]?.species.name;

  return Promise.all(
    [first, second, third]
      .filter((name) => name && name !== pokemonName)
      .map((name) => PokemonService.getPokemon(name)),
  );
};

watchEffect(async () => {
  if (!evolutionsId) return;

  isLoading.value = true;

  evolutions.value = await PokemonService.getPokemonEvolutions(evolutionsId);
  const pokemons = await generatePokemonPromises(evolutions.value, pokemon.name);

  pokemonsQueue.value = pokemonsQueue.value
    .concat([...pokemons, pokemon])
    .sort((a, b) => a.id - b.id);

  isLoading.value = false;
});
</script>

<template>
  <div class="mb-5 rounded-xl bg-ring p-4">
    <p class="text-xl text-background mb-2">Evolutions</p>

    <div v-if="pokemonsQueue.length" class="p-2 flex items-center justify-evenly">
      <template v-for="(poke, index) in pokemonsQueue" :key="poke.id">
        <div class="flex flex-col gap-2">
          <RouterLink :to="`/pokemon/${poke.id}`">
            <div
              class="rounded-full w-[160px] aspect-square border-[6px] border-background flex items-center justify-center select-none"
            >
              <img
                :src="getPokemonImage({ pokemon: poke, cardStyle: settingsStore.cardStyle })"
                :alt="poke.name"
                class="w-full max-w-[100px]"
              />
            </div>
          </RouterLink>

          <div class="flex flex-col gap-2">
            <RouterLink :to="`/pokemon/${poke.id}`">
              <div class="flex items-center justify-center gap-2">
                <p class="text-xl text-background mb-2 capitalize text-background">
                  {{ poke.name }}
                </p>
                <p class="text-xl text-background mb-2">#{{ poke.id }}</p>
              </div>
            </RouterLink>

            <div class="flex flex-wrap items-center justify-center gap-2 text-background">
              <Badge
                v-for="(type, innerIndex) in pokemon.types"
                :key="innerIndex"
                :variant="type.type.name"
                >{{ type.type.name }}
              </Badge>
            </div>
          </div>
        </div>

        <ChevronRight
          v-if="index !== pokemonsQueue.length - 1"
          class="text-background w-[100px] h-[60px]"
        />
      </template>
    </div>
  </div>
</template>
