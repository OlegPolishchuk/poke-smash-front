import { api } from '@/api/instance.ts';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';

export const PokemonApi = {
  getPokemon(id: number) {
    return api.get<Pokemon>(`/api/pokemon/${id}`);
  },

  like(pokemon_id: number) {
    const data = { pokemon_id: pokemon_id, action: 'like' };
    return api.post(`/api/pokemon/swipe`, data);
  },

  dislike(pokemon_id: number) {
    const data = { pokemon_id: pokemon_id, action: 'dislike' };
    return api.post(`/api/pokemon/swipe`, data);
  },

  getPokemonSpecies(id: number) {
    return api.get<PokemonSpecies>(`/api/pokemon/species/${id}`);
  },
};
