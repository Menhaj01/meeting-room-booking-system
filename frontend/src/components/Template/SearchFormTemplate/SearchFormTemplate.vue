<script setup lang="ts">
import { useSearchFormStore } from '../../../stores/searchFormStore';
import { createISODateTime } from '../../../utils/createISODateTime';
import { fetchAvailableRooms } from '../../../services/getRooms';
import SearchForm from '../../Molecules/SearchForm/SearchForm.vue';
import { useRoomStore } from '../../../stores/roomStore';
import { useAlertStore } from '../../../stores/alertStore';

const roomStore = useRoomStore();
const searchStore = useSearchFormStore();
const alertStore = useAlertStore();
const minDate = new Date().toISOString().split('T')[0];

const searchRooms = async () => {
  try {
    searchStore.setLoading(true);
    const startISO = createISODateTime(
      searchStore.selectedDate,
      searchStore.startTime,
    );
    const endISO = createISODateTime(
      searchStore.selectedDate,
      searchStore.endTime,
    );

    const rooms = await fetchAvailableRooms(startISO, endISO);
    roomStore.setAvailableRooms(rooms);
    alertStore.addAlert(
      'success',
      'Les salles ont été récupérées avec succès.',
    );
  } catch (error) {
    console.error(error);
    alertStore.addAlert('error', 'Échec de la récupération des salles.');
  } finally {
    searchStore.setLoading(false);
  }
};
</script>

<template>
  <SearchForm
    :fields="[
      {
        label: 'Date',
        type: 'date',
        modelValue: searchStore.selectedDate,
        min: minDate,
        onUpdate: (value) => (searchStore.selectedDate = String(value)),
      },
      {
        label: 'Heure de début',
        type: 'time',
        modelValue: searchStore.startTime,
        onUpdate: (value) => (searchStore.startTime = String(value)),
        disabled: !searchStore.selectedDate,
      },
      {
        label: 'Heure de Fin',
        type: 'time',
        modelValue: searchStore.endTime,
        onUpdate: (value) => (searchStore.endTime = String(value)),
        disabled: !searchStore.startTime,
      },
    ]"
    :isLoading="searchStore.isLoading"
    :onClick="searchRooms"
    :disabled="!searchStore.endTime"
  />
</template>
