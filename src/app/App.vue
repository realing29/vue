<script setup lang="ts">
import { Message } from "@shared/ui/message";
import { Confirm } from "@shared/ui/confirm";
</script>

<template>
  <router-view />
  <Message />
  <Confirm />
</template>

<style>
:root {
  --color-primary: #2c3e50;
  --color-primary-dark: #1a252f;
  --color-danger: #c0392b;
  --color-success: #1f7a3a;
  --color-border: #ccc;
  --color-border-muted: #d0d0d0;
  --z-toast: 1000;
  --z-modal: 1100;
}
</style>
