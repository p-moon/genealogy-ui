<template>
  <div>
    <div ref="myPage" class="page-content" @click="closeMenu">
      <RelationGraphMenu></RelationGraphMenu>
      <RelationGraph ref="relationGraph" :options="options" :onNodeClick="onNodeClick" :onLineClick="onLineClick">
        <template #node="{node}" v-slot="node">
          <GraphNodeInfo :node="node"></GraphNodeInfo>
        </template>
        <template #miniToolBar v-slot="miniToolBar">
          <GraphMiniToolBar></GraphMiniToolBar>
        </template>
      </RelationGraph>
    </div>
    <GraphNodeProfile ref="graphNodeProfile"></GraphNodeProfile>
    <GraphLineEditor ref="graphLineEditor"></GraphLineEditor>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import RelationGraph, { RGJsonData } from "@/relation-graph/vue3";
import {store } from "@/store";
import { Node } from "@/storage/model/Node";
import relationGraphConfig from "@/config/RelationGraphConfig";
import GraphNodeProfile from "@/components/GraphNodeProfile";
import GraphNodeInfo from "@/components/GraphNodeInfo";
import RelationGraphMenu from "@/components/RelationGraphMenu.vue";
import GraphLineEditor from "@/components/GraphLineEditor";
import { RGLine, RGLink } from "@/relation-graph/vue3/RelationGraph";
import { relationGraphDelegate } from "@/storage/RelationGraphDelegate";
import GraphMiniToolBar from "@/components/GraphMiniToolBar";

const myPage = ref<HTMLElement>();
const relationGraph = ref<RelationGraph|undefined>();
const graphLineEditor = ref<InstanceType<typeof GraphLineEditor>>();
const graphNodeProfile = ref<InstanceType<typeof GraphNodeProfile>>();

const options = relationGraphConfig;

const panelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置

function handleMouseMove($event: MouseEvent | TouchEvent) {

}


function updatePanelPosition($event: MouseEvent | TouchEvent) {
  const _base_position = myPage.value?.getBoundingClientRect();
  let x = 0, y= 0 ;
  if($event instanceof MouseEvent) {
    x = $event!.pageX;
    y = $event!.pageY;
  }
  if($event instanceof TouchEvent) {
    $event.preventDefault();
    const touch:Touch = $event.touches[0];
    x = touch!.pageX;
    y = touch!.pageY;
  }
  panelPosition.value.x = x;
  panelPosition.value.y = y;
}

function onNodeClick(node: Node, $event: MouseEvent | TouchEvent): boolean {
  updatePanelPosition($event)
  graphNodeProfile.value?.showNodeProfile(node, panelPosition.value.x, panelPosition.value.y);
  return true;
}

function onLineClick(line: RGLine, link: RGLink, $event: MouseEvent | TouchEvent): boolean {
  updatePanelPosition($event)
  graphLineEditor.value?.showLineEditor(line, link, panelPosition.value.x, panelPosition.value.y);
  return true;
}

function closeMenu() {
  graphNodeProfile.value?.hideNodeProfile();
}

onMounted(() => {
  relationGraph.value?.getInstance()!.setDefaultJunctionPoint("border"); // 连接点默认使用 边缘
  relationGraphDelegate.setRelationGraphView(relationGraph);
  relationGraphDelegate.createNewRelationGraphFromStorage();
});

window.setInterval(() => {
  relationGraphDelegate.saveRelationGraphData();
}, 30000);

</script>
<style scoped>
.page-content {
    border: #efefef solid 1px;
    height: calc(100vh - 20px);
    width: 100%;
}
</style>
