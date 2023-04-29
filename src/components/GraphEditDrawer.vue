<template>
  <el-drawer v-model="drawer" direction="rtl" size="30%">
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
import { Node } from "@/storage/model/Node";

export default defineComponent({
  name: 'GraphEditDrawer',
  setup() {
    const drawer = ref<boolean>(false);
    function cancelClick() {
      drawer.value = false
      console.log("======> call cancelClick", drawer)
    }
    function confirmClick():void {
      drawer.value = false
      console.log("======> call confirmClick", drawer)
    }

    function showDrawer(node: Node): void {
      drawer.value = true;
      ElNotification.success({
        title: "Success",
        message: "展示编辑页",
        offset: 100
      });
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
