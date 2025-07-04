<script setup lang="ts">
import { onMounted, ref } from 'vue';

const { value } = defineProps<{
  value: number;
}>();

const height = ref(0);

onMounted(() => {
  setTimeout(() => (height.value = value), 100);
});
</script>

<template>
  <div
    class="bg-primary transition-height duration-300 transition-height duration-400"
    :style="{
      height: `${height}px`,
    }"
  ></div>
</template>
