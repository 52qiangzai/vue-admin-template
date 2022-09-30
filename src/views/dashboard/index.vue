<template>
  <div class="dashboard-container">
    <el-card class="box-card" style="z-index: -1111">
      <div class="dashboard-text">name: {{ name }}</div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
