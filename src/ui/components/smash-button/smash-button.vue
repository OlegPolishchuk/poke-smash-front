<script setup lang="ts">
import { Button } from '@/ui/components/ui/button';
import { Badge } from '@/ui/components/ui/badge';
import { useUserStore } from '@/stores/user.store.ts';
import { ref } from 'vue';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';

const { pokemonId } = defineProps<{ pokemonId: number }>();
const emit = defineEmits<{
  (e: 'onClick'): void;
}>();

const userStore = useUserStore();
const loading = ref(false);

const handleSmash = async () => {
  userStore.incrementAction('likes');
  loading.value = true;

  emit('onClick');

  try {
    await PokemonService.like(pokemonId);
  } catch (e) {
    console.log('error =>', e);
    userStore.decrementAction('likes');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Button variant="action" :disabled="loading" @click="handleSmash"
    >Smash
    <Badge variant="smash">{{ userStore.smashCount }}</Badge>
  </Button>
</template>
