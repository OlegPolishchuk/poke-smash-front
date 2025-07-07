<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { PaginatedList } from '@/api/types.ts';
import type { Pokemon } from '@/entities/pokemon/pokemon.ts';
import { PokemonService } from '@/services/pokemon/pokemon.service.ts';

const list = ref<PaginatedList<Pokemon>>();

onMounted(async () => {
  list.value = await PokemonService.getPokemonList();
});
</script>

<template>
  <p>Top ten Pokemon list</p>
</template>
