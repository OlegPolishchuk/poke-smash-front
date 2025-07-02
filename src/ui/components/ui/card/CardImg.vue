<script setup lang="ts">
const { src, alt } = defineProps<{ src: string; alt: string }>();
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    class="absolute bottom-[30%] left-[50%] translate-x-[-50%] z-10 w-[70%] select-none pointer-events-none"
  />
</template>
