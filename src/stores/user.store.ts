import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/entities/user/user.ts';
import { AuthApi } from '@/api/auth/auth.api.ts';

type Action = 'likes' | 'dislikes';

export const useUserStore = defineStore('counter', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  const smashCount = computed(() => user.value?.likes ?? 0);
  const passCount = computed(() => user.value?.dislikes);

  async function fetchMe() {
    loading.value = true;

    try {
      user.value = await AuthApi.getMe();
    } catch (err) {
      console.log('error =>', err);
      user.value = null;
    } finally {
      loading.value = false;
    }
  }

  function incrementAction(action: Action) {
    if (!user.value) return;

    console.log('Increment action =>', action);
    user.value[action] += 1;
  }

  function decrementAction(action: Action) {
    console.log('Decrement action =>', action);
    if (!user.value) return;

    user.value[action] -= 1;
  }

  return { user, loading, fetchMe, decrementAction, incrementAction, smashCount, passCount };
});
