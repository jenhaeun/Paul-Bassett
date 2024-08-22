<template>
  <v-container>
    <div class="header">
      <div @click="goBack" class="goBack">
        <v-icon size="28">chevron_left</v-icon>
      </div>
      <p class="menu_title">주문하기</p>
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
    <v-col cols="12" class="d-flex justify-space-between mb-4" v-for="item in cartItems" :key="item.id" style="background: #fbfbfb; border-radius: 20px;">
      <v-col cols="4">
        <v-img :src="item.img" :alt="item.name" class="img-rounded"></v-img>
      </v-col>
      <v-col cols="8" class="pa-5">
        <div class="d-flex justify-space-between align-items-center">
          <div>
            <h3>{{ item.name }}</h3>
            <!-- <p class="text_gray300">{{ item.options.IceHot }}</p> -->
            <p class="text_gray300">{{ item.options.size }}</p>
            <p class="text_gray300">{{ item.options.cupType }}</p>
          </div>
          
          <div class="text-bottom">
            <p>수량 {{ item.quantity }}</p>
            <h4 class="text_pink">{{ item.totalPrice.toLocaleString() }}원</h4>
          </div>
        </div>
      </v-col>
    </v-col>
    <v-col cols="12" style="padding: 0;">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="d-flex justify-space-between P_24 pa-4 font-weight-bold">
      <p class="text_brown">결제 금액</p>
      <p class="text_pink">{{ cartTotalPrice.toLocaleString() }}원</p>
    </v-col>
  </v-row>
    <div class="d-flex justify-space-between mt-2">
      <v-btn @click="showPaymentCompleteModal" style="width: 250px;" large>결제하기</v-btn>
      <v-btn color="grey lighten-1" class="pa-3 ma-2" style="width: 250px;" large>영수증 보기</v-btn>
    </div>

    <!-- 모달 창 -->
    <Modal
      :isOpen="isPaymentCompleteModalOpen"
      @update:isOpen="val => isPaymentCompleteModalOpen = val"
      closeText="확인"
      buttonType="default"
    >
      결제완료
    </Modal>
  </v-container>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Modal
  },
  data() {
    return {
      isPaymentCompleteModalOpen: false,
      cartItems: [],
      cartTotalPrice: 0
    };
  },
  computed: {
  ...mapGetters(['cartItems', 'cartTotalPrice', 'selectedStore']),
  },
  created() {
    this.loadCartItems();
  },
  methods: {
    ...mapActions(['addToCart', 'clearCart', 'addOrderHistory']),
    goBack() {
      this.$router.go(-1);
    },
    loadCartItems() {
      // Vuex 상태에서 직접 가져오기
      this.cartItems = this.$store.getters.cartItems;
      this.cartTotalPrice = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    },
    showPaymentCompleteModal() {
      if (this.isPaymentCompleteModalOpen) return; // 중복 호출 방지
      this.isPaymentCompleteModalOpen = true;

      const newOrder = {
        id: Date.now(),
        items: this.cartItems.map(item => ({
          ...item,
          totalPrice: item.price * item.quantity
        })),
      
        orderDate: new Date().toLocaleString(),
        totalPrice: this.cartTotalPrice,
        expiryDate: (() => {
          const orderDate = new Date();
          orderDate.setFullYear(orderDate.getFullYear() + 1); // 1년 더하기
          return orderDate.toLocaleString();
        })(),
        selectedStore: this.selectedStore
      };

      this.addOrderHistory(newOrder);
      this.clearCart();

      setTimeout(() => {
        this.$router.push('/OrderEnd');
      }, 1000);
    }
  }
};
</script>
<style>
.card_title {
  font-size: 18px;
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
.img-rounded {
  border-radius: 20px !important;
  /* border: 1px solid #fbfbfb; */
  width: 130px !important;
  height: 130px !important;
  object-fit: cover;
  /* margin-right: 15px; */
}
.cart_item h3 {
  margin: 0;
}

.P_12 {
  font-size: 12px;
}

.text_gray300 {
  color: #a3a3a3;
}

.text_brown {
  color: #8d5a3e;
}

.text_pink {
  color: #f06292;
}

.P_16 {
  font-size: 16px;
}
</style>