<script setup lang="ts">
import { MAX_POKEMON_COUNT, PokemonService } from '@/services/pokemon/pokemon.service.ts';
import { ref, watchEffect } from 'vue';
import type { Pokemon, PokemonSpecies } from '@/entities/pokemon/pokemon.ts';
import PokemonCard from '@/ui/components/pokemon-card/pokemon-card.vue';
import { Motion, type PanInfo } from 'motion-v';
import { getRandomCardAngle } from '@/lib/utils.ts';
import SmashButton from '@/ui/components/smash-button/smash-button.vue';
import PassButton from '@/ui/components/pass-button/pass-button.vue';
import PokemonStatistic from '@/ui/components/pokemon-statistic/pokemon-statistic.vue';
import { usePokemonStore } from '@/stores/pokemon.store.ts';
import { Input } from '@/ui/components/ui/input';
import { useSettingsStore } from '@/stores/settings.store.ts';
import ActionStatus from '@/ui/components/actions-status/action-status.vue';

interface AnimationProps {
  scale?: number;
  y?: number | string;
  x?: number | string;
  rotate?: string | number;
  opacity?: string | number;
}

const settingsStore = useSettingsStore();

const pokemon = ref<Pokemon | null>(null);
const pokemonSpecies = ref<PokemonSpecies | null>(null);
const cartAngle = ref(getRandomCardAngle());
const randomPokemonId = ref(PokemonService.getRandomPokemonId());
const isLoading = ref(false);

const constraintsRef = ref<HTMLDivElement>();
const initialAnimation = ref<AnimationProps>({ scale: 0, y: '-100%', x: 0 });
const animationValue = ref<AnimationProps>({ scale: 1, y: 0, rotate: cartAngle.value, opacity: 1 });
const cardOpacity = ref(100);
const actionStatusProps = ref<{ variant: 'pass' | 'smash'; opacity: number }>({
  variant: 'pass',
  opacity: 0,
});

const pokeStore = usePokemonStore();

watchEffect(async () => {
  const promises = await Promise.all([
    PokemonService.getPokemon(randomPokemonId.value),
    PokemonService.getPokemonSpecies(randomPokemonId.value),
  ]);

  pokemon.value = promises[0];
  pokemonSpecies.value = promises[1];

  animationValue.value = {
    scale: 1,
    x: 0,
    y: 0,
    rotate: cartAngle.value,
  };
});

const handleChangePokemon = async (action: 'pass' | 'smash') => {
  pokeStore.setPrevious(pokemon.value!);
  isLoading.value = true;

  const isPass = action === 'pass';
  const rotateAngle = isPass ? -40 : 40;

  // Анимация ухода
  animationValue.value = {
    ...animationValue.value,
    x: isPass ? '-100%' : '100%',
    opacity: 0,
    rotate: rotateAngle,
  };

  activateActionStatus(isPass ? -100 : 100);

  // // Подождём завершения анимации (например, 500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));
  //
  // Обновляем данные
  randomPokemonId.value = PokemonService.getRandomPokemonId();
  cartAngle.value = getRandomCardAngle();

  // Устанавливаем начальную позицию для новой карточки
  initialAnimation.value = {
    scale: 0.8,
    x: isPass ? '-100%' : '100%',
    rotate: rotateAngle,
    opacity: 1,
  };
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Настраиваем анимацию входа
  animationValue.value = {
    scale: 1,
    x: 0,
    y: 0,
    rotate: cartAngle.value,
    opacity: 1,
  };

  isLoading.value = false;
  cardOpacity.value = 100;
  actionStatusProps.value.opacity = 0;
};

const handleChangePokemonNumber = (event: InputEvent) => {
  const target = <HTMLInputElement>event.target;
  const value = target.value;

  pokeStore.setPrevious(pokemon.value!);
  randomPokemonId.value = +value;
};

const handleDrag = (event: PointerEvent, info: PanInfo) => {
  const offset = 50;
  const { x } = info.offset;

  // Ограничиваем значение от -100 до 100
  const clampedX = Math.max(Math.min(x, 100), -100);

  activateActionStatus(x);

  // Вычисляем прозрачность: чем дальше — тем менее прозрачно
  cardOpacity.value = 1 - Math.abs(clampedX) / offset;
  if ((x >= offset || x <= -offset) && !isLoading.value) {
    handleChangePokemon(x > 0 ? 'smash' : 'pass');
  }
};

const activateActionStatus = (x: number) => {
  actionStatusProps.value.opacity = 1;
  actionStatusProps.value.variant = x > 0 ? 'smash' : 'pass';
};
</script>

<template>
  <main
    ref="constraintsRef"
    class="container flex flex-col gap-5 items-center w-full absolute top-0 left-[50%] translate-x-[-50%] overflow-hidden"
  >
    <h1 class="font-bold text-[calc(1rem+4vh)]">
      <span class="font-pokemon text-poke poke-stroke">Poke</span>
      <span class="text-destructive uppercase font-sans ml-4 tracking-[-4px]">smash</span>
    </h1>

    <template v-if="pokemon && pokemonSpecies">
      <Motion
        class="w-fit mb-5 relative"
        drag="x"
        :drag-constraints="constraintsRef"
        :initial="initialAnimation"
        :animate="animationValue"
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }"
        :press="{ scale: 1.05, rotate: 0 }"
        @drag="handleDrag"
      >
        <ActionStatus
          title="passed"
          :variant="actionStatusProps.variant"
          :opacity="actionStatusProps.opacity"
        />

        <Motion :animate="{ opacity: cardOpacity }">
          <PokemonCard
            :pokemon="pokemon"
            :pokemon-species="pokemonSpecies"
            :card-style="settingsStore.cardStyle"
          />
        </Motion>
      </Motion>

      <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2">
        Pokemon
        <Input
          :model-value="randomPokemonId"
          class="w-[90px] md:text-2xl font-semibold! tracking-tight! text-primary"
          name="pokemon_id"
          type="number"
          :max="MAX_POKEMON_COUNT"
          @input="handleChangePokemonNumber"
        />
        from {{ MAX_POKEMON_COUNT }}
      </h3>

      <div class="flex items-center gap-6">
        <PassButton :pokemon-id="pokemon.id" @click="handleChangePokemon('pass')" />
        <SmashButton :pokemon-id="pokemon.id" @click="handleChangePokemon('smash')" />
      </div>

      <PokemonStatistic :card-style="settingsStore.cardStyle" />
    </template>
  </main>
</template>
