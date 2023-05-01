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
            <el-form-item label="线条粗细">
              <el-slider v-model="currentLine.lineWidth" :step="1" :max="100"/>
            </el-form-item>
            <el-form-item label="线条颜色">
              <el-color-picker v-model="currentLine.color" size="large" />
            </el-form-item>
            <el-form-item label="线条文字颜色">
              <el-color-picker v-model="currentLine.fontColor" size="large" />
            </el-form-item>
            <el-form-item label="是否隐藏箭头">
              <el-switch
                v-model="currentLine.isHideArrow"
                inline-prompt
                active-text="隐藏"
                inactive-text="不隐藏"
              />
            </el-form-item>
            <el-form-item label="是否显示起始箭头" v-if="!currentLine.isHideArrow">
              <el-switch
                v-model="currentLine.showStartArrow"
                inline-prompt
                active-text="显示"
                inactive-text="不显示"
              />
            </el-form-item>
            <el-form-item label="是否显示结束箭头" v-if="!currentLine.isHideArrow">
              <el-switch
                v-model="currentLine.showEndArrow"
                inline-prompt
                active-text="显示"
                inactive-text="不显示"
              />
            </el-form-item>
            <el-form-item label="文字是否沿着连线走">
              <el-switch
                v-model="currentLine.useTextPath"
                inline-prompt
                active-text="沿着连线走"
                inactive-text="不沿着连线走"
              />
            </el-form-item>
            <el-form-item label="线条形状">
              <el-select v-model="currentLine.lineShape" class="m-2" placeholder="Select" size="large">
                <el-option
                  v-for="item in [{label:'直线', value:1}, {label:'简洁', value:2},{label:'生动', value:3},{label:'折线', value:4},{label:'折线2', value:5},{label:'折线3', value:6}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
import {defineComponent, ref, watch } from "vue";
import { Line } from "@/storage/model/Line";
import {store } from "@/store";
import { mapGetters } from "vuex";
import { RGLink } from "relation-graph/vue3/RelationGraph";

export default defineComponent({
  name: "GraphLineEditor",
  ...mapGetters({
    nodeList: "getNodeList",
  }),
  setup() {
    // const nodeList = computed<Node[]>(() => store.state.graph_json_data.nodes);
    const drawer = ref<boolean>(false);
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
