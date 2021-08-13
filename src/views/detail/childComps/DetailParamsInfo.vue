<template>
  <div v-if="Object.keys(paramsInfo).length !== 0" class="params-wrap">
    <img :src="paramsInfo.image" alt="" />

    <div v-for="item in paramsInfo.sizes">
      <div v-for="list in item" class="flex">
        <div v-for="listitem in list" class="rule-list-item">
          {{ listitem }}
        </div>
      </div>
    </div>

    <div
      v-for="(info, index) in paramsInfo.infos"
      :key="index"
      class="flex info-list-wrap"
    >
      <div class="info-list-key">{{ info.key }}</div>
      <div class="info-list-value">{{ info.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

.params-wrap {
  background: #fff;
  border-top: 4px solid #ececec;
  border-bottom: 4px solid #ececec;
}

.rule-list-item {
  font-size: 12px;
  width: 20%;
  border-bottom: 1px solid #ececec;
  padding: 10px 4px;
}

.info-list-wrap {
  font-size: 14px;
  border-bottom: 1px solid #ececec;
  padding: 10px 4px;
  line-height: 20px;
}

.info-list-key {
  flex: 1;
}

.info-list-value {
  flex: 4;
  color: var(--color-tint);
}
</style>