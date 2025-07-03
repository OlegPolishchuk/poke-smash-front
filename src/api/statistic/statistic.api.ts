import type { PokemonStatistic } from '@/api/pokemon/pokemon.api.ts';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

const EMITS = {
  join: 'join-pokemon-room',
};

const ON_MESSAGE = {
  stat: 'pokemon-stat',
};

const socket = io(SOCKET_URL);

export const StatisticApi = {
  subscribeToPokemonRoom(pokemonId: number, onUpdate: (data: PokemonStatistic) => void) {
    socket.emit(EMITS.join, pokemonId);

    socket.on(ON_MESSAGE.stat, (data: PokemonStatistic) => {
      onUpdate(data);
    });
  },
};
