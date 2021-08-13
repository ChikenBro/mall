<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    />
    <scroll
      class="detail-content"
      ref="detailScroll"
      :probe-type="3"
      @scroll="detailScroll"
    >
      <detail-swiper :top-images="topImages" ref="test" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-params-info :params-info="paramsInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommendInfo" ref="recommend" />
    </scroll>
  </div>
</template>

<script>
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList.vue";
import { debounce } from "common/utils.js";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "network/detail";

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: [],
      recommendInfo: [],
      refresh: null,
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
    };
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    // 根据iid请求数据
    getDetail(this.iid).then((res) => {
      // 获取顶部轮播图数据
      const data = res.result;
      // console.log(data);
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取商家信息
      this.shop = new Shop(data.shopInfo);

      // 保存详情数据
      this.detailInfo = data.detailInfo;

      // 获取商品参数
      this.paramsInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
      }
    });

    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });

    // 下一帧
    this.$nextTick(() => {});
    this.getThemeTopYs = debounce(() => {
      console.log(this.$refs.test.$el.offsetTop);
      this.themeTopYs = [0];
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    this.refresh = debounce(this.$refs.detailScroll.refresh, 50);
    this.$bus.$on("detailItemImageLoad", () => {
      this.refresh();
    });
  },
  methods: {
    detailImageLoad() {
      // this.$refs.detailScroll.refresh();
      this.refresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.detailScroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    detailScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length;

      for (let i = length - 1; i >= 0; i--) {
        if (positionY >= this.themeTopYs[i]) {
          if (this.currentIndex === i) break;
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = i;
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9999;
}

.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 99999;
}
.detail-content {
  /* 不加relative的话 offsetTof会多出nav的44px */
  position: relative;
  height: calc(100% - 44px);
}
</style>