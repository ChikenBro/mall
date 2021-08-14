<template>
  <div class="toast" v-show="isShow">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    show(message = "", duration = 2000) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 5px;
  z-index: 9999;
}
.toast p {
  text-align: center;
}
</style>