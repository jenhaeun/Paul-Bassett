<template>
<v-container>
  <div class="header">
    <div @click="goBack" class="goBack">
      <v-icon size="28">chevron_left</v-icon>
    </div>
    <p class="menu_title">주문하기</p>
  </div>
  <div class="grey lighten-4">

      <!-- 주문번호 -->
      <div class="brown darken-3 pa-4 P_20 text_white d-flex justify-space-between">
        <h3>주문번호</h3>
        <h3 class="pl-5">No238562312</h3>
        <p class="ml-auto">{{ todayDate }}</p>
      </div>
      
      <!-- 스텝퍼 -->
      <v-row>
          <v-col md="10" offset-md="1" style="margin: 20px 20px 10px;">
              <v-card class="text-center pa-3" elevation="5">
                  <p class="P_14 pt-3 font-weight-bold">주문을 곧 확인하겠습니다.</br>잠시만 기다려주세요.</p>
                      <div class="d-flex align-center P_14" style="margin: 25px 25px 10px;">
                          <div>
                              <div class="pa-2 circle brown darken-2">
                                  <v-icon x-large dark>notes</v-icon>
                              </div>
                              <p class="mt-3 font-weight-bold">주문요청</p>
                          </div>
                          <v-divider class="mb-9"></v-divider>
                          <div>
                              <div class="pa-2 circle grey lighten-2">
                                  <v-icon x-large dark>approval</v-icon>
                              </div>
                              <p class="mt-3">주문확인</p>
                          </div>
                          <v-divider class="mb-9"></v-divider>
                          <div>
                              <div class="pa-2 circle grey lighten-2">
                                  <v-icon x-large dark>hourglass_empty</v-icon>
                              </div>
                              <p class="mt-3">픽업대기</p>
                          </div>
                          <v-divider class="mb-9"></v-divider>
                          <div>
                              <div class="pa-2 circle grey lighten-2">
                                  <v-icon x-large dark>check</v-icon>
                              </div>
                              <p class="mt-3">픽업완료</p>
                          </div>
                      </div>
              </v-card>
          </v-col>
      </v-row>

      <!-- 주문 매장 정보 -->
      <v-row cols="12" class="white px-5 py-3">
          <v-col cols="12" v-if="selectedStore">
            <p class="P_14 font-weight-bold">주문 매장</p>
            <h3 class="P_24 text_pink mt-1">{{ selectedStore.name }}</h3>
            <p class="P_14 text_gray300 mt-1">{{ selectedStore.address }}</p>
              <div class="d-flex justify-space-between ">
              <v-btn outlined rounded class="P_14 mt-6" :href="phoneLink"
              target="_self"
              >070-8998-8984 <v-icon small>perm_phone_msg</v-icon></v-btn>
              <a href="#none" class="P_12 text_gray500 mt-auto">카카오 지도 보기<v-icon class="pl-1">keyboard_arrow_right</v-icon></a>
              </div>
          </v-col>
      </v-row>

      <!--주문 상품-->
      <v-row class="white mt-6 px-10">
          <v-col cols="12" class="d-flex P_14" style="padding: 20px 0 0;" >
              <p>주문내역</p>
              <p>1개</p>
              <p class="ml-auto">나만의 메뉴 등록하기     
                <div class="favorite_btn" @click="handleFavoriteClick">
                  <v-icon size="24" :color="isFavorite ? 'red' : '#000000'">
                    {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </div></p>
                <Modal
                :isOpen="showAddFavoriteModal"
                @update:isOpen="val => showAddFavoriteModal = val"
                closeText="확인"
                buttonType="default"
              >
                나만의 메뉴로 등록되었습니다.
              </Modal>
          
              <Modal2
                :isOpen="showRemoveFavoriteModal"
                @update:isOpen="val => showRemoveFavoriteModal = val"
                confirmText="예"
                cancelText="아니오"
                @confirm="handleConfirmRemoveFavorite"
                @cancel="handleCancelRemoveFavorite"
              >
                나만의 메뉴에서 해제됩니다. <br> 정말 삭제하시겠습니까?
              </Modal2>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between" v-for="(order, index) in orderHistory" :key="order.id" v-if="index === 0">
            <v-col cols="4">
              <v-img :src="order.items[0].img" :alt="order.items[0].name" style="width: 110px;" class="rounded-xl ml-2"></v-img>
            </v-col>
            <v-col cols="8" class="pa-5">
              <div class="d-flex justify-space-between">
                <p>{{ order.items[0].name }}</p>
                <p>{{  order.totalPrice ? order.totalPrice.toLocaleString() : '정보 없음'  }}원</p>
              </div>
              <p class="text_gray300">{{ order.items[0].options.IceHot }}</p>
              <p class="text-end mt-8">{{ order.totalPrice.toLocaleString() }}원</p>
            </v-col>
          </v-col>
          <v-col cols="12" style="padding: 0;">
              <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-between P_20 pa-5 font-weight-bold" v-for="(order, index) in orderHistory" :key="order.id" v-if="index === 0">
            <p class="text_brown">결제 금액</p>
            <p class="text_pink">{{ order.totalPrice ? order.totalPrice.toLocaleString() : '정보 없음' }}원</p>
          </v-col>
      </v-row>

      <v-row cols="12" class="white mt-6 px-5 py-2">
          <v-col cols="12">
          <div class="d-flex justify-space-between">
              <p class="text_brown P_14">결제 방법</p>
              <p class="P_12 text_gray500">카카오페이 결제</p>
          </div>
          <a href="#none" class="text_gray300 P_12">결제내역 자세히 보기<v-icon class="pl-1">keyboard_arrow_right</v-icon></a>
          </v-col>
      </v-row>
      <div class="text-center mt-5">
          <router-link :to="{ path: '/Menu' }">
          <v-btn color="black" class="text_white pa-4 ma-2" style="width: 210px;" large>그대로 메뉴 담기</v-btn></router-link>
          <router-link :to="{ path: '/OrderHistory' }">
          <v-btn color="grey lighten-1" class="pa-3 ma-2" style="width: 210px;" large>영수증 보기</v-btn></router-link>
      </div>
  </div>
</v-container>
</template>


<script>
import Modal from '@/components/Modal.vue';
import Modal2 from '@/components/Modal2.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Modal,
    Modal2
  },
  data() {
    return {
      phoneLink: 'tel:070-8998-8984',
      showAddFavoriteModal: false,
      showRemoveFavoriteModal: false,
      isFavorite: false, // 좋아요 버튼
      today: new Date(),
      cartTotalPrice: 0
    };
  },
  computed: {
  ...mapGetters(['orderHistory, selectedStore']),
  todayDate() {
      const year = this.today.getFullYear();
      const month = String(this.today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
      const day = String(this.today.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    }
  },
  methods: {
    ...mapActions(['removeFavorite']),
    handleFavoriteClick() {
      if (!this.isLoggedIn) {
        this.showLoginModal = true;
      } else {
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
          this.saveToFavorites();
          this.showAddFavoriteModal = true;
        } else {
          this.itemToRemove = this.getItemToRemove(); // 제거할 아이템 저장
          this.showRemoveFavoriteModal = true;
        }
      }
    },
    handleConfirmRemoveFavorite() {
      this.removeFavorite(this.itemToRemove.id); // Vuex 액션 호출
      this.itemToRemove = null; // 제거할 아이템 초기화
      this.isFavorite = false; // UI 업데이트
      this.showRemoveFavoriteModal = false; // 모달 닫기
    },
    handleCancelRemoveFavorite() {
      this.isFavorite = true; // UI 상태를 원래대로 유지
      this.showRemoveFavoriteModal = false; // 모달 닫기
    },
    saveToFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const existingIndex = favorites.findIndex(fav => fav.id === this.item.Id);
      if (existingIndex === -1) {
        favorites.push({
          id: this.item.Id,
          title: this.item.Title,
          img: this.currentImageUrl
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    },
    removeFromFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(fav => fav.id !== this.item.Id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    },
    checkIfFavorite() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.isFavorite = favorites.some(fav => fav.id === this.item.Id);
    },

    goBack() {
      this.$router.go(-1);
    },

    loadOrderItems() {
      const savedOrderItems = localStorage.getItem('orderHistory');
      if (savedOrderItems) {
        this.orderHistory = JSON.parse(savedOrderItems);
      }
    }
  },
  created() {
    this.loadOrderItems();
  },
};
</script>

<style scoped>
p{
  margin: 0;
  padding: 0;
}

v-col{
  margin: 0;
  padding: 0;
}

.P_16{
  font-size: 16px;
}

.P_12{
  font-size: 12px;
}

.P_10{
  font-size: 10px;
}

.P_14{
  font-size: 14px;
}

.P_24{
  font-size: 24px;
}

.P_20{
  font-size: 20px;
}
.text_pink{
  color: #EA094B;
}

.text_gray500{
  color: #606060;
}

.text_gray300{
  color: #C1C1C1;
}

.text_white{
  color: #FFFFFF;
}
.text_brown{
  color: #503629;
}
.favorite-active {
  color: red !important; 
}
</style>
