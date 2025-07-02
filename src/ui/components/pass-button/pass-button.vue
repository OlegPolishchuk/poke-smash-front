<script setup lang="ts">
import { Button } from '@/ui/components/ui/button';
import { useUserStore } from '@/stores/user.store.ts';
import { ref } from 'vue';
import { Badge } from '@/ui/components/ui/badge';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';

const { pokemonId } = defineProps<{ pokemonId: number }>();
const emit = defineEmits<{
  (e: 'onClick'): void;
}>();

const userStore = useUserStore();
const loading = ref(false);

const handlePass = async () => {
  userStore.incrementAction('dislikes');
  loading.value = true;
  emit('onClick');

  try {
    await PokemonService.dislike(pokemonId);
  } catch (e) {
    console.log('error =>', e);
    userStore.decrementAction('dislikes');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Button variant="action" :disabled="loading" class="border-dislike" @click="handlePass"
    >Pass
    <Badge variant="pass">{{ userStore.passCount }}</Badge>
  </Button>
</template>
