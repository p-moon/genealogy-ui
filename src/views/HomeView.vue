<template>
  <div>
    <div ref="myPage" class="page-content" @click="closeMenu">
      <RelationGraph ref="relationGraph" :options="options" :onNodeClick="onNodeClick" :onLineClick="onLineClick">
        <template #node="{node}">
          <GraphNodeInfo :node="node"></GraphNodeInfo>
        </template>
      </RelationGraph>
    </div>
    <GraphNodeProfile ref="graphNodeProfile"></GraphNodeProfile>
    <GraphLineEditor ref="graphLineEditor"></GraphLineEditor>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import RelationGraph, { RGJsonData } from "relation-graph/vue3";
import { RelationGraphData, store } from "@/store";
import { Node } from "@/storage/model/Node";
import relationGraphConfig from "@/config/RelationGraphConfig";
import GraphNodeProfile from "@/components/GraphNodeProfile.vue";
import GraphNodeInfo from "@/components/GraphNodeInfo.vue";
import GraphLineEditor from "@/components/GraphLineEditor.vue";
import { RGLine, RGLink } from "relation-graph/vue3/RelationGraph";

watch(store.state.graph_json_data, (newVal: RelationGraphData, oldVal: RelationGraphData) => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value?.setJsonData(graphJsonData, true);
  relationGraph.value?.updateView();
}, { deep: true });

onMounted(() => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value?.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
});

const myPage = ref<HTMLElement>();
const relationGraph = ref<RelationGraph>();
const graphLineEditor = ref<InstanceType<typeof GraphLineEditor>>();
const graphNodeProfile = ref<InstanceType<typeof graphNodeProfile>>();

const options = relationGraphConfig;

let currentNode: Node; // 当前操作的节点
const nodeMenuPanelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置

function onNodeClick(node: Node, $event: MouseEvent | TouchEvent):boolean {
  currentNode = node;
  const _base_position = myPage.value?.getBoundingClientRect();
  let x = $event?.clientX - _base_position.x;
  let y = $event?.clientY - _base_position.y;
  graphNodeProfile.value?.showNodeProfile(currentNode, x, y);
  return true;
}

function onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent):boolean {
  graphLineEditor.value?.showLineEditor(line, link);
  return true;
}

function closeMenu() {
  graphNodeProfile.value.hideNodeProfile()
}

function buildShowData(graphData: RelationGraphData): RelationGraphData {
  graphData.nodes.forEach((node: Node) => {
  });
  return graphData;
}

</script>
<style scoped>
.page-content {
    margin-right: 300px;
    border: #efefef solid 1px;
    height: calc(100vh - 100px);
    width: 100%;
}
</style>
