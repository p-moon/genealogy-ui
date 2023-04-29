<template>
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        哈哈哈
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: 'GraphEditDrawer',
  setup() {
    const drawer = ref<boolean>(false);
    const cancelClick = () => {
      drawer.value = false
      console.log("======> call cancelClick", drawer)
    }
    const confirmClick = () => {
      drawer.value = false
      console.log("======> call confirmClick", drawer)
    }

    const showDrawer = () => {
      drawer.value = true;
      ElNotification.success({
        title: "Success",
        message: "展示编辑页",
        offset: 100
      });
      console.log("======> call showDrawer", drawer)
    }

    return {
      drawer,
      cancelClick,
      confirmClick,
      showDrawer,
    }
  },
})
</script>
