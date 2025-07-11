import { PokemonApi } from '@/api/pokemon/pokemon.api.ts';
import type { PaginatedParams } from '@/api/types.ts';

export const MAX_POKEMON_COUNT = 1025;

const BACKGROUND_MAP = {
  bug: ['forest'],
  dark: ['city'],
  dragon: ['space'],
  electric: ['thunderplains'],
  fairy: ['space'],
  fighting: ['city', 'meadow'],
  fire: ['volcanocave', 'desert'],
  flying: ['mountain', 'route'],
  ghost: ['earthycave'],
  grass: ['meadow'],
  ground: ['mountain', 'earthycave', 'route'],
  ice: ['icecave'],
  normal: ['route', 'city'],
  poison: ['earthycave'],
  psychic: ['city', 'spl'],
  rock: ['mountain', 'earthycave'],
  steel: ['mountain'],
  water: ['beach', 'beachshore', 'river', 'deepsea'],
};

export const TYPE_COLOR_MAP: Record<string, string> = {
  bug: 'lime-600',
  dark: 'black',
  dragon: 'indigo-600',
  electric: 'yellow-600',
  fairy: 'pink-600',
  fighting: 'red-600',
  fire: 'orange-600',
  flying: 'sky-600',
  ghost: 'purple-600',
  grass: 'green-600',
  ground: 'amber-600',
  normal: 'neutral-600',
  poison: 'violet-600',
  rock: 'stone-600',
  steel: 'zinc-600',
  water: 'blue-600',
  ice: 'primary',
  psychic: 'zinc-600',

  default: 'foreground',
};

export const PokemonService = {
  async getPokemon(id?: number | string) {
    try {
      const pokemon = await PokemonApi.getPokemon(id ?? this.getRandomPokemonId());

      return pokemon.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async like(pokemon_id: number) {
    try {
      const actionRes = await PokemonApi.like(pokemon_id);

      return actionRes.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async dislike(pokemon_id: number) {
    try {
      const actionRes = await PokemonApi.dislike(pokemon_id);

      return actionRes.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async getPokemonSpecies(id: number) {
    try {
      const pokemonSpecies = await PokemonApi.getPokemonSpecies(id);

      return pokemonSpecies.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  getRandomPokemonId() {
    return Math.floor(Math.random() * MAX_POKEMON_COUNT);
  },

  getPokemonBackground(type: string) {
    return BACKGROUND_MAP[type as keyof typeof BACKGROUND_MAP][
      Math.floor(Math.random() * BACKGROUND_MAP[type as keyof typeof BACKGROUND_MAP].length)
    ];
  },

  async getPokemonStatistic(id: number) {
    try {
      const stats = await PokemonApi.getPokemonStatistic(id);

      return stats.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async getPokemonAbility(id: number | string) {
    try {
      const stats = await PokemonApi.getPokemonAbility(id);

      return stats.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async getPokemonWeaknesses(id: number | string) {
    try {
      const weaknesses = await PokemonApi.getPokemonWeaknesses(id);

      return weaknesses.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async getPokemonEvolutions(id: number | string) {
    try {
      const evolutions = await PokemonApi.getPokemonEvolutions(id);

      return evolutions.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error as string);
    }
  },

  async getPokemonList(params?: PaginatedParams) {
    const limit = params?.limit ?? 10;
    const offset = params?.offset ?? 0;

    try {
      const list = await PokemonApi.getPokemonList({ limit, offset });

      return list.data;
    } catch (error) {
      console.log('error in getPokemonList =>', error);
      throw new Error(error as string);
    }
  },

  async getPokemonListTopTen() {
    try {
      const list = await PokemonApi.getPokemonListTopTen();

      return list.data;
    } catch (error) {
      console.log('error in getPokemonListTopTen =>', error);
      throw new Error(error as string);
    }
  },
};
