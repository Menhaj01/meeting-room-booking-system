import { ref } from 'vue';
import AlertsList from './AlertList.vue';

type Alert = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

type AlertsListArgs = {
  alerts: Alert[];
  onRemoveAlert: (id: number) => void;
};

export default {
  title: 'Molecules/AlertsList',
  component: AlertsList,
  argTypes: {
    alerts: { control: 'object' },
    onRemoveAlert: { action: 'remove-alert' },
  },
};

const Template: any = (args: AlertsListArgs) => ({
  components: { AlertsList },
  setup() {
    const alerts = ref(args.alerts);
    let nextId = args.alerts.length + 1;

    const addSuccessAlert = () => {
      alerts.value.push({
        id: nextId++,
        type: 'success',
        message: `Success alert ${nextId}`,
      });
    };

    const addErrorAlert = () => {
      alerts.value.push({
        id: nextId++,
        type: 'error',
        message: `Error alert ${nextId}`,
      });
    };

    const removeAlert = (id: number) => {
      args.onRemoveAlert(id);
      alerts.value = alerts.value.filter((alert: Alert) => alert.id !== id);
    };

    return { alerts, addSuccessAlert, addErrorAlert, removeAlert };
  },
  template: `
    <div class="relative space-y-4">
      <div class="flex space-x-2">
        <button 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          @click="addSuccessAlert"
        >
          Add Success Alert
        </button>
        <button 
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          @click="addErrorAlert"
        >
          Add Error Alert
        </button>
      </div>

      <AlertsList :alerts="alerts" @remove-alert="removeAlert" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  alerts: [
    { id: 1, type: 'success', message: 'Action completed successfully!' },
    { id: 2, type: 'error', message: 'Something went wrong!' },
  ],
};

export const NoAlerts = Template.bind({});
NoAlerts.args = {
  alerts: [],
};
