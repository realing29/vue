<script setup lang="ts">
withDefaults(
  defineProps<{
    direction?: "asc" | "desc" | null;
  }>(),
  {
    direction: null,
  },
);
</script>

<template>
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      class="sort-icon__asc"
      :class="{ 'sort-icon__asc--active': direction === 'asc' }"
      d="M8 2.5 11.5 7h-7z"
      fill="currentColor"
    />
    <path
      class="sort-icon__desc"
      :class="{ 'sort-icon__desc--active': direction === 'desc' }"
      d="M8 13.5 4.5 9h7z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped>
.sort-icon__asc,
.sort-icon__desc {
  opacity: 0.35;
}

.sort-icon__asc--active,
.sort-icon__desc--active {
  opacity: 1;
}
</style>
