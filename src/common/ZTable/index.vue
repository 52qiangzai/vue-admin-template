<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ZTable",
  props: {
    tableData: Object,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
