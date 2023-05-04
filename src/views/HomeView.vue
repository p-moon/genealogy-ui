<template>
  <div>
    <div ref="myPage" class="page-content" @click="closeMenu" @mousemove="handleMouseMove">
      <RelationGraph ref="relationGraph" :options="options" :onNodeClick="onNodeClick" :onLineClick="onLineClick">
        <template #node="{node}" v-slot="node">
          <GraphNodeInfo :node="node"></GraphNodeInfo>
        </template>
<!--        <template #miniToolBar v-slot="miniToolBar">-->
<!--          <GraphMiniToolBar />-->
<!--        </template>-->
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
import RelationGraphMenu from "@/components/RelationGraphMenu.vue";
import GraphLineEditor from "@/components/GraphLineEditor.vue";
import { RGLine, RGLink } from "relation-graph/vue3/RelationGraph";
import { relationGraphDelegate } from "@/storage/RelationGraphDelegate";

const myPage = ref<HTMLElement>();
const relationGraph = ref<RelationGraph>();
const graphLineEditor = ref<InstanceType<typeof GraphLineEditor>>();
const graphNodeProfile = ref<InstanceType<typeof GraphNodeProfile>>();

const options = relationGraphConfig;

function handleMouseMove($event: MouseEvent | TouchEvent) {
}

function onNodeClick(node: Node, $event: MouseEvent | TouchEvent): boolean {
  const _base_position = myPage.value?.getBoundingClientRect();
  let x = 0, y = 0;
  if ("clientX" in $event) {
    x = $event?.clientX - _base_position.x;
  }
  if ("clientY" in $event) {
    y = $event?.clientY - _base_position.y;
  }
  graphNodeProfile.value?.showNodeProfile(node, x, y);
  return true;
}

function onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent): boolean {
  graphLineEditor.value?.showLineEditor(line, link);
  return true;
}

function closeMenu() {
  graphNodeProfile.value?.hideNodeProfile();
}

function buildShowData(graphData: RelationGraphData): RelationGraphData {
  graphData.nodes.forEach((node: Node) => {
  });
  return graphData;
}

onMounted(() => {
  const graphJsonData: RGJsonData = buildShowData(store.state.graph_json_data);
  relationGraph.value?.getInstance()?.setDefaultJunctionPoint("border"); // 连接点默认使用 边缘
  relationGraphDelegate.setRelationGraphView(relationGraph);
  store.dispatch("asyncSetRelationGraph", relationGraph);
  relationGraph.value?.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
});

window.setInterval(() => {
  relationGraphDelegate.saveRelationGraph();
}, 3000);

</script>
<style scoped>
.page-content {
    margin-right: 300px;
    border: #efefef solid 1px;
    height: calc(100vh - 100px);
    width: 100%;
}
</style>
