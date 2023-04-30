<template>
  <div>
    <el-drawer v-model="drawer" direction="rtl" size="30%">
      <template #header>
        <h4>编辑当前节点线段</h4>
      </template>
      <template #default>
        <div>
          <el-form
            label-width="100px"
            :model="currentLine"
            style="max-width: 460px"
          >
            <el-form-item label="起始节点">
              <el-select v-model="currentLine.from" class="m-2" placeholder="Select" size="large">
                <el-option
                  v-for="item in store.state.graph_json_data.nodes"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="指向节点">
              <el-select v-model="currentLine.to" class="m-2" placeholder="Select" size="large">
                <el-option
                  v-for="item in store.state.graph_json_data.nodes"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="currentLine.text" />
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
import { Line } from "@/storage/model/Line";
import { RelationGraphData, State, store } from "@/store";
import { Node } from "@/storage/model/Node";
import { mapGetters, mapState } from "vuex";
import { useStore } from "vuex";
import { RGJsonData } from "relation-graph/vue3";
import { RGLink } from "relation-graph/vue3/RelationGraph";

export default defineComponent({
  name: "GraphLineEditor",
  ...mapGetters({
    nodeList: "getNodeList",
  }),

  setup() {
    const store = useStore<State>();
    // const nodeList = computed<Node[]>(() => store.state.graph_json_data.nodes);
    const drawer = ref<boolean>(false);
    const fromNode = ref<Node>();
    const toNode = ref<Node>();
    let currentLine = ref<Line>({from: "", to: "", text: "节点关系描述"});

    function cancelClick() {
      drawer.value = false;
    }

    function confirmClick(): void {
      drawer.value = false;
    }

    function showLineEditor(line: Line, link:RGLink): void {
      drawer.value = true;
      currentLine.value = line;
    }

    return {
      drawer,
      store,
      currentLine,
      cancelClick,
      confirmClick,
      showLineEditor,
    };
  }
});
</script>
<style scoped>

</style>
