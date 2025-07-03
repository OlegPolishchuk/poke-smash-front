<script setup lang="ts">
import { Progress } from '@/ui/components/ui/progress';
import { computed } from 'vue';

const { value, variant } = defineProps<{
  value: number;
  variant: 'pass' | 'smash';
}>();

const bg = computed(() => (variant === 'pass' ? `bg-dislike/20` : 'bg-secondary/20'));
const indicatorBg = computed(() => (variant === 'pass' ? `bg-dislike` : 'bg-secondary'));
</script>

<template>
  <Progress
    :model-value="value"
    :class="bg"
    class="h-[20px] rounded"
    :indicator-class="indicatorBg + ' ' + 'rounded'"
  />
</template>

<style scoped></style>
