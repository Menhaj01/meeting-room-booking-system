<script setup lang="ts">
import Typography from '../components/Atoms/Typography/Typography.vue';

import AlertList from '../components/Molecules/AlertList/AlertList.vue';
import SearchFormTemplate from '../components/Template/SearchFormTemplate/SearchFormTemplate.vue';
import CardsSectionTemplate from '../components/Template/CardsSectionTemplate/CardsSectionTemplate.vue';
import BookingModalTemplate from '../components/Template/BookingModalTemplate/BookingModalTemplate.vue';
import { useAlertStore } from '../stores/alertStore';

const alertStore = useAlertStore();
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="absolute top-12 w-full">
      <AlertList
        :alerts="alertStore.alerts"
        @remove-alert="alertStore.removeAlert"
      />
    </div>
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Typography
        variant="h1"
        customClass="my-6"
        text="Réservation de salle de réunion"
      />

      <SearchFormTemplate />
      <CardsSectionTemplate />
    </div>
    <BookingModalTemplate />
  </div>
</template>
