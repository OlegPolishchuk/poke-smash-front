import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';

export const usePokemonStore = defineStore('pokemon', () => {
  const prevPokemon = ref<Pokemon | null>(null);

  const typeColor = computed(() => prevPokemon.value?.types[0].type.name || 'default');

  function setPrevious(pokemon: Pokemon) {
    prevPokemon.value = pokemon;
  }

  return { prevPokemon, setPrevious, typeColor };
});
