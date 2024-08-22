<template>
  <v-container>
    <div class="header">
      <div @click="goBack" class="goBack">
        <v-icon size="28">chevron_left</v-icon>
      </div>
      <p class="menu_title">바로 주문하기</p>
    </div>

    <!-- 선택된 매장 정보 -->
    <div v-if="selectedStore" class="select_area">
      <div class="select_area_left">
        <span class="card_title">
          <v-icon color="pink">location_on</v-icon> {{ selectedStore.name }}
        </span>
        <span class="card_subtitle pl-7">{{ selectedStore.address }}</span>
      </div>
    </div>

<v-row class="white mt-6">
    <v-col 
      v-if="orderData"
      cols="12" 
      class="d-flex justify-space-between mb-4" 
      style="background: #fbfbfb; border-radius: 20px;"
    >
      <v-col cols="4">
        <v-img 
          :src="orderData.selectedItem.img" 
          :alt="orderData.selectedItem.name" 
          class="img-rounded"
        ></v-img>
      </v-col>
      <v-col cols="8" class="pa-5">
        <div class="d-flex justify-space-between align-items-center">
          <div>
            <h3>{{ orderData.selectedItem.name }}</h3>
            <p class="text_gray300">{{ orderData.selectedItem.options.size }}</p>
            <p class="text_gray300">{{ orderData.selectedItem.options.cupType }}</p>
          </div>
          <div class="text-bottom">
            <p>수량 {{ orderData.selectedItem.quantity }}</p>
            <h4 class="text_pink">{{ orderData.selectedItem.totalPrice | currency }}원</h4>
          </div>
        </div>
      </v-col>
    </v-col>
    
    <v-col cols="12" style="padding: 0;">
      <v-divider></v-divider>
    </v-col>
    
    <v-col cols="12" class="d-flex justify-space-between P_24 pa-4 font-weight-bold">
      <p class="text_brown">결제 금액</p>
      <p class="text_pink"> {{ orderData.selectedItem.totalPrice | currency }} 원</p>
    </v-col>
  </v-row>

  <div class="text-center mt-5">
    <v-btn 
      @click="handlePayment" 
      style="width: 210px;" 
      large
    >결제하기</v-btn>
  </div>

  <!-- 결제 완료 모달 -->
  <Modal
    :isOpen="isPaymentCompleteModalOpen"
    @update:isOpen="val => isPaymentCompleteModalOpen = val"
    @close="handleModalClose"
    closeText="확인"
    buttonType="default"
  >
    결제완료
  </Modal>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue'; // Import your Modal component

export default {
  components: {
    Modal
  },
  computed: {
    ...mapGetters(['orderData', 'selectedStore'])
  },
  methods: {
    ...mapActions(['addOrderHistory']),
    goBack() {
      this.$router.go(-1);
    },
    handlePayment() {
      if (!this.orderData) {
        this.$router.push('/Menu'); // 주문 정보가 없으면 메뉴 페이지로 이동
        return;
      }
      
      const newOrder = {
        id: Date.now(),
        items: [this.orderData.selectedItem],
        orderDate: new Date().toLocaleString(),
        expiryDate: (() => {
          const orderDate = new Date();
          orderDate.setFullYear(orderDate.getFullYear() + 1); // 1년 더하기
          return orderDate.toLocaleString();
        })(),
        selectedStore: this.selectedStore,
        totalPrice: this.orderData.selectedItem.totalPrice
      };

      this.isPaymentCompleteModalOpen = true;

      setTimeout(() => {
        this.addOrderHistory(newOrder);
        this.$router.push('/OrderEnd');
      }, 1000);
    },
    handleModalClose() {
      this.isPaymentCompleteModalOpen = false;
    }
  },
  data() {
    return {
      isPaymentCompleteModalOpen: false
    };
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu_title {
  font-size: 20px;
  font-weight: bold;
}
.select_area {
  display: flex;
  margin-top: 10px;
  align-items: center;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background-color: #fbfbfb;
}

.select_area_left {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card_title {
  font-weight: bold;
}
.card_subtitle {
  color: gray;
}
.text_gray300 {
  color: #e0e0e0;
}
.text_brown {
  color: #6d4c41;
  text-align: right;
}
.text_pink {
  color: #e91e63;
}
</style>
