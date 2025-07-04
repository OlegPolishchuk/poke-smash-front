<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/components/ui/breadcrumb';
import { useRoute } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';
import { PokemonService, TYPE_COLOR_MAP } from '@/services/pokemon/pokemon.service.ts';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';
import { getPokemonBg, getPokemonImage } from '@/lib/utils.ts';
import { useSettingsStore } from '@/stores/settings.store.ts';
import { Badge } from '@/ui/components/ui/badge';
import PokemonStats from '@/ui/components/pokemon-stats/pokemon-stats.vue';
import PokemonPhysicStats from '@/ui/components/pokemon-stats/pokemon-physic-stats.vue';
import PokemonEvolutions from '@/ui/components/pokemon-evolutions/pokemon-evolutions.vue';
import PokemonWeaknesses from '@/ui/components/pokemon-stats/pokemon-weaknesses.vue';

const route = useRoute();

const settingsStore = useSettingsStore();

const pokemon = ref<Pokemon>();
const pokemonSpecies = ref<PokemonSpecies>();
const isLoading = ref(false);

const pokemonId = computed(() => +route.params.id);
const pokemonColor = computed(
  () => `var(--color-${TYPE_COLOR_MAP[pokemon.value?.types[0].type.name || 'default']})`,
);

const pokemonDescription = computed(() => {
  const enText = pokemonSpecies.value?.flavor_text_entries.find(
    (text) => text.language.name === 'en',
  );

  if (!enText) return pokemonSpecies.value?.flavor_text_entries[0].flavor_text;

  return enText.flavor_text;
});

const evolutionId = computed(() => {
  return pokemonSpecies.value?.evolution_chain.url.split('/').reverse()[1];
});

watchEffect(async () => {
  isLoading.value = true;

  const promises = await Promise.all([
    PokemonService.getPokemon(pokemonId.value),
    PokemonService.getPokemonSpecies(pokemonId.value),
  ]);

  pokemon.value = promises[0];
  pokemonSpecies.value = promises[1];

  isLoading.value = false;
});
</script>

<template>
  <main v-if="pokemon && pokemonSpecies" class="container max-w-[1080px] py-10">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"> Home </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage class="capitalize" :style="{ color: pokemonColor }">{{
            pokemon?.name
          }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="py-6">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize pb-4 border-b"
        :style="{ color: pokemonColor }"
      >
        {{ pokemon?.name }}
      </h1>

      <div class="grid grid-cols-2 gap-6 py-4 items-start">
        <div class="flex flex-col gap-2">
          <p class="leading-7 [&:not(:first-child)]:mt-2 font-medium">
            {{ pokemonDescription }}
          </p>

          <PokemonStats :pokemon="pokemon" :pokemon-species="pokemonSpecies" />
          <PokemonPhysicStats :pokemon="pokemon" :is-loading="isLoading" />
        </div>

        <div>
          <div
            class="w-full h-fit min-h-[400px] mb-5 flex items-center justify-center rounded-xl border-[4px] relative select-none"
            :style="{
              backgroundImage: getPokemonBg(pokemon),
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              borderColor: pokemonColor,
            }"
          >
            <img
              class="min-w-[60%]"
              :src="getPokemonImage({ pokemon, cardStyle: settingsStore.cardStyle })"
              :alt="pokemon.name"
            />
          </div>

          <div>
            <div class="mb-5">
              <p class="text-xl text-muted-foreground mb-2">Type</p>

              <div class="flex flex-wrap items-center gap-2 text-background">
                <Badge v-for="(type, index) in pokemon.types" :key="index" :variant="type.type.name"
                  >{{ type.type.name }}
                </Badge>
              </div>
            </div>

            <PokemonWeaknesses :pokemon="pokemon" />
          </div>
        </div>
      </div>

      <PokemonEvolutions :evolutions-id="evolutionId" :pokemon="pokemon" />
    </div>
  </main>
</template>
