<template>
  <div>
    <div class="header">
      <p class="menu_title">선물하기</p>
    </div>
    <v-tabs fixed-tabs v-model="tab" color="black">
      <v-tab href="#gift">선물하기</v-tab>
      <v-tab href="#received">받은선물</v-tab>
      <v-tab href="#orders">주문내역</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <div class="content-height">
        <!-- 선물하기 -->
        <v-tab-item value="gift">
          <p class="center-text margin-bottom">
            Paul Bassett 매장 방문 없이 e-Card를<br />사랑하는 친구/지인에게 선물해보세요.
          </p>
          <div class="card-background">
            <!-- Centered buttons in a row -->
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn
                  class="card-type no-shadow"
                  :class="{ 'selected-btn': selectedBtn === '폴바셋' }"
                  @click="selectButton('폴바셋')"
                >
                  폴바셋
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  class="card-type no-shadow"
                  :class="{ 'selected-btn': selectedBtn === '시즌' }"
                  @click="selectButton('시즌')"
                >
                  시즌
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  class="card-type no-shadow"
                  :class="{ 'selected-btn': selectedBtn === '감사' }"
                  @click="selectButton('감사')"
                >
                  감사
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  class="card-type no-shadow"
                  :class="{ 'selected-btn': selectedBtn === '축하' }"
                  @click="selectButton('축하')"
                >
                  축하
                </v-btn>
              </v-col>
            </v-row>
            <!-- Image Carousel with Pager -->
            <v-row justify="center">
              <v-col cols="auto">
                <v-carousel
                  v-model="carouselIndex"
                  hide-delimiters
                  :show-arrows="false"
                >
                  <v-carousel-item
                    v-for="(image, index) in images[selectedBtn]"
                    :key="index"
                  >
                    <v-img
                      :src="require(`@/assets/cards/${image}`)"
                      class="card-rounded no-shadow"
                      cover
                    >
                      <!-- Pager -->
                      <div class="pager">
                        {{ carouselIndex + 1 }} / {{ images[selectedBtn].length }}
                      </div>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </div>

          <v-container flat class="pt-5 pb-2 h-200 content-margin">
            <div class="left-align hori-align">
              <p class="font-weight-medium">받는 사람</p>
              <div class="btn-align">
                <v-btn class="receiver-btn no-shadow margin-right">나에게 선물하기</v-btn>
                <v-btn class="receiver-btn no-shadow">연락처 가져오기</v-btn>
              </div>
            </div>

            <div class="left-align">
              <v-text-field
                class="name margin-right"
                v-model="recipientName"
                placeholder="이름(30자 내)"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                class="number"
                v-model="recipientNumber"
                placeholder="휴대폰 번호"
                outlined
                dense
              ></v-text-field>
            </div>

            <p class="font-weight-medium left-align">메세지 입력</p>

            <v-textarea
              class="message left-align text-padding"
              v-model="message"
              placeholder="메세지를 입력해주세요."
            ></v-textarea>
          </v-container>

          <div class="gray-line"></div>

          <v-container flat class="pt-5 pb-2 content-margin">
            <div class="left-align hori-align">
              <p class="font-weight-medium">선물 금액 선택</p>
              <p><span class="text-bold">{{ formattedAmount }}</span> 원</p>
            </div>
            <div class="left-align amount-align">
              <v-btn
                class="no-shadow amount-btn"
                :class="{ 'selected-btn': selectedAmountBtn === 10000 }"
                @click="selectAmount(10000)"
              >10,000원</v-btn>
              <v-btn
                class="no-shadow amount-btn"
                :class="{ 'selected-btn': selectedAmountBtn === 30000 }"
                @click="selectAmount(30000)"
              >30,000원</v-btn>
              <v-btn
                class="no-shadow amount-btn"
                :class="{ 'selected-btn': selectedAmountBtn === 50000 }"
                @click="selectAmount(50000)"
              >50,000원</v-btn>
            </div>
            <div class="left-align amount-align">
              <v-btn
                class="no-shadow amount-btn"
                :class="{ 'selected-btn': selectedAmountBtn === 100000 }"
                @click="selectAmount(100000)"
              >100,000원</v-btn>
              <v-btn
                class="no-shadow amount-btn"
                :class="{ 'selected-btn': selectedAmountBtn === 200000 }"
                @click="selectAmount(200000)"
              >200,000원</v-btn>
              <v-btn
                class="no-shadow amount-btn"
                :class="{ 'selected-btn': selectedAmountBtn === 'custom' }"
                @click="openCustomAmountModal"
              >직접입력</v-btn>
            </div>

            <!-- Custom Amount Modal -->
            <v-dialog v-model="customAmountDialog" max-width="300px">
              <v-card>
                <v-card-title>금액 입력</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="customAmount"
                    label="금액을 입력하세요"
                    type="text"
                    :value="formattedCustomAmount"
                    @input="customAmount = $event.replace(/,/g, '')"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="black" text @click="cancelCustomAmount">취소</v-btn>
                  <v-btn color="black" text @click="saveCustomAmount">입력</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>

          <div class="gray-line"></div>

          <v-container flat class="pt-5 pb-2 content-margin">
            <p class="left-align hori-align font-weight-medium">결제 수단</p>
            <div class="payment-align hori-align">
              <input 
              type="radio" 
              id="payment" 
              name="credit" 
              value-="credit"
              checked="checked"
              class="margin-right">
              <label for="payment">신용카드</label>
            </div>
          </v-container>

          <div class="d-flex justify-center">
            <v-btn 
            class="send-btn no-shadow" 
            color="black" 
            @click="showPaymentCompleteDialog">
            선물 보내기</v-btn>
          </div>

          <v-dialog v-model="paymentCompleteDialog" max-width="500px">
            <v-card>
              <v-card-title class="text-center">
                <span class="payment-complete-text">결제가 완료되었습니다</span>
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn color="black" @click="paymentCompleteDialog = false" class="text-white">확인</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <div class="left-align hori-align card-info">
            e-Card 이용안내
          </div>
          
          <v-container flat class="pb-2 content-margin">
            <div>
              ㆍ카카오 알림톡으로 발신되며 발신실패등의 사유로 발신이 불가할 시 LMS로 대체 전송됩니다. 최종 발신이 실패할 경우 자동 취소 됩니다.
              <br>
              ㆍe-Card 선물의 발송이 실패하는 경우, 구매가 자동 취소 됩니다.
              <br>
              ㆍe-Card 1장당 구입 가능 금액은 10,000 ~ 500,000 원이며, 만원 단 위로 구입 가능합니다.
              <br>
              ㆍe-Card 선물은, 월 최대 100만원까지만 가능합니다. (단, 현대카드 the Red Edition 커피 바우처 교환 전용 대상 e-Card카드의 경우 제외)  30분 단위, 다음날부터 30일 이내로 지정할 수 있습니다.
              <br>
              ㆍ 휴대폰 전송은 수신받는 휴대폰 설정에 따라 불가할 수 있습니다. 
              <br>
              ㆍ선물하신 e-Card는 결제 취소기한 (결제일로부터 7일) 내 [e-Card 구 매선물] > [선물내역]에서 취소 가능합니다. 단, 카드 잔액이전 또는 사용 하거나 상대방이 회원계정에 등록한 경우 취소가 불가능합니다.
              <br>
              ㆍe-Card의 재발송은 최대 3회까지 가능합니다. 
              <br>
              ㆍ엠즈씨드(주)는 고객 개인정보 보호차원에서 e-Card 발송 내역을 3개월만 보관하고 있으므로 3개월 이후 삭제,분실 등에 대한 재발송 처리가 불가하오니 이점 유의하시기 바랍니다.
            </div>
          </v-container>

        </v-tab-item>

        <!-- 받은선물 -->
        <v-tab-item value="received">
          <v-card flat>
            <v-card-text>
              <p>여기에서 받은 선물을 확인하세요.</p>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- 주문내역 -->
        <v-tab-item value="orders">
          <v-card flat>
            <v-card-text>
              <p>여기에서 주문 내역을 확인하세요.</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </div>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "gift",
  data() {
    return {
      tab: "gift",
      carouselIndex: 0,
      selectedBtn: "폴바셋",
      images: {
        "폴바셋": ["pb_1.png", "pb_2.png", "pb_3.png", "pb_4.png", "pb_5.png", "pb_6.png", "pb_7.png", "pb_8.png"],
        "시즌": ["season_1.png", "season_2.png", "season_3.png", "season_4.png"],
        "감사": ["thanks_1.png", "thanks_2.png", "thanks_3.png"],
        "축하": ["congrats_1.png", "congrats_2.png", "congrats_3.png", "congrats_4.png"],
      },
      selectedAmount: 0,
      customAmountDialog: false,
      customAmount: "", // This will hold the raw number for input
      paymentCompleteDialog: false, // New data property for dialog
      // Add the new properties here
      recipientName: '',
      recipientNumber: '',
      message: '',
    };
  },
  computed: {
    formattedAmount() {
      return this.selectedAmount.toLocaleString();
    },
    formattedCustomAmount() {
      return this.customAmount ? parseFloat(this.customAmount).toLocaleString() : '';
    }
  },
  methods: {
    selectButton(buttonName) {
      this.selectedBtn = buttonName;
      this.carouselIndex = 0;
    },
    selectAmount(amount) {
      this.selectedAmount = amount;
      this.selectedAmountBtn = amount;
    },
    openCustomAmountModal() {
      this.customAmountDialog = true;
    },
    saveCustomAmount() {
      const parsedAmount = parseFloat(this.customAmount.replace(/,/g, ''));
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        this.selectedAmount = parsedAmount;
        this.selectedAmountBtn = 'custom';
        this.customAmountDialog = false;
      }
    },
    cancelCustomAmount() {
      this.customAmountDialog = false;
    },
    showPaymentCompleteDialog() {
      this.paymentCompleteDialog = true;
      this.resetForm();  // Call the resetForm method to reset everything
    },
    resetForm() {
      // Reset form fields
      this.recipientName = '';
      this.recipientNumber = '';
      this.message = '';

      // Reset selected card type
      this.selectedBtn = '폴바셋';

      // Reset image carousel
      this.carouselIndex = 0;

      // Reset selected amount
      this.selectedAmount = 0;
      this.selectedAmountBtn = null;

      // Scroll to top
      window.scrollTo(0, 0);
    },
  }
};
</script>


<style scoped>
.content-height {
  height: 1600px;
}
.margin-bottom{
  margin-bottom: 15px;
}
.content-margin {
  padding-left: 20px !important;
  padding-right: 20px !important;
}
.center-text {
  text-align: center;
  margin-top: 15px;
}
.card-background {
  background-color: #f7f7f7;
  padding-top: 25px;
}
.h-200 {
  margin-top: 15px;
}
.card-type {
  border-radius: 30px;
  border: 1px solid #000;
  width: 75px;
  height: 40px;
}
.card-rounded {
  border-radius: 15px;
  border: 1px solid #fbfbfb;
  width: 320px;
  height: 190px;
}
.selected-btn {
  background-color: black !important;
  color: white !important;
}
.pager {
  position: absolute;
  bottom: 13px;
  right: 25px;
  background-color: rgba(146, 146, 146, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 13px;
  font-size: 14px;
}
.no-shadow {
  box-shadow: none !important;
}
.v-carousel {
  height: 200px !important;
}
.receiver-btn {
  border: 1px solid #000;
  width: 125px;
  border-radius: 7px;
}
.name {
  border: 1px solid #000;
  height: 40px;
  width: 140px;
}
.number {
  border: 1px solid #000;
  height: 40px;
  width: 190px;
}
.message {
  border: 1px solid #000;
  border-radius: 5px;
  height: 155px;
}
.left-align {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.btn-align {
  display: flex;
}
.margin-right {
  margin-right: 10px;
}
.hori-align {
  vertical-align: middle;
  align-content: center;
}
.text-padding {
  padding: 12px 15px;
}
.gray-line {
  height: 12px;
  background-color: #f7f7f7;
}
.amount-btn {
  border: 1px solid #000;
  width: 120px;
}
.hide-btn {
  display: none;
}
.text-bold{
  font-weight: bold;
}
.payment-align{
  justify-content: left;
}
.send-btn{
  margin-top: 15px;
  display: block;
  width: 390px;
  height: 40px !important;
  color: #fff;
  margin-bottom: 20px;
}
.card-info{
  height: 35px;
  background-color: #f7f7f7;
  padding: 5px 20px;
}
.payment-complete-text {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.text-white{
  color: #fff;
}

</style>
