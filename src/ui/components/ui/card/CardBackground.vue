<script setup lang="ts">
import { computed } from 'vue';

const { src } = defineProps<{ src: string | undefined }>();

const bg = computed(() => (src ? src : '/backgrounds/bg.png'));
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${bg})` }"
    class="absolute top-0 left-0 w-full h-full after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-20 after:bg-[linear-gradient(to_top,black_-5%,transparent_50%)]"
  />
</template>
