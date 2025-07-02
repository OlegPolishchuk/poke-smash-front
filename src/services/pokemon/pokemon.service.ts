import { PokemonApi } from '@/api/pokemon/pokemon.api.ts';

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

  default: 'foreground',
};

export const PokemonService = {
  async getPokemon(id?: number) {
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
};
