<template>
  <div class="panel-container" v-if="isShowLinePanel" @click="hideLineEditor">
    <div v-bind:class="{ 'node-line-panel': true }" @click="isShowLinePanel=true"
         v-bind:style="{left: linePanelPosition.x + 'px',top: linePanelPosition.y + 'px'}">
      <el-form
        label-width="100px"
        :model="currentLine"
        style="max-width: 460px"
      >
        <el-form-item label="起始节点">
          <el-select v-model="currentLine.from" class="m-2" placeholder="Select" size="large"
                     @change="onLinePointChange" disabled>
            <el-option
              v-for="item in store.state.graph_json_data.nodes"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指向节点">
          <el-select v-model="currentLine.to" class="m-2" placeholder="Select" size="large"
                     @change="onLinePointChange" disabled>
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
          <el-slider v-model="currentLine.lineWidth" :step="1" :max="100" />
        </el-form-item>
        <el-form-item label="线条颜色">
          <ColorPicker v-model="currentLine.color" :colors="store.state.normal_color" />
        </el-form-item>
        <el-form-item label="线条文字颜色">
          <ColorPicker v-model="currentLine.fontColor" :colors="store.state.normal_color" />
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Line } from "@/storage/model/Line";
import { store } from "@/store";
import { mapGetters } from "vuex";
import { relationGraphDelegate } from "@/storage/RelationGraphDelegate";
import { RGLink } from "relation-graph/vue3/RelationGraph";
import ColorPicker from "@/components/ColorPicker.vue";
import { createDefaultNode, Node } from "@/storage/model/Node";

export default defineComponent({
  name: "GraphLineEditor",
  components: { ColorPicker },
  ...mapGetters({
    nodeList: "getNodeList"
  }),
  setup() {
    // const nodeList = computed<Node[]>(() => store.state.graph_json_data.nodes);
    let currentLine = ref<Line>({ from: "", to: "", text: "节点关系描述" });
    const isShowLinePanel = ref(false); // 是否展示操作菜单
    const linePanelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置

    function onLinePointChange(id: string) {
      relationGraphDelegate.refresh();
    }

    function showLineEditor(line: Line, link: RGLink, x: number, y: number): void {
      linePanelPosition.value.x = x;
      linePanelPosition.value.y = y;
      isShowLinePanel.value = true;
      currentLine.value = line;
    }

    function hideLineEditor(event: MouseEvent|TouchEvent): void {
      // isShowLinePanel.value = false;
      if (event.target === event.currentTarget) {
        isShowLinePanel.value = false;
      }
    }

    return {
      store,
      currentLine,
      isShowLinePanel,
      linePanelPosition,
      showLineEditor,
      hideLineEditor,
      onLinePointChange
    };
  }
});
</script>
<style scoped>
.node-line-panel {
    padding: 10px;
    background-color: #ffffff;
    border: #eeeeee solid 1px;
    position: absolute;
    z-index: 999;
    overflow-y: auto;
    height: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.panel-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    z-index: 999;
}
</style>
