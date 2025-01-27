import { ref } from 'vue';
import PopupModal from './PopupModal.vue';

export default {
  title: 'Atoms/PopupModal',
  component: PopupModal,
};

export const Default = () => {
  const open = ref(false);

  const openModal = () => {
    open.value = true;
  };

  const closeModal = () => {
    open.value = false;
  };

  return {
    components: { PopupModal },
    setup() {
      return { open, openModal, closeModal };
    },
    template: `
      <div>
        <button
          @click="openModal"
          class="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Open Modal
        </button>
        
        <PopupModal :open="open" @close="closeModal">
          <div class="px-6 py-4">
            <h2 class="text-xl font-bold text-gray-900">Modal Content</h2>
            <p class="mt-2 text-gray-700">This is some content inside the modal!</p>
            <div class="mt-4">
              <button
                @click="closeModal"
                class="px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Close Modal
              </button>
            </div>
          </div>
        </PopupModal>
      </div>
    `,
  };
};
