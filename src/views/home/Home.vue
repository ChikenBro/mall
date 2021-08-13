<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlCopy"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐板块 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- 控制栏 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <!-- 详情商品 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 监听原生事件时 组件必须加上修饰符.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop.vue";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultiData, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";
import { testMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      allGoodsType: ["pop", "new", "sell"],
      currentType: "pop",
      isShowBackTop: true,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  mixins: [testMixin],
  created() {
    // 1.请求多个数据
    this.getHomeMultiData();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听下拉商品图片加载完成
    // 如果在created里绑定的话 可能$refs组件还未生成

    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("homeItemImageLoad", this.itemImgListener);
  },
  activated() {
    // console.log(this.saveY);
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);

    // 取消监听
    this.$bus.$off("homeItemImageLoad", this.itemImgListener);
  },
  methods: {
    //事件监听
    tabClick(index) {
      this.currentType = this.allGoodsType[index];
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlCopy.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个$el属性:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    // 网络请求
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}

.home-nav {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; 
  z-index: 9999; */

  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  /* height: 300px; */
  overflow: hidden;
}

.tab-control {
  position: relative;
  top: -1px;
  z-index: 9999;
}
</style>