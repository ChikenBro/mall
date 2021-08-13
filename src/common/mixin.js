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
