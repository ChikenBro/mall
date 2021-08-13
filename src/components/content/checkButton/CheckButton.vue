<template>
  <div class="check-button" :class="{ active: isActive }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  margin: 4px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.active {
  background: red;
  border-color: red;
}
</style>