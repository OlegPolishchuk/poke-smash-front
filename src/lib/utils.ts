import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';
import type { CardStyle } from '@/services/constants.ts';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRandomBoolean() {
  return Math.random() < 0.5 ? '-' : '+';
}

export function getRandomCardAngle(maxAnge: number = 8) {
  const minus = getRandomBoolean();

  return Number(`${minus}${Math.floor(Math.random() * maxAnge)}`);
}

export function getPokemonImage({
  pokemon,
  cardStyle,
}: {
  pokemon: Pokemon;
  cardStyle: CardStyle;
}) {
  const defaultImg = pokemon.sprites.versions?.['generation-v']?.['black-white']?.front_default;

  const images = {
    showdown:
      pokemon.sprites.versions?.['generation-v']?.['black-white']?.['animated']?.front_default,
    hd: pokemon.sprites.other?.['official-artwork']?.front_default,
    clean: pokemon.sprites.other?.dream_world?.front_default,
    '3d': pokemon.sprites.other?.home?.front_default,
  };

  return images[cardStyle] ?? defaultImg;
}

export function getPokemonBg(pokemon: Pokemon) {
  return `url(/backgrounds/bg-${PokemonService.getPokemonBackground(pokemon.types[0].type.name)}.png)`;
}

export function toPercent(value: number, total: number = 100 ): number {
  if (total === 0) return 0; // защита от деления на 0
  return (value / total) * 100;
}
