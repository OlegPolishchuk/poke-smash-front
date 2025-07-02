<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import type { CardStyle } from '@/services/constants.ts';

const { style } = defineProps<{ style: CardStyle }>();
const emit = defineEmits<{ (e: 'onChange', id: CardStyle): void }>();

const cardStyleImagesSrc: Record<CardStyle, string> = {
  showdown: '/card-style/showdown.gif',
  hd: '/card-style/hd.png',
  clean: '/card-style/clean.svg',
  '3d': '/card-style/3d.png',
};
</script>

<template>
  <Select :model-value="style" @update:model-value="emit('onChange', $event)">
    <SelectTrigger class="!h-full">
      <SelectValue>
        <img :src="cardStyleImagesSrc[style]" :alt="`card_style_${style}`" class="h-[50px] w-fit" />
      </SelectValue>
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectLabel>Styles</SelectLabel>

        <SelectItem value="showdown">
          <div class="flex flex-col gap-2 items-start">
            <img
              :src="cardStyleImagesSrc['showdown']"
              alt="card_style_showdown"
              class="h-[50px] w-fit"
            />
            <p>Showdown Style</p>
          </div>
        </SelectItem>

        <SelectItem value="hd">
          <div class="flex flex-col gap-2 items-start">
            <img :src="cardStyleImagesSrc['hd']" alt="card_style_hd" class="h-[50px] w-fit" />
            <p>HD Style</p>
          </div>
        </SelectItem>

        <SelectItem value="3d">
          <div class="flex flex-col gap-2 items-start">
            <img :src="cardStyleImagesSrc['3d']" alt="card_style_3d" class="h-[50px] w-fit" />
            <p>3D Style</p>
          </div>
        </SelectItem>

        <SelectItem value="clean">
          <div class="flex flex-col gap-2 items-start">
            <img :src="cardStyleImagesSrc['clean']" alt="card_style_clean" class="h-[50px] w-fit" />
            <p>Clean Style</p>
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
