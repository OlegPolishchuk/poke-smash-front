<script setup lang="ts">
import { decimetersToFeetInches, hectogramsToPounds } from '@/lib/utils.ts';
import PokemonStatItem from '@/ui/components/pokemon-stats/pokemon-stat-item.vue';
import { CircleQuestionMark, Mars, Venus } from 'lucide-vue-next';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';
import { computed, ref, watchEffect } from 'vue';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/components/ui/tooltip';

const { pokemon, pokemonSpecies } = defineProps<{
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
}>();

const pokemonCategory = computed(() => {
  const enText = pokemonSpecies.genera.find((text) => text.language.name === 'en');

  if (!enText) return pokemonSpecies.genera[0].genus.split(' ')[0] || '-';

  return enText.genus.split(' ')[0] || '-';
});

const abilityDescriptions = ref<string[]>([]);

watchEffect(async () => {
  const abilityNames = pokemon.abilities.map((ability) => ability.ability.name);

  const promises = await Promise.all(
    abilityNames.map((name) => PokemonService.getPokemonAbility(name)),
  );
  abilityDescriptions.value = promises.map(
    (abilityResponse) =>
      abilityResponse.flavor_text_entries.find((text) => text.language.name === 'en')
        ?.flavor_text || abilityResponse.flavor_text_entries[0].flavor_text,
  );
});
</script>

<template>
  <div class="rounded-xl bg-primary/60 p-6 grid grid-cols-2 gap-2 font-mono">
    <div class="flex flex-col gap-4">
      <PokemonStatItem title="Height">
        <template #value>{{ decimetersToFeetInches(pokemon.height) }}</template>
      </PokemonStatItem>

      <PokemonStatItem title="Weight">
        <template #value>{{ hectogramsToPounds(pokemon.weight) }}</template>
        <template #prefix>lbs</template>
      </PokemonStatItem>

      <PokemonStatItem title="Gender">
        <template #value>
          <div class="flex items-center gap-2">
            <Mars />
            <Venus />
          </div>
        </template>
      </PokemonStatItem>
    </div>

    <div class="flex flex-col gap-4">
      <PokemonStatItem title="Category">
        <template #value>{{ pokemonCategory }}</template>
      </PokemonStatItem>

      <PokemonStatItem title="Abilities">
        <template #value>
          <div>
            <div v-for="(ability, index) in pokemon.abilities" :key="index">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <div class="relative flex items-center gap-1 cursor-pointer">
                      {{ ability.ability.name }}
                      <CircleQuestionMark class="text-background" />
                    </div>
                  </TooltipTrigger>

                  <TooltipContent class="bg-foreground">
                    <p>{{ abilityDescriptions[index] }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </template>
      </PokemonStatItem>
    </div>
  </div>
</template>
