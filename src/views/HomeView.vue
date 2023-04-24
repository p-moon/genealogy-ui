<template>
  <div>
    <div style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">
      <RelationGraph ref="relationGraph$" :options="options">
        <template #node="{node}">
          <div style="padding-top:20px;">节点：{{ node.text }}</div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, methods, watch} from "vue";
import RelationGraph, { RGJsonData } from "relation-graph/vue3";
import store from "../store/index";

const relationGraph$ = ref<RelationGraph>();
const options = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultJunctionPoint: "border",
  allowAutoLayoutIfSupport: true,
  backgrounImageNoRepeat: true,
  layouts: [
    {
      label: "中心",
      layoutName: "center",
      layoutClassName: "seeks-layout-center",
      distance_coefficient: 1,
      downloadImageFileName: "genealogy",
      defaultJunctionPoint: "border"
    },
    {
      label: "树状",
      layoutName: "tree",
      layoutClassName: "seeks-layout-center",
      defaultJunctionPoint: "border",
      defaultLineShape: 4
    },
    {
      label: "自动",
      layoutName: "force",
      layoutClassName: "seeks-layout-center",
      defaultExpandHolderPosition: "hide",
      defaultJunctionPoint: "border"
    }
  ]

};
watch(store.state.graph_json_data, (newVal, oldVal) => {
  const graphJsonData: RGJsonData = store.state.graph_json_data;
  relationGraph$.value.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
}, { deep: true });

onMounted(() => {
  const graphJsonData: RGJsonData = store.state.graph_json_data;
  relationGraph$.value.setJsonData(graphJsonData, () => {
    console.log("relationGraph ready!");
  });
});
</script>
