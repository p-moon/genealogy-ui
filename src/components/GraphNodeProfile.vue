<template>
  <GraphNodeEditor ref="graphNodeEditor"></GraphNodeEditor>
  <div v-if="isShowNodeMenuPanel" v-bind:class="{ 'node-menu-panel': true }"
       v-bind:style="{left: nodeMenuPanelPosition.x + 'px',top: nodeMenuPanelPosition.y + 'px'}">
    <div>对这个节点进行操作：</div>
    <el-button type="primary" @click.stop="editNode">
      <el-icon>
        <Edit />
      </el-icon>
      编辑
    </el-button>
    <el-button type="primary" @click.stop="addChildNode">
      <el-icon>
        <CirclePlusFilled />
      </el-icon>
      添加子节点
    </el-button>
    <el-button type="primary" @click.stop="addParentNode">
      <el-icon>
        <CirclePlusFilled />
      </el-icon>
      添加父节点
    </el-button>
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
import { Node } from "@/storage/model/Node";
import { CircleCloseFilled, CirclePlusFilled, DeleteFilled, Edit } from "@element-plus/icons-vue";
import { relationGraphStorage } from "@/storage/RelationGraphStorge";
import GraphNodeEditor from "@/components/GraphNodeEditor.vue";

export default defineComponent({
  name: "GraphNodeProfile",
  components: { GraphNodeEditor, Edit, CircleCloseFilled, DeleteFilled, CirclePlusFilled },

  setup() {
    const isShowNodeMenuPanel = ref(false); // 是否展示操作菜单
    let currentNode: Node = { id: "", text: "" }; // 当前操作的节点
    const nodeMenuPanelPosition = ref({ x: 0, y: 0 }); // 操作菜单位置
    let graphNodeEditor = ref<InstanceType<typeof GraphNodeEditor>>();

    function showNodeProfile(node: Node, x: number, y: number) {
      isShowNodeMenuPanel.value = true;
      nodeMenuPanelPosition.value.x = x;
      nodeMenuPanelPosition.value.y = y;
      currentNode = node;
    }

    function hideNodeProfile() {
      isShowNodeMenuPanel.value = false;
    }

    function deleteNode() {
      relationGraphStorage.deleteNode(currentNode);
    }

    function addChildNode(): Node {
      const newNode: Node = { id: "new-node", text: "new-node", borderColor: "yellow" };
      relationGraphStorage.addGraphNode(newNode);
      const line: Line = { from: currentNode.id, to: newNode.id, text: "节点关系描述" };
      relationGraphStorage.addLine(line); // 添加当前节点到新增子节点的关系表示
      // showEditorDrawer(newNode);
      hideNodeProfile();
      return newNode;
    }
    function addParentNode(): Node {
      const newNode: Node = { id: "new-node", text: "new-node", borderColor: "yellow" };
      relationGraphStorage.addGraphNode(newNode);
      const line: Line = { from: newNode.id, to: currentNode.id, text: "节点关系描述" };
      relationGraphStorage.addLine(line); // 添加当前节点到新增子节点的关系表示
      // showEditorDrawer(newNode);
      hideNodeProfile();
      return newNode;
    }

    function editNode(): Node {
      showEditorDrawer(currentNode);
      return currentNode;
    }

    function showEditorDrawer(node: Node) {
      isShowNodeMenuPanel.value = false;
      console.log("showNodeEditor", graphNodeEditor.value)
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
    };
  },
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
</style>
