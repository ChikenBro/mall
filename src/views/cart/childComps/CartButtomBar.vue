<template>
  <div class="cart-bot-bar flex">
    <div class="flex all-select">
      <check-button :is-active="isSelectAll" @click.native="checkClcik" />
      <b class="all">全选</b>
    </div>
    <div class="money">合计：{{ totalPrice }}</div>
    <div class="to-count">去结算 {{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return "(" + this.cartList.filter((item) => item.checked).length + ")";
    },
    isSelectAll() {
      // return !this.cartList.filter((item) => !item.checked).length;
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClcik() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }

      // this.cartList.forEach((item) => (item.checked = !this.isSelectAll)); 不可以
    },
  },
};
</script>

<style scoped="scoped">
.flex {
  display: flex;
}
.cart-bot-bar {
  position: fixed;
  align-items: center;
  justify-content: space-between;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  padding-left: 10px;
  font-size: 13px;
  background-color: #eee;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
}

.all-select {
  justify-content: center;
  align-items: center;
}

.money {
  position: relative;
  padding-right: 10px;
  left: 50px;
}

.to-count {
  padding: 0 10px;
  height: 100%;
  line-height: 40px;
  background: orange;
  color: white;
}
</style>