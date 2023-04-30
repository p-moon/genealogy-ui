<template>
  <div>
    <div ref="myPage" class="page-content" @click="closeMenu">
      <RelationGraph ref="relationGraph" :options="options" :onNodeClick="onNodeClick" :onLineClick="onLineClick">
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
    <GraphNodeEditor ref="graphNodeEditor"></GraphNodeEditor>
    <GraphLineEditor ref="graphLineEditor"></GraphLineEditor>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import RelationGraph, { RGJsonData } from "relation-graph/vue3";
import { RelationGraphData, store } from "@/store";
import { Node } from "@/storage/model/Node";
import { Line } from "@/storage/model/Line";
import { DeleteFilled, Edit, CirclePlusFilled, CircleCloseFilled } from "@element-plus/icons-vue";
import { relationGraphStorage } from "@/storage/RelationGraphStorge";
import relationGraphConfig from "@/config/RelationGraphConfig";
import GraphNodeEditor from "@/components/GraphNodeEditor.vue";
import GraphLineEditor from "@/components/GraphLineEditor.vue";
import { RGLine, RGLink } from "relation-graph/vue3/RelationGraph";

watch(store.state.graph_json_data, (newVal: RelationGraphData, oldVal: RelationGraphData) => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value?.setJsonData(graphJsonData, true);
}, { deep: true });

onMounted(() => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value?.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
});

const myPage = ref<HTMLElement>();
const relationGraph = ref<RelationGraph>();
const graphNodeEditor = ref<InstanceType<typeof GraphNodeEditor>>();
const graphLineEditor = ref<InstanceType<typeof GraphLineEditor>>();

const options = relationGraphConfig;

const isShowNodeMenuPanel = ref(false); // 是否展示操作菜单
let currentNode: Node; // 当前操作的节点
const nodeMenuPanelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置

function onNodeClick(node: Node, $event: MouseEvent | TouchEvent):boolean {
  currentNode = node;
  const _base_position = myPage.value?.getBoundingClientRect();
  isShowNodeMenuPanel.value = true;
  nodeMenuPanelPosition.value.x = $event?.clientX - _base_position.x;
  nodeMenuPanelPosition.value.y = $event?.clientY - _base_position.y;
  return true;
}

function onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent):boolean {
  graphLineEditor.value?.showLineEditor(line, link);
  return true;
}

function closeMenu() {
  isShowNodeMenuPanel.value = false;
}

function showEditorDrawer(node: Node) {
  isShowNodeMenuPanel.value = false;
  graphNodeEditor.value?.showNodeEditor(node);
}

function deleteNode() {
  relationGraphStorage.deleteNode(currentNode);
}

function addNode(): Node {
  const newNode:Node = {id: 'new-node', text: 'new-node', borderColor: "yellow"};
  relationGraphStorage.addGraphNode(newNode);
  const line:Line = {from: currentNode.id, to: newNode.id, text: "节点关系描述"};
  relationGraphStorage.addLine(line); // 添加当前节点到新增子节点的关系表示
  // showEditorDrawer(newNode);
  return newNode;
}

function editNode():Node {
  showEditorDrawer(currentNode);
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
.page-content {
    margin-right: 300px;
    border: #efefef solid 1px;
    height: calc(100vh - 100px);
    width: 100%;
}
</style>
