import Vue from 'vue';
import Vuex from 'vuex';
import modCommon from "./store-mod/common";
import modProvider from "./store-mod/provider";

Vue.use(Vuex);

const getDefaultState = () => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  membership: JSON.parse(localStorage.getItem('membership')) || {},
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [],
  selectedStore: JSON.parse(localStorage.getItem('selectedStore')) || null  // 추가된 상태
});

export default new Vuex.Store({
<<<<<<< HEAD
  state: getDefaultState(),
  mutations: {
=======
  state: {
    cart: [],  // 장바구니 아이템 목록

    selection: []  // 매장 선택
  },
  mutations: {
    // 장바구니 아이템 추가
>>>>>>> 3b333d0dc4f802f232c97edd579aded4a9be9014
    ADD_TO_CART(state, item) {
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.totalPrice;
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    SET_MEMBERSHIP(state, membership) {
      state.membership = membership;
      localStorage.setItem('membership', JSON.stringify(state.membership));
    },
    RESET_MEMBERSHIP(state) {
      state.membership = {};
      localStorage.removeItem('membership');
    },
    ADD_FAVORITE(state, item) {
      const existingFavorite = state.favorites.find(fav => fav.id === item.id);
      if (!existingFavorite) {
        state.favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
<<<<<<< HEAD
    REMOVE_FAVORITE(state, itemId) {
      state.favorites = state.favorites.filter(fav => fav.id !== itemId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    ADD_ORDER_HISTORY(state, order) {
      state.orderHistory.push(order);
      localStorage.setItem('orderHistory', JSON.stringify(state.orderHistory));
    },
    SET_SELECTED_STORE(state, store) {  // 추가된 뮤테이션
      state.selectedStore = store;
      localStorage.setItem('selectedStore', JSON.stringify(store));
    },
    RESET_SELECTED_STORE(state) {  // 추가된 뮤테이션
      state.selectedStore = null;
      localStorage.removeItem('selectedStore');
=======
    // 장바구니 초기화
    CLEAR_CART(state) {
      state.cart = [];
    },

    // 매장 선택
    STORE_SELECTION(state, store) {
      state.selection = [store];
>>>>>>> 3b333d0dc4f802f232c97edd579aded4a9be9014
    }

  },
  actions: {
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
<<<<<<< HEAD
    setMembership({ commit }, membership) {
      commit('SET_MEMBERSHIP', membership);
    },
    resetMembership({ commit }) {
      commit('RESET_MEMBERSHIP');
    },
    addFavorite({ commit }, item) {
      commit('ADD_FAVORITE', item);
    },
    removeFavorite({ commit }, itemId) {
      commit('REMOVE_FAVORITE', itemId);
    },
    addOrderHistory({ commit }, order) {
      commit('ADD_ORDER_HISTORY', order);
    },
    selectStore({ commit }, store) {  // 추가된 액션
      commit('SET_SELECTED_STORE', store);
    },
    deselectStore({ commit }) {  // 추가된 액션
      commit('RESET_SELECTED_STORE');
=======
    
    storeSelection({ commit }, store) {
      commit('STORE_SELECTION', store);
>>>>>>> 3b333d0dc4f802f232c97edd579aded4a9be9014
    }

  },
  getters: {
<<<<<<< HEAD
    cartItems: state => state.cartItems,
    cartQuantity: state => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartTotalPrice: state => state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
    membership: state => state.membership,
    favorites: state => state.favorites,
    isFavorite: (state) => (itemId) => {
      return state.favorites.some(fav => fav.id === itemId);
    },
    orderHistory: state => state.orderHistory,
    selectedStore: state => state.selectedStore  // 추가된 게터
=======
    cartItems: state => state.cart,
    cartQuantity: state => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotalPrice: state => state.cart.reduce((sum, item) => sum + item.totalPrice, 0),

    selectedStore: state => state.selection.length > 0 ? state.selection[0] : null
>>>>>>> 3b333d0dc4f802f232c97edd579aded4a9be9014
  },
  modules: {
    provider: modProvider,
    common: modCommon
  }
});
