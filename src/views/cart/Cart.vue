<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 购物车商品 -->
    <cart-list></cart-list>
    <cart-buttom-bar />
  </div>
</template>

<script>
import CartList from "./childComps/CartList.vue";
import CartButtomBar from "./childComps/CartButtomBar.vue";

import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartButtomBar,
  },
  computed: {
    // ...mapGetters(["cartLength", "cartList"]),
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
</style>