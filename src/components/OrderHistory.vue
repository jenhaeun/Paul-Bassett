<template>
  <v-container class="p-0">
    <div class="header">
      <div @click="goBack" class="goBack">
        <v-icon size="28">chevron_left</v-icon>
      </div>
      <p class="menu_title">주문 내역</p>
    </div>
    <v-row>
      <!-- 필터 선택 -->
      <v-col cols="12" class="d-flex justify-between mt-2" style="padding: 0;">
        <v-select
          color="black"
          hide-details
          v-model="selectedStatus"
          :items="orderStatusList"
          outlined
          prepend-inner-icon="mdi-magnify"
        ></v-select>
      </v-col>

      <!-- 탭 및 날짜 설정 
      탭메뉴 적용시 오류생겨서 일단 적용 뺐습니다 ㅠㅜ-->
      <!-- <v-tabs color="black" grow v-model="tab" class="P_14">
          <v-tabs-slider color="black"></v-tabs-slider>
          <v-tab>주문</v-tab>
          <v-tab>예약</v-tab>
        </v-tabs> -->
        
      <v-col cols="12">
        <div class="d-flex align-center py-2">
          <div class="d-flex cPoint" @click="showDatePicker = !showDatePicker">
              <v-icon class="pr-1">mdi-calendar</v-icon>
              <p class="P_12" >{{ startDate }} - {{ endDate }}</p>
          </div>
          <div>
            <v-btn small class="ml-2 text_gray200" outlined rounded @click="calculateDate('7days')">7일</v-btn>
            <v-btn small class="ml-2 text_gray200"outlined rounded @click="calculateDate('1month')">1개월</v-btn>
            <v-btn small class="ml-2 text_gray200"outlined rounded @click="calculateDate('3months')">3개월</v-btn>
          </div>
      </div>

        <v-dialog v-model="showDatePicker"  persistent width="290">
                <v-date-picker v-model="dates" range @input="handleDateChange"></v-date-picker>
                <v-card class="text-center">
                    <v-btn width="290" text @click="showDatePicker = false">취소</v-btn>
                </v-card>
        </v-dialog>
        
        <!-- 주문 상태에 따른 콘텐츠 표시 -->
        <div v-if="selectedStatus === '주문상태(전체)'">
          <v-row v-for="order in filteredOrderHistory" :key="order.id" cols="8" offset="2" class="white mb-1 rounded-lg v-item-list-oh">
            <v-col cols="3">
              <v-img :src="order.items[0].img" alt="상품 이미지" class="rounded-xl ml-2" style="width: 90px;"></v-img>
            </v-col>
            <v-col cols="9">
              <div class="d-flex justify-space-between">
                <div>
                  <h4> 수령 장소 : {{ order.selectedStore.name }}</h4>
                  <p class="P_20 font-weight-bold">{{ order.items[0].itemName }}</p>
                  <p class="P_12 text_gray300 mt-2">주문 {{ order.orderDate }}</p>
                  <p class="P_12 text_gray300">픽업 {{ order.pickupDate || '-' }}</p>
                </div>
                <div class="text-end mr-2">
                  <!-- <v-chip :color="order.statusColor" dark>{{ order.status }}</v-chip> -->
                  <p class="P_12 text_gray500 mt-5">결제금액</p>
                  <p class="P_16 text_pink font-weight-bold">{{ order.totalPrice ? order.totalPrice.toLocaleString() : '정보 없음' }}원</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- 주문 상태에 따른 콘텐츠 표시 -->
        <div v-if="selectedStatus === '수령완료'">
          <v-row v-for="order in filteredOrderHistory" :key="order.id" cols="8" offset="2" class="white mb-1 rounded-lg v-item-list-oh">
            <v-col cols="3">
              <v-img :src="order.items[0].img" alt="상품 이미지" class="rounded-xl ml-2" style="width: 90px;"></v-img>
            </v-col>
            <v-col cols="9">
              <div class="d-flex justify-space-between">
                <div>
                  <h4> 수령 장소 : {{ order.selectedStore.name }}</h4>
                  <p class="P_20 font-weight-bold">{{ order.items[0].itemName }}</p>
                  <p class="P_12 text_gray300 mt-2">주문 {{ order.orderDate }}</p>
                  <p class="P_12 text_gray300">픽업 {{ order.pickupDate || '-' }}</p>
                </div>
                <div class="text-end mr-2">
                  <!-- <v-chip :color="order.statusColor" dark>{{ order.status }}</v-chip> -->
                  <p class="P_12 text_gray500 mt-5">결제금액</p>
                  <p class="P_16 text_pink font-weight-bold">{{ order.totalPrice ? order.totalPrice.toLocaleString() : '정보 없음' }}원</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
                <!-- 주문 상태에 따른 콘텐츠 표시 -->
                <div v-if="selectedStatus === '미수령'">
                  <v-row v-for="order in filteredOrderHistory" :key="order.id" cols="8" offset="2" class="white mb-1 rounded-lg v-item-list-oh">
                    <v-col cols="3">
                      <v-img :src="order.items[0].img" alt="상품 이미지" class="rounded-xl ml-2" style="width: 90px;"></v-img>
                    </v-col>
                    <v-col cols="9">
                      <div class="d-flex justify-space-between">
                        <div>
                          <h4> 수령 장소 : {{ order.selectedStore.name }}</h4>
                          <p class="P_20 font-weight-bold">{{ order.items[0].itemName }}</p>
                          <p class="P_12 text_gray300 mt-2">주문 {{ order.orderDate }}</p>
                          <p class="P_12 text_gray300">픽업 {{ order.pickupDate || '-' }}</p>
                        </div>
                        <div class="text-end mr-2">
                          <!-- <v-chip :color="order.statusColor" dark>{{ order.status }}</v-chip> -->
                          <p class="P_12 text_gray500 mt-5">결제금액</p>
                          <p class="P_16 text_pink font-weight-bold">{{ order.totalPrice ? order.totalPrice.toLocaleString() : '정보 없음' }}원</p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                
        <div v-if="!selectedStatus">
          <div class="card text-center">
            <p>주문 내역이 없습니다.</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orderStatusList: [
        '주문상태(전체)',
        '주문요청',
        '주문접수',
        '준비완료',
        '수령완료',
        '미수령',
        '결제취소'
      ],
      selectedStatus: '주문상태(전체)',
      dateModalCheck: false,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      showDatePicker: false,
      dates: [new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]],
      orderHistory: []  // 수정: orderHistory를 정의
    };
  },
  computed: {
    filteredOrderHistory() {
      let filtered = this.orderHistory;
      if (this.selectedStatus !== '주문상태(전체)') {
        filtered = filtered.filter(order => order.status === this.selectedStatus);
      }
      return filtered;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    dateModalOpen() {
      this.dateModalCheck = !this.dateModalCheck;
    },
    calculateDate(period) {
      const today = new Date();
      let startDate, endDate;

      switch (period) {
        case '7days':
          endDate = today;
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 7);
          break;
        case '1month':
          endDate = today;
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 1);
          break;
        case '3months':
          endDate = today;
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 3);
          break;
        default:
          return;
      }

      this.startDate = startDate.toISOString().split('T')[0];
      this.endDate = endDate.toISOString().split('T')[0];
    },
    handleDateChange() {
      if (this.dates.length === 2) {
        this.showDatePicker = false;
      }
      const [aDate, bDate] = this.dates;
      this.startDate = aDate;
      this.endDate = bDate;
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

.dateModal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 20;
}
.v-list-item-oh {
  padding: 10px 10px !important;
  box-sizing: border-box;
  position: relative;
  border-radius: 20px;
  background: #fbfbfb !important;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.dateModal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 20;
}
p {
  margin: 0;
  padding: 0;
}
.P_12 {
  font-size: 12px;
}
.P_14 {
  font-size: 14px;
}
.P_16 {
  font-size: 16px;
}
.P_20 {
  font-size: 20px;
}
.font-weight-bold {
  font-weight: bold;
}
.mt-4 {
  margin-top: 16px;
}
.mb-4 {
  margin-bottom: 16px;
}
.mb-1 {
  margin-bottom: 8px;
}
.ml-auto {
  margin-left: auto;
}
.ml-2 {
  margin-left: 8px;
}
.pa-4 {
  padding: 16px;
}
.text_gray500 {
  color: #7D7D7D;
}
.text_gray300 {
  color: #BDBDBD;
}
.text_pink {
  color: #EA094B;
}
.selectedDate{
  display: flex;
  justify-content: space-between;
}
</style>