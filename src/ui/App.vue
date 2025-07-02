<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user.store.ts';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchMe();
});
</script>

<template>
  <h1 v-if="userStore.loading">Loading...</h1>
  <RouterView v-else />
</template>
