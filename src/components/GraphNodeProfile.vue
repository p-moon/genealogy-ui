<template>
  <GraphNodeEditor ref="graphNodeEditor"></GraphNodeEditor>
  <div v-if="isShowNodeMenuPanel" v-bind:class="{ 'node-menu-panel': true }"
       v-bind:style="{left: nodeMenuPanelPosition.x + 'px',top: nodeMenuPanelPosition.y + 'px'}">
    <div>对这个节点进行操作：</div>
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
        <el-form-item label="边框颜色">
          <el-color-picker v-model="currentNode.borderColor" size="large" />
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-color-picker v-model="currentNode.fontColor" size="large" />
        </el-form-item>
        <!--            <el-form-item label="背景颜色">-->
        <!--              <el-color-picker v-model="currentNode.color" size="large" />-->
        <!--            </el-form-item>-->
        <el-form-item label="透明度">
          <el-slider v-model="currentNode.opacity" :step="1" :max="100"/>
        </el-form-item>
        <!--            <el-form-item label="节点宽度">-->
        <!--              <el-input-number v-model="currentNode.width" :step="1" :max="1000"/>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="节点高度">-->
        <!--              <el-input-number v-model="currentNode.height" :step="1" :max="1000"/>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="节点形状">-->
        <!--              <el-select v-model="currentNode.nodeShape" class="m-2" placeholder="Select" size="large">-->
        <!--                <el-option-->
        <!--                  v-for="item in [{label:'圆形', value:0}, {label:'矩形', value:1}]"-->
        <!--                  :key="item.value"-->
        <!--                  :label="item.label"-->
        <!--                  :value="item.value"-->
        <!--                />-->
        <!--              </el-select>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="自定义节点内部属性">-->
        <!--              <el-input-->
        <!--                v-model="currentNode.innerHTML"-->
        <!--                :rows="5"-->
        <!--                type="textarea"-->
        <!--                placeholder="用HTML自定义节点内部的内容，当此属性不为空时，text属性将失效"-->
        <!--              />-->

        <!--            </el-form-item>-->
        <!--            <el-form-item label="自定义节点">-->
        <!--              <el-input-->
        <!--                v-model="currentNode.html"-->
        <!--                :rows="5"-->
        <!--                type="textarea"-->
        <!--                placeholder="用HTML自定义节点，当此属性不为空时，节点的所有样式属性将失效"-->
        <!--              />-->
        <!--            </el-form-item>-->
      </el-form>
    </div>

<!--    <el-button type="primary" @click.stop="editNode">-->
<!--      <el-icon>-->
<!--        <Edit />-->
<!--      </el-icon>-->
<!--      编辑-->
<!--    </el-button>-->
    &nbsp;
    <el-dropdown size="default" split-button type="primary" @click.stop="addChildNode">
      添加子节点
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="node in store.state.graph_json_data.nodes" @click.stop="addLine(currentNode, node)">{{node.text}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    &nbsp;
    <el-dropdown size="default" split-button type="primary" @click.stop="addParentNode">
      添加父节点
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="node in store.state.graph_json_data.nodes" @click.stop="addLine(node, currentNode)">{{node.text}}</el-dropdown-item>
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
import { Node } from "@/storage/model/Node";
import { CircleCloseFilled, CirclePlusFilled, DeleteFilled, Edit } from "@element-plus/icons-vue";
import { relationGraphDelegate } from "@/storage/RelationGraphDelegate";
import GraphNodeEditor from "@/components/GraphNodeEditor.vue";
import { Ref } from "vue-property-decorator";

export default defineComponent({
  name: "GraphNodeProfile",
  components: { GraphNodeEditor, Edit, CircleCloseFilled, DeleteFilled, CirclePlusFilled },

  setup() {
    const nodeNameCount = ref(0); // 新建节点名称计数，用于生成node1、node2、...
    const isShowNodeMenuPanel = ref(false); // 是否展示操作菜单
    let currentNode = ref<Node>({ id: "", text: "" }); // 当前操作的节点
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

    function addLine(from:Node, to:Node) {
      const line: Line = { from: from.id, to: to.id, text: "节点关系描述" };
      relationGraphDelegate.addLine(line); // 添加当前节点到新增子节点的关系表示
      hideNodeProfile();
    }

    function addChildNode(): Node {
      const newNode: Node = { id: "new-node", text: "节点-" + nodeNameCount.value ++};
      relationGraphDelegate.addGraphNode(newNode);
      addLine(currentNode.value, newNode);
      // showEditorDrawer(newNode);
      return newNode;
    }
    function addParentNode(): Node {
      const newNode: Node = { id: "new-node", text: "节点-" + nodeNameCount.value ++, nodeShape:0};
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
      addLine,
      modifyPanelPosition,
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
