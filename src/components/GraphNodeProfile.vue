<template>
  <GraphNodeEditor ref="graphNodeEditor"></GraphNodeEditor>
  <div v-if="isShowNodeMenuPanel" v-bind:class="{ 'node-menu-panel': true }"
       v-bind:style="{left: nodeMenuPanelPosition.x + 'px',top: nodeMenuPanelPosition.y + 'px'}">
    <strong>对这个节点进行操作：</strong>
    <div>
      <el-form
        label-width="100px"
        :model="currentNode"
        style="max-width: 460px"
      >
        <el-form-item label="id">
          <el-input v-model="currentNode.id" disabled />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="currentNode.text" />
        </el-form-item>
        <el-form-item label="颜色">
          <ColorPicker v-model="currentNode.color" :colors="store.state.normal_color"/>
        </el-form-item>
        <el-form-item label="边框颜色">
          <ColorPicker v-model="currentNode.borderColor" :colors="store.state.normal_color"/>
        </el-form-item>
        <el-form-item label="字体颜色">
          <ColorPicker v-model="currentNode.fontColor" :colors="store.state.normal_color"/>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="currentNode.opacity" :step="1" :max="100" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="currentNode.data!.avatar" placeholder="请输入图片地址">
            <template #prepend>
              <el-avatar shape="square" size="default" :src="currentNode.data!.avatar" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    &nbsp;
    <el-dropdown size="default" split-button type="primary" @click.stop="addChildNode">
      添加子节点
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="node in store.state.graph_json_data.nodes" @click.stop="addLine(currentNode, node)">
            {{ node.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    &nbsp;
    <el-dropdown size="default" split-button type="primary" @click.stop="addParentNode">
      添加父节点
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="node in store.state.graph_json_data.nodes" @click.stop="addLine(node, currentNode)">
            {{ node.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    &nbsp;
    <el-button type="danger" @click.stop="deleteNode">
      <el-icon>
        <DeleteFilled />
      </el-icon>
      删除
    </el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import { Line } from "@/storage/model/Line";
import { RelationGraphData, State, store } from "@/store";
import { createDefaultNode, Node } from "@/storage/model/Node";
import { CircleCloseFilled, CirclePlusFilled, DeleteFilled, Edit, Plus } from "@element-plus/icons-vue";
import { relationGraphDelegate } from "@/storage/RelationGraphDelegate";
import GraphNodeEditor from "@/components/GraphNodeEditor.vue";
import { Ref } from "vue-property-decorator";
import type { UploadProps, UploadFile, UploadFiles } from "element-plus";
import ColorPicker from "@/components/ColorPicker.vue";
export default defineComponent({
  name: "GraphNodeProfile",
  components: { GraphNodeEditor, Edit, CircleCloseFilled, DeleteFilled, CirclePlusFilled, ColorPicker},

  setup() {
    const isShowNodeMenuPanel = ref(false); // 是否展示操作菜单
    let currentNode = ref<Node>(createDefaultNode()); // 当前操作的节点
    const nodeMenuPanelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置
    let graphNodeEditor = ref<InstanceType<typeof GraphNodeEditor>>();

    function modifyPanelPosition(x: number, y: number) {
      nodeMenuPanelPosition.value.x = x;
      nodeMenuPanelPosition.value.y = y;
    }

    function showNodeProfile(node: Node, x: number, y: number) {
      isShowNodeMenuPanel.value = true;
      nodeMenuPanelPosition.value.x = x;
      nodeMenuPanelPosition.value.y = y;
      currentNode.value = node;
    }

    function hideNodeProfile() {
      isShowNodeMenuPanel.value = false;
    }

    function deleteNode() {
      relationGraphDelegate.deleteNode(currentNode.value);
      hideNodeProfile();
    }

    function addLine(from: Node, to: Node) {
      const line: Line = { from: from.id, to: to.id, text: "节点关系描述" };
      relationGraphDelegate.addLine(line); // 添加当前节点到新增子节点的关系表示
      hideNodeProfile();
    }

    function addChildNode(): Node {
      const newNode: Node = createDefaultNode();
      relationGraphDelegate.addGraphNode(newNode);
      addLine(currentNode.value, newNode);
      // showEditorDrawer(newNode);
      return newNode;
    }

    function addParentNode(): Node {
      const newNode: Node = createDefaultNode();
      relationGraphDelegate.addGraphNode(newNode);
      addLine(newNode, currentNode.value);
      return newNode;
    }

    function editNode(): Node {
      showEditorDrawer(currentNode.value);
      return currentNode.value;
    }

    function showEditorDrawer(node: Node) {
      isShowNodeMenuPanel.value = false;
      console.log("showNodeEditor", graphNodeEditor.value);
      graphNodeEditor.value?.showNodeEditor(node);
    }

    return {
      store,
      currentNode,
      nodeMenuPanelPosition,
      isShowNodeMenuPanel,
      graphNodeEditor,
      deleteNode,
      addChildNode,
      addParentNode,
      editNode,
      hideNodeProfile,
      showNodeProfile,
      addLine,
      modifyPanelPosition
    };
  }
});
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

.node-avatar {
    width: 50px;
    height: 50px;
}
</style>
