<template>
  <div>
    <div ref="myPage" style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">
      <RelationGraph ref="relationGraph" :options="options" :onNodeClick="onNodeClick">
        <template #node="{node}">
          <div style="padding-top: 20px">{{ node.text }}</div>
        </template>
      </RelationGraph>
    </div>
    <div v-if="isShowNodeMenuPanel" v-bind:class="{ 'node-menu-panel': true }"
         v-bind:style="{left: nodeMenuPanelPosition.x + 'px',top: nodeMenuPanelPosition.y + 'px'}">
      <div>对这个节点进行操作：</div>
      <el-button type="primary" @click.stop="editNode">
        <el-icon>
          <Edit />
        </el-icon>
        编辑
      </el-button>
      <el-button type="primary" @click.stop="addNode">
        <el-icon>
          <CirclePlusFilled />
        </el-icon>
        添加
      </el-button>
      <el-button type="danger" @click.stop="deleteNode">
        <el-icon>
          <DeleteFilled />
        </el-icon>
        删除
      </el-button>
      <el-button type="primary" @click.stop="closeMenu">
        <el-icon>
          <CircleCloseFilled />
        </el-icon>
        关闭
      </el-button>
    </div>
    <GraphEditDrawer ref="graphDrawer"></GraphEditDrawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, methods, watch } from "vue";
import RelationGraph, { RGJsonData } from "relation-graph/vue3";
import { RelationGraphData, store } from "@/store";
import { ElNotification } from "element-plus";
import { Node } from "@/storage/model/Node";
import { Line } from "@/storage/model/Line";
import { DeleteFilled, Edit, CirclePlusFilled, CircleCloseFilled } from "@element-plus/icons-vue";
import GraphEditDrawer from "@/components/GraphEditDrawer";
import { relationGraphStorage } from "@/storage/RelationGraphStorge";
import relationGraphConfig from "@/config/RelationGraphConfig";

watch(store.state.graph_json_data, (newVal: RelationGraphData, oldVal: RelationGraphData) => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
}, { deep: true });

onMounted(() => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
});

const myPage = ref<HTMLElement>();
const relationGraph = ref<RelationGraph>();
const graphDrawer = ref<InstanceType<typeof GraphEditDrawer>>();

const options = relationGraphConfig;

const isShowNodeMenuPanel = ref(false); // 是否展示操作菜单
let currentNode: Node; // 当前操作的节点
const nodeMenuPanelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置

function onNodeClick(node: Node, $event: MouseEvent | TouchEvent) {
  currentNode = node;
  const _base_position = myPage.value.getBoundingClientRect();
  isShowNodeMenuPanel.value = true;
  nodeMenuPanelPosition.value.x = $event.clientX - _base_position.x;
  nodeMenuPanelPosition.value.y = $event.clientY - _base_position.y;
  console.log("showNodeMenus:", nodeMenuPanelPosition.value, _base_position);
}

function closeMenu() {
  isShowNodeMenuPanel.value = false;
}

function doAction(message: string) {
  ElNotification.success({
    title: "Success",
    message: message,
    offset: 100
  });
  graphDrawer.value?.showDrawer();
  isShowNodeMenuPanel.value = false;
}

function showEditorDrawer(node: Node) {
  graphDrawer.value?.showDrawer(node);
}

function deleteNode() {
  relationGraphStorage.deleteNode(currentNode);
}

function addNode(): Node {
  const newNode:Node = {id: 'new-node', text: 'new-node', borderColor: "yellow"};
  relationGraphStorage.addGraphNode(newNode);
  const line:Line = {from: currentNode.id, to: newNode.id, text: "节点关系描述"};
  relationGraphStorage.addLine(line)
  return newNode;
}

function editNode():Node {
  return currentNode;
}

function buildShowData(graphData: RelationGraphData): RelationGraphData {
  graphData.nodes.forEach((node: Node) => {
  });
  return graphData;
}

</script>
<style scoped>
.node-menu-panel {
    padding: 10px;
    background-color: #ffffff;
    border: #eeeeee solid 1px;
    box-shadow: 0 0 8px #cccccc;
    position: absolute;
    z-index: 999;
}

</style>
