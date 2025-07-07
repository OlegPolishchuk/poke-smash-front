import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';
import type { CardStyle } from '@/services/constants.ts';
import { PokemonService, TYPE_COLOR_MAP } from '@/services/pokemon/pokemon.service.ts';

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
  // const defaultImg = pokemon.sprites.versions?.['generation-v']?.['black-white']?.front_default;
  const defaultImg = pokemon.sprites.front_default;

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

export function getPokemonColor(pokemon: Pokemon | undefined) {
  return `var(--color-${TYPE_COLOR_MAP[pokemon?.types[0].type.name || 'default']})`;
}

export function toPercent(value: number, total: number = 100): number {
  if (total === 0) return 0; // защита от деления на 0

  return (value / total) * 100;
}

export function hectogramsToPounds(hectograms: number) {
  // 1. Конвертируем гектограммы в килограммы (1 hg = 0.1 kg)
  const kilograms = hectograms * 0.1;

  // 2. Конвертируем килограммы в фунты (1 kg = 2.20462 lbs)
  const pounds = kilograms * 2.20462;

  // 3. Округляем результат до одной десятой
  return Math.round(pounds * 10) / 10;
}

export function decimetersToFeetInches(decimeters: number) {
  // 1. Конвертируем дециметры в метры
  const meters = decimeters * 0.1;

  // 2. Конвертируем метры в дюймы (1 метр = 39.3701 дюйма)
  const totalInches = meters * 39.3701;

  // 3. Вычисляем футы (целая часть от деления дюймов на 12)
  const feet = Math.floor(totalInches / 12);

  // 4. Вычисляем оставшиеся дюймы (остаток от деления на 12, округленный до целого)
  const inches = Math.round(totalInches % 12);

  // 5. Форматируем дюймы: если меньше 10, добавляем ведущий ноль, иначе просто строку
  const formattedInches = inches < 10 ? `0${inches}` : `${inches}`;

  return `${feet}' ${formattedInches}"`;
}

export function getCycledIndex(index: number, max: number): number {
  return index % max;
}

export function getMaxValue(val1: number, val2: number) {
  return Math.max(val1, val2);
}

export function getMinValue(val1: number, val2: number) {
  return Math.min(val1, val2);
}

export function getPartsPercentage(a: number, b: number): [number, number] {
  const total = a + b;
  if (total === 0) return [0, 0];

  const percentA = (a / total) * 100;
  const percentB = (b / total) * 100;

  return [percentA, percentB];
}
