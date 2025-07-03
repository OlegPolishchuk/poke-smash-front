<script setup lang="ts">
const {} = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="leading-7 [&:not(:first-child)]:mt-6 capitalize text-background">
      {{ title }}
    </p>

    <h4
      class="scroll-m-20 text-xl tracking-tight text-sidebar-accent-foreground/90 flex items-center gap-1"
    >
      <slot name="value" />
      <slot name="prefix" />
    </h4>
  </div>
</template>

<style scoped></style>
