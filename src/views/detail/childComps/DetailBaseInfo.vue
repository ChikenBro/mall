<template>
  <div v-if="Object.keys(goods).length !== 0">
    <h5 class="title">{{ goods.title }}</h5>

    <div class="price-content">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount-desc" v-if="goods.discount">
        {{ goods.discount }}
      </span>
    </div>

    <div class="other-info">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>

    <div class="serves-content">
      <div v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span> {{ goods.services[index - 1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 14px;
  padding: 5px 4px;
}

.price-content {
  display: flex;
  padding: 0px 4px;
  height: 30px;
  line-height: 30px;
}

.new-price {
  color: var(--color-high-text);
  font-size: 20px;
}

.old-price {
  color: #999;
  font-size: 8px;
  margin: 0 5px;
  text-decoration: line-through;
  line-height: 35px;
}

.discount-desc {
  position: relative;
  top: -2px;
  left: 5px;
  padding: 5px 10px;
  color: #fff;
  font-size: 8px;
  border-radius: 15px;
  background-color: var(--color-high-text);
  height: 20px;
  line-height: 100%;
}

.other-info {
  display: flex;
  color: #999;
  font-size: 12px;
  padding: 10px 4px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;
}
.other-info span {
  flex: 1;
}

.other-info span:nth-child(2) {
  text-align: center;
}

.other-info span:nth-child(3) {
  text-align: right;
}

.serves-content {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 4px;
  justify-content: space-between;
  border-bottom: 4px solid #ededed;
}

.serves-content img {
  position: relative;
  top: -1px;
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
</style>