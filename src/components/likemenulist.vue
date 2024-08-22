<template>
  <v-container>
    <div class="header">
      <div @click="goBack" class="goBack">
        <v-icon size="28">chevron_left</v-icon>
      </div>
      <p class="menu_title">나만의 메뉴</p>
    </div>
    <v-list>
      <v-list-item v-for="item in favoriteList" :key="item.id" @click="goToDetail(item.id)">
        <div class="menulist_box">
          <v-img class="img-rounded" :src="item.img" cover />
          <div class="menulist_title">
            <p>{{ item.title }}</p>
          </div>
          <v-icon 
            class="likebtn"
            
            :color="'red'" 
            @click.stop="confirmRemoveFromFavorites(item)"
          >
            mdi-heart
          </v-icon>
        </div>
      </v-list-item>
    </v-list>

    <!-- 삭제 확인 모달 -->
    <Modal2
      :isOpen="showRemoveFavoriteModal"
      @update:isOpen="val => showRemoveFavoriteModal = val"
      confirmText="예"
      cancelText="아니오"
      @confirm="handleConfirmRemoveFavorite"
      @cancel="handleCancelRemoveFavorite"
    >
      나만의 메뉴에서 해제됩니다. 정말 삭제하시겠습니까?
    </Modal2>
  </v-container>
</template>

<script>
import Modal2 from '@/components/Modal2.vue';

export default {
  name: "LikeMenuList",
  components: {
    Modal2
  },
  data() {
    return {
      favoriteList: [],
      showRemoveFavoriteModal: false, // 모달 표시 여부
      itemToRemove: null, // 삭제할 항목
    };
  },
  created() {
    this.loadFavorites();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favoriteList = favorites;
    },
    goToDetail(id) {
      this.$router.push(`/menu/${id}`);
    },
    confirmRemoveFromFavorites(item) {
      this.itemToRemove = item;
      this.showRemoveFavoriteModal = true;
    },
    handleConfirmRemoveFavorite() {
      this.removeFromFavorites(this.itemToRemove.id);
      this.showRemoveFavoriteModal = false;
      this.itemToRemove = null;
    },
    handleCancelRemoveFavorite() {
      this.showRemoveFavoriteModal = false;
      this.itemToRemove = null;
    },
    removeFromFavorites(itemId) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(fav => fav.id !== itemId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.loadFavorites(); // 찜 목록 업데이트
    }
  }
};
</script>

<style scoped>
.menulist_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.img-rounded {
  border-radius: 8px;
  width: 200px;
}
.menulist_title {
  flex-grow: 1;
  margin-left: 16px;
}
.v-chip.v-chip--active {
  background: #000000 !important;
  color: #ffffff !important; 
  border-color: #000000 !important;
}

.menulist_box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.img-rounded {
  border-radius: 20px !important;
  border: 1px solid #fbfbfb;
  width: 100px; 
  height: 100px; 
}
.menulist_title{
  display: flex;
  flex-direction: column;
  margin-left: 15px !important;
  /* gap: 5px; */
}

.menulist_title > p{
  font-size: 18px;
  margin: 0 !important;
  font-weight: bold;
}
.menulist_title > span{
  font-size: 18px;
}
.menulist_box v-image{
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.5);
}
.v-list-item {
  padding: 10px 10px !important;
  box-sizing: border-box;
  position: relative;
  border-radius: 20px;
  background: #fbfbfb;
  /* box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.1); */
  margin-bottom: 20px;
}
.likebtn{
  position: absolute;
  top: 50%;
  right: 20px;
  /* border: 1px solid #ddd; */
  /* padding: 3px 3px; */
  border-radius: 50%;
  transform: translateY(-50%);
}
</style>
