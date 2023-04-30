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
            <el-form-item label="背景颜色">
              <el-color-picker v-model="currentNode.color" size="large" />
            </el-form-item>
            <el-form-item label="透明度">
              <el-slider v-model="currentNode.opacity" :step="1" :max="100"/>
            </el-form-item>
            <el-form-item label="节点宽度">
              <el-input-number v-model="currentNode.width" :step="1" :max="1000"/>
            </el-form-item>
            <el-form-item label="节点高度">
              <el-input-number v-model="currentNode.height" :step="1" :max="1000"/>
            </el-form-item>
            <el-form-item label="节点形状">
              <el-select v-model="currentNode.nodeShape" class="m-2" placeholder="Select" size="large">
                <el-option
                  v-for="item in [{label:'圆形', value:0}, {label:'矩形', value:1}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="自定义节点内部属性">
              <el-input
                v-model="currentNode.innerHTML"
                :rows="5"
                type="textarea"
                placeholder="用HTML自定义节点内部的内容，当此属性不为空时，text属性将失效"
              />

            </el-form-item>
            <el-form-item label="自定义节点">
              <el-input
                v-model="currentNode.html"
                :rows="5"
                type="textarea"
                placeholder="用HTML自定义节点，当此属性不为空时，节点的所有样式属性将失效"
              />
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
import { Node } from "@/storage/model/Node";

export default defineComponent({
  name: "GraphNodeEditor",
  setup() {
    const drawer = ref<boolean>(false);
    let currentNode = ref<Node>({ id: "", text: "" });

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
