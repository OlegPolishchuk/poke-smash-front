<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user.store.ts';
import CardStyleSelect from '@/ui/components/card-style-select/card-style-select.vue';
import { Button } from '@/ui/components/ui/button';
import { useSettingsStore } from '@/stores/settings.store.ts';

const userStore = useUserStore();
const settingsStore = useSettingsStore();

onMounted(() => {
  userStore.fetchMe();
});
</script>

<template>
  <header class="flex items-center container py-2 relative z-99">
    <CardStyleSelect
      :style="settingsStore.cardStyle"
      @on-change="(style) => settingsStore.changeCardStyle(style)"
    />
    <Button variant="link" class="ml-auto">Stats</Button>
  </header>

  <h1 v-if="userStore.loading">Loading...</h1>
  <RouterView v-else />
</template>
