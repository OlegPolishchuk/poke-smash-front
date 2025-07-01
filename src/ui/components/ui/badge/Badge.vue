<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { Primitive } from 'reka-ui';
import { cn } from '@/lib/utils';
import { type BadgeVariants, badgeVariants } from '.';

const props = defineProps<
  PrimitiveProps & {
    variant?: string;
    class?: HTMLAttributes['class'];
  }
>();

const delegatedProps = reactiveOmit(props, 'class');

const budgeVariant = computed(() => ({
  variant: (props.variant ?? 'default') as BadgeVariants['variant'],
}));
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants(budgeVariant), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
