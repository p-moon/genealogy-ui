/* eslint-disable */
<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
          ref="seeksRelationGraph"
          :options="graphOptions"
          :on-node-click="onNodeClick"
          :on-line-click="onLineClick"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RelationGraph from "relation-graph/vue3";

export default {
  name: "HomeView",
  components: {
    RelationGraph,
  },
  data() {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: "border",
        // 这里可以参考"Graph 图谱"中的参数进行设置:http://relation-graph.com/#/docs/graph
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  watch: {
    '$store.state.graph_json_data': {
      handler(newValue, oldValue) {
        this.$refs.seeksRelationGraph.setJsonData(newValue, (seeksRGGraph) => {});
      },
      deep: true
    }
  },
  methods: {
    showSeeksGraph() {
      this.$refs.seeksRelationGraph.setJsonData(
          this.$store.state.graph_json_data,
          // eslint-disable-next-line no-unused-vars
          (seeksRGGraph) => {
            // Called when the relation-graph is completed
          }
      );
    },
    // eslint-disable-next-line no-unused-vars
    onNodeClick(nodeObject, $event) {
      console.log("onNodeClick:", nodeObject);
    },
    // eslint-disable-next-line no-unused-vars
    onLineClick(linkObject, $event) {
      console.log("onLineClick:", linkObject);
    },
  },
};
</script>
