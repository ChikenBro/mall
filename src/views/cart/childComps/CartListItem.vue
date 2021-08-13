<template>
  <div class="cart-list-item flex">
    <div class="select flex">
      <check-button :is-active="product.checked" @click.native="checkClick" />
    </div>

    <div class="item-info flex">
      <img :src="product.image" alt="" class="item-image" />
      <div class="item-des">
        <p class="title">{{ product.title }}</p>
        <p class="desc">{{ product.desc }}</p>
        <span class="price">￥{{ product.price }}</span>
        <span class="count"> ×{{ product.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.cart-list-item {
  display: flex;
  height: 10%;
  border-bottom: 1px solid #eee;
}

.select {
  flex: 1;
  justify-content: center;
  align-items: center;
}

.item-info {
  margin: 10px;
  display: flex;
  flex: 7;
}

.item-image {
  display: block;
  width: 80px;
  border-radius: 10px;
  margin-right: 5px;
}

.item-des {
  position: relative;
  margin: 0 10px;
}
.title,
.desc {
  width: 60vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 10px;
}

.title {
  font-size: 18px;
}

.desc {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

.price,
.count {
  position: absolute;
  bottom: 0;
}

.price {
  left: 0;
  color: orange;
}
.count {
  right: 0;
}
</style>