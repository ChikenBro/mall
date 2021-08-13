export const testMixin = {
  data() {
    return {
      des: '数据也可以混入哦',
    }
  },
  mounted() {
    console.log(`我是混入对象hhh`, this.des);
  }
}

import BackTop from "components/content/backTop/BackTop.vue";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
  }
}
