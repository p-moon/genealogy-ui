<template>
  <el-drawer v-model="drawer" direction="rtl" size="30%">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <el-form
          label-width="100px"
          :model="currentNode"
          style="max-width: 460px"
        >
          <el-form-item label="Name">
            <el-input v-model="currentNode.id" disabled />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-input v-model="currentNode.text" />
          </el-form-item>
        </el-form>
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
import { defineComponent, Ref, ref } from "vue";
import { ElNotification } from "element-plus";
import { Node } from "@/storage/model/Node";

export default defineComponent({
  name: "GraphEditDrawer",
  setup() {
    const drawer = ref<boolean>(false);
    let currentNode = ref<Node>({ id: "", text: "" });

    function cancelClick() {
      drawer.value = false;
    }

    function confirmClick(): void {
      drawer.value = false;
    }

    function showDrawer(node: Node): void {
      drawer.value = true;
      currentNode.value = node;
      console.log("showDrawer", node);
    }

    return {
      drawer,
      currentNode,
      cancelClick,
      confirmClick,
      showDrawer
    };
  }
});
</script>
