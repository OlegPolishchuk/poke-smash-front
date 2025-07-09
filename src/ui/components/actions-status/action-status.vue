<script setup lang="ts">
import { cn } from '@/lib/utils.ts';

const props = defineProps<{
  variant: 'smash' | 'pass';
  opacity: number;
}>();

const className = {
  pass: 'text-red-600 border-red-600 rotate-[-30deg]',
  smash: 'text-secondary border-secondary rotate-[30deg] right-0',
};
</script>

<template>
  <p
    :class="
      cn(
        'py-2 px-4 uppercase font-bold border border-2px  w-fit rounded-lg text-4xl  absolute top-[30%]  z-40',
        className[props.variant],
      )
    "
    :style="{ opacity: props.opacity }"
  >
    {{ props.variant === 'pass' ? 'Passed' : 'Smashed' }}
  </p>
</template>
