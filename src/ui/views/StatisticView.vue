<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/components/ui/breadcrumb';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const prevRoute = window.history.state.back;

console.log('prevRoute', prevRoute);
</script>

<template>
  <main class="container max-w-[1080px] py-10">
    <Breadcrumb>
      <BreadcrumbList>
        <template v-if="prevRoute === '/'">
          <BreadcrumbItem>
            <BreadcrumbLink href="/"> Home </BreadcrumbLink>
          </BreadcrumbItem>
        </template>

        <template v-else>
          <BreadcrumbItem>
            <BreadcrumbLink href="/"> Home </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink :href="prevRoute"> Previous page </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage class="capitalize">List</BreadcrumbPage>
          </BreadcrumbItem>
        </template>
      </BreadcrumbList>
    </Breadcrumb>

    <nav class="py-6">
      <ul class="flex items-center">
        <li>
          <RouterLink
            to="all"
            class="w-full px-4 border-b-[4px] border-transparent"
            active-class="!border-primary"
            >All</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="top-ten"
            class="w-full px-4 border-b-[4px] border-transparent"
            active-class="!border-primary"
            >Top 10</RouterLink
          >
        </li>
      </ul>
    </nav>

    <div>
      <RouterView />
    </div>
  </main>
</template>
