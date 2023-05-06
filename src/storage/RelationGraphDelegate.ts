import { RelationGraphData, store } from "@/store";
import { Line } from "@/storage/model/Line";
import { Node } from "@/storage/model/Node";
import { lineDexie } from "@/storage/dao/LineDexie";
import { nodeDexie } from "@/storage/dao/NodeDexie";
import RelationGraph from "relation-graph/vue3";
import { Ref } from "vue";
import { serialize, deserialize } from "class-transformer";
import { RGJsonData } from "relation-graph/vue3/RelationGraph";
import { ClassConstructor } from "class-transformer/types/interfaces";

let relationGraphView: Ref<RelationGraph | undefined>;
const localStorage: Storage = window.localStorage;
const graphDataStorageKey: string = "GRAPH_DATA_STORAGE_KEY";

interface IRelationGraph {

  /**
   * 添加节点
   */
  addGraphNode: (node: Node) => Node;

  /**
   * 添加节点关系
   */
  addLine: (line: Line) => Line;

  /**
   * 删除节点
   */
  deleteNode: (node: Node) => void;

  /**
   * 删除用户关系
   */
  deleteLine: (line: Line) => void;

  /**
   * 写入UI实例
   */
  setRelationGraphView: (relationGraph: Ref<RelationGraph | undefined>) => void;

  /**
   * 读取UI实例
   */
  getRelationGraphView:  () => Ref<RelationGraph | undefined>;

  /**
   * 读取数据
   */
  getRelationGraphData: () => RelationGraphData;

  /**
   * 保存绘图数据
   */
  saveRelationGraphData: () => void;

  /**
   * 刷新重绘
   */
  refresh: () => void;

  /**
   * 将节点更新为选中状态
   */
  focusNodeById: (id: string) => void;
}

export let relationGraphDelegate: IRelationGraph = {
  addGraphNode: (node: Node): Node => {
    node.id = String(new Date().getTime());
    store.dispatch("asyncAddNode", node).then(() => {
      relationGraphView?.value?.getInstance()?.addNodes([node]);
      relationGraphView?.value?.getInstance()?.refresh();
      // relationGraphView?.value?.getInstance()?.focusNodeById(node.id);
    });
    return node;
  },
  addLine: (line: Line): Line => {
    // lineDexie.nodes.add(line);
    store.dispatch("asyncAddLine", {
      from: line.from, to: line.to, text: line.text, color: "#43a2f1"
    }).then(() => {
      relationGraphView?.value?.getInstance()?.addLines([line]);
      relationGraphView?.value?.getInstance()?.refresh();
    });
    return line;
  },
  deleteNode: (node: Node) => {
    relationGraphView?.value?.getInstance()?.removeNodeById(node.id);
    relationGraphView?.value?.getInstance()?.refresh();
    store.dispatch("asyncDeleteNode", node).then(() => {});
  },
  deleteLine: (line: Line) => {
    store.dispatch("asyncDeleteLine", line).then(() => {
      relationGraphView?.value?.getInstance()?.removeLinkById(line.from, line.to);
    });
  },
  setRelationGraphView: (relationGraph: Ref<RelationGraph | undefined>) => {
    relationGraphView = relationGraph;
  },
  getRelationGraphView:  (): Ref<RelationGraph | undefined> => {
    return relationGraphView;
  },
  saveRelationGraphData: () => {
    let graphJsonData = relationGraphView.value?.getInstance().getGraphJsonData();
    if (!(graphJsonData && "lines" in graphJsonData && "nodes" in graphJsonData && "rootId" in graphJsonData)) {
      console.log("saveRelationGraph => invalid graphJsonData", graphJsonData);
      return;
    }
    console.log("saveRelationGraph => ", graphJsonData);
    store.dispatch("asyncUpdateGraphData", graphJsonData).then(r => {
      localStorage.setItem(graphDataStorageKey, JSON.stringify(graphJsonData));
    });
  },
  getRelationGraphData: (): RelationGraphData => {
    const data = localStorage.getItem(graphDataStorageKey);
    if(data == null) {
      return store.state.graph_json_data;
    }
    return JSON.parse(data);
  },

  refresh: () => {
    relationGraphView.value?.getInstance().dataUpdated();
    relationGraphView.value?.getInstance().refresh();
  },
  focusNodeById: (id: string) => {
    relationGraphView.value?.getInstance().focusNodeById(id);
  }
};
