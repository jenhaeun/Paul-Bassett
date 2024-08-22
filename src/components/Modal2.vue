<template>
  <v-dialog v-model="isOpen" max-width="300" persistent>
    <div class="modal_card">
      <div class="modal_content">
        <div class="modal_message">
          <slot> </slot>
        </div>
      </div>

      <div class="modal_actions">
        <v-btn
          v-if="showConfirmButton"
          class="modal_button modal_confirm_button"
          color="black"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </v-btn>
        <v-btn
          v-if="showCancelButton"
          class="modal_button modal_cancel_button"
          color="grey"
          @click="handleCancel"
        >
          {{ cancelText }}
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    confirmText: {
      type: String,
      default: '확인'
    },
    cancelText: {
      type: String,
      default: '아니오'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showConfirmButton() {
      return true; // 확인 버튼은 항상 표시되도록 설정
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm');
      this.closeModal();
    },
    handleCancel() {
      this.$emit('cancel');
      this.closeModal();
    },
    closeModal() {
      this.$emit('update:isOpen', false);
    }
  }
};
</script>

<style scoped>
.modal_card {
  height: 150px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  justify-content: space-between;
}

.modal_content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.modal_actions {
  display: flex;
}

.modal_button {
  flex: 1; /* 각 버튼이 컨테이너의 반을 차지하도록 설정 */
  height: 30px;
  font-size: 16px;
  border-radius: 0;
  padding: 0;
}

.modal_confirm_button {
  color: white;
  background-color: black;
}

.modal_cancel_button {
  color: white;
  background-color: grey;
}
</style>
