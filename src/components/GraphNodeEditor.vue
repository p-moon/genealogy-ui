<template>
  <div>
    <el-drawer v-model="drawer" direction="rtl" size="30%">
      <template #header>
        <h4>编辑选中节点</h4>
      </template>
      <template #default>
        <div>
          <el-form
            label-width="100px"
            :model="currentNode"
            style="max-width: 460px"
          >
            <el-form-item label="id">
              <el-input v-model="currentNode.id" disabled />
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="currentNode.text" />
            </el-form-item>
            <el-form-item label="边框颜色">
              <el-color-picker v-model="currentNode.borderColor" size="large" />
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="currentNode.fontColor" size="large" />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
<!--          <el-button @click="cancelClick">cancel</el-button>-->
<!--          <el-button type="primary" @click="confirmClick">confirm</el-button>-->
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { ElNotification } from "element-plus";
import { createDefaultNode, Node } from "@/storage/model/Node";

export default defineComponent({
  name: "GraphNodeEditor",
  setup() {
    const drawer = ref<boolean>(false);
    let currentNode = ref<Node>(createDefaultNode());

    function cancelClick() {
      drawer.value = false;
    }

    function confirmClick(): void {
      drawer.value = false;
    }

    function showNodeEditor(node: Node): void {
      drawer.value = true;
      currentNode.value = node;
    }

    return {
      drawer,
      currentNode,
      cancelClick,
      confirmClick,
      showNodeEditor
    };
  }
});
</script>
<style scoped>

</style>
