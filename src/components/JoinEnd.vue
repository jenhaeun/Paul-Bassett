<template>
  <v-container>
    <v-row>
        <v-col cols="8" offset="2" class="logo">
        <v-img src="@/assets/loginimage/paul_logo.png"></v-img>
      </v-col>
      <v-col class="text-center mt-4">
        <h4>회원가입이 완료되었습니다.</h4>
        <p>로그인 후 서비스를 이용해보세요.</p>
        <v-btn
          type="button"
          color="grey darken-4"
          dark
          size="x-large"
          width="70%"
          height="50px"
          class="mt-16"
          @click="toHome"
        >홈으로 이동</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
       name: "JoinEnd"
    }
  },
  methods: {
    toHome() {
      this.$router.push("/")
    }
}
  };
</script>

<style scoped>
.logo{
  margin-top: 150px;
}
</style>