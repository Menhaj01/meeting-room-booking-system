import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', {
  state: () => ({
    alerts: [] as { id: number; type: 'success' | 'error'; message: string }[],
    nextAlertId: 1,
  }),
  actions: {
    addAlert(type: 'success' | 'error', message: string) {
      const id = this.nextAlertId++;
      this.alerts.push({ id, type, message });
      setTimeout(() => {
        this.removeAlert(id);
      }, 3000);
    },
    removeAlert(id: number) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    },
  },
});
