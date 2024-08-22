<template>
  <div>
    <div class="header">
      <div @click="goBack" class="goBack">
        <v-icon size="28">chevron_left</v-icon>
      </div>
      <p class="menu_title">장바구니 ( {{ cartQuantity }} )</p>
      <div @click="clearCart" class="delete">
        <v-icon size="28">delete</v-icon>
      </div>
    </div>

    <!-- 선택한 매장 정보 -->
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
    
    <div class="text-center mt-5">
  <v-btn 
    @click="handleOrderClick" 
    class="text_white pa-4 ma-2 black" 
    dark
    style="width: 210px;" 
    large
    :disabled="cartQuantity === 0"
  >
    주문하기
  </v-btn>
</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import itemlist from '@/datasources/itemlist.js';

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartQuantity', 'cartTotalPrice', 'selectedStore']),
    formatOptionKey() {
      const formattedKeys = {
        IceHot: '온도',
        size: '사이즈',
        packaging: '포장',
        cupType: '컵 타입',
        extraShot: '샷 추가',
        shotQuantity: '샷 수량',
        iceCreamTopping: '아이스크림 토핑',
        milkType: '우유 종류',
        sugar: '설탕',
        HotLevel: '열기',
        waterAmount: '물 양',
        powder: '파우더',
        cream: '크림'
      };
      return (key) => formattedKeys[key] || key;
    }
  },
  methods: {
    ...mapActions(['clearCart', 'removeFromCart']),
    goBack() {
      this.$router.go(-1);
    },
    getFilteredOptions(itemId) {
      const item = [...itemlist.coffeeList, ...itemlist.LetteList].find(i => i.Id === itemId);
      if (!item) return {};

      const allOptions = { ...item.mainOptions, ...item.personalOptions };
      const cartItem = this.cartItems.find(cartItem => cartItem.id === itemId);

      return Object.keys(allOptions).reduce((result, key) => {
        if (allOptions[key] === true) {
          result[key] = cartItem.options[key] || '선택 안 함';
        }
        return result;
      }, {});
    },
    handleOrderClick() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.$router.push('/OrderInfo');
    }
  }
}
</script>

<style scoped>
.P_text{
  margin: 0 auto !important;
  text-align: center !important;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}

.goBack, .delete {
  cursor: pointer;
}

.menu_title {
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

.card_title {
  font-size: 18px;
  font-weight: bold;
}

.card_subtitle {
  font-size: 14px;
  color: #666;
}

.change_button {
  margin-left: auto;
  background: #fff !important;
  color: #000;
  border: 1px solid #000;
  border-radius: 20px;
  height: 32px;
  width: 80px;
  text-transform: none;
}

.change_button:hover {
  background-color: #f0f0f0;
}

.white {
  background-color: #fff;
}

.img-rounded {
  border-radius: 20px !important;
  /* border: 1px solid #fbfbfb; */
  width: 120px !important;
  height: 120px !important;
  object-fit: cover;
  /* margin-right: 15px; */
}
.v-list-item {
  display: flex;
  justify-content: space-between;
  padding: 10px !important;
  box-sizing: border-box;
  border-radius: 20px;
  /* background: #fbfbfb !important; */
  margin-bottom: 20px;
  /* max-width: 500px !important; */
}
.cart-item-section1{
  display: flex;
  align-items: center;
}
.text-bottom{
  display: flex !important;
  flex-direction: column !important;
  align-items: baseline !important;
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

.P_24 {
  padding: 24px;
}

.font-weight-bold {
  font-weight: bold;
}
</style>