import { api } from '@/api/instance.ts';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';
import type { Ability } from '@/entities/pokemon/ability.ts';

export interface ActionResponse {
  likes: number;
  dislikes: number;
  atime: string;
  id: string;
}

export interface PokemonStatistic {
  likes: number;
  disliked: number;
  id: string;
  pokemon_id: number;
  created_at: string;
  updated_at: string;
  max_action_count: number;
}

export const PokemonApi = {
  getPokemon(id: number) {
    return api.get<Pokemon>(`/api/pokemon/${id}`);
  },

  like(pokemon_id: number) {
    const data = { pokemon_id: pokemon_id, action: 'like' };
    return api.post<ActionResponse>(`/api/pokemon/swipe`, data);
  },

  dislike(pokemon_id: number) {
    const data = { pokemon_id: pokemon_id, action: 'dislike' };
    return api.post<ActionResponse>(`/api/pokemon/swipe`, data);
  },

  getPokemonSpecies(id: number) {
    return api.get<PokemonSpecies>(`/api/pokemon/species/${id}`);
  },

  getPokemonStatistic(id: number) {
    return api.get<PokemonStatistic>(`/api/pokemon/statistic/${id}`);
  },

  getPokemonAbility(id: number | string) {
    return api.get<Ability>(`/api/pokemon/ability/${id}`);
  },

  getPokemonWeaknesses(pokemonId: number | string) {
    return api.get<{ weaknesses: string[] }>(`/api/pokemon/weaknesses/${pokemonId}`);
  },
};
