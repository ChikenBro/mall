<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    />
    <scroll
      class="detail-content"
      ref="scroll"
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
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList.vue";

import { debounce } from "common/utils.js";
import { backTopMixin } from "common/mixin.js";
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
    DetailBottomBar,
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
  mixins: [backTopMixin],
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
      this.themeTopYs = [0];
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("detailItemImageLoad", () => {
      this.refresh();
    });
  },
  methods: {
    detailImageLoad() {
      // this.$refs.scroll.refresh();
      this.refresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
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
      // 或者可以在数据最后加一个Number.MAX_VALUE 然后遍历数据前n-1个 判断区间即可

      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // 1.获取商品信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;

      // 2.添加到购物车
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product);
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
  height: calc(100% - 44px - 49px);
}
</style>