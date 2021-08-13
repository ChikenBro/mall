<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-text-wrap">
      <div class="text-top-style"></div>
      <div class="desc info-text-desc">{{ detailInfo.desc }}</div>
      <div class="text-bot-style"></div>
    </div>

    <div class="img-list-wrap" v-for="item in detailInfo.detailImage">
      <div class="desc">{{ item.key }}</div>
      <div v-for="(item, index) in item.list" :key="index">
        <img :src="item" alt="" class="img" @load="imageLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count: 0,
      imageLength: 0,
    };
  },
  methods: {
    imageLoad() {
      this.$emit("detailImageLoad");
      //加载太慢了 有时候跟不上计算height的速度
      if (++this.count === this.imageLength) {
        this.$emit("detailImageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      this.imageLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.info-text-wrap {
  position: relative;
}

.text-top-style {
  width: 60px;
  height: 1px;
  background-color: #333;
  margin-left: 4px;
}

.text-top-style::before {
  content: "";
  position: absolute;
  left: 4px;
  top: -2.5px;
  display: block;
  width: 5px;
  height: 5px;
  background-color: #333;
}

.text-bot-style {
  position: absolute;
  right: 4px;
  bottom: 0;
  width: 60px;
  height: 1px;
  background-color: #333;
}

.text-bot-style::after {
  content: "";
  position: absolute;
  right: 0;
  top: -2.5px;
  display: block;
  width: 5px;
  height: 5px;
  background-color: #333;
}

.info-text-desc {
  padding: 10px 4px;
}

.desc {
  font-size: 14px;
  padding-bottom: 6px;
  line-height: 20px;
  margin: 4px 0;
  text-indent: 10px;
}

.img {
  width: 100%;
}
</style>