<script setup lang="ts">
import Message from "@shared/ui/message/Message.vue";
</script>

<template>
  <router-view />
  <Message />
</template>

<style>
:root {
  --color-primary: #2c3e50;
  --color-primary-dark: #1a252f;
}
</style>
