import { StatisticApi } from '@/api/statistic/statistic.api.ts';
import type { PokemonStatistic } from '@/api/pokemon/pokemon.api.ts';

export const StatisticService = {
  subscribeToPokemon(pokemonId: number, onUpdate: (data: PokemonStatistic) => void) {
    StatisticApi.subscribeToPokemonRoom(pokemonId, onUpdate);
  },
};
