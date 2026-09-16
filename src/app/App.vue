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
}
</style>
