<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="无" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imageLoad() {
      // 利用时间总线向爷爷发送事件

      // 方法1
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("homeItemImageLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("detailItemImageLoad");
      }

      // 方法2
      // if (this.goodsItem.show) this.$bus.$emit("homeItemImageLoad");
      // if (this.goodsItem.image) this.$bus.$emit("detailItemImageLoad");

      // 方法3 利用deactiveted() 取消监听
    },
    itemClick() {
      if (this.goodsItem.iid) {
        this.$router.push("/detail/" + this.goodsItem.iid);
      }
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>