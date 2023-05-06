import {store } from "@/store";
import { Line } from "@/storage/model/Line";
import { Node } from "@/storage/model/Node";
import { lineDexie } from "@/storage/dao/LineDexie";
import { nodeDexie } from "@/storage/dao/NodeDexie";
import RelationGraph from "relation-graph/vue3";
import { ref, Ref } from "vue";
import { RGJsonData } from "relation-graph/vue3/RelationGraph";
import { createDefaultRelationGraphData, RelationGraphData } from "@/storage/model/RelationGraphData";


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
  setRelationGraphView: (relationGraph: Ref<RelationGraph>) => void;

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

  /**
   * 清空画板，彻底开启一个新的绘图
   */
  createNewRelationGraph: () => void;

  /**
   * 从存储中载入输入并创建画板
   */
  createNewRelationGraphFromStorage:() => void;
}

class RelationGraphDelegate implements IRelationGraph {

  private _relationGraphView: Ref<RelationGraph|undefined> = ref<RelationGraph>();
  private localStorage: Storage = window.localStorage;
  private graphDataStorageKey: string = "GRAPH_DATA_STORAGE_KEY";

  addGraphNode(node: Node): Node {
    node.id = String(new Date().getTime());
    store.dispatch("asyncAddNode", node).then(() => {
      this._relationGraphView?.value?.getInstance()?.addNodes([node]);
      this._relationGraphView?.value?.getInstance()?.refresh();
      this.focusNodeById(node.id);
    });
    return node;
  }

  addLine(line: Line): Line {
    // lineDexie.nodes.add(line);
    store.dispatch("asyncAddLine", {
      from: line.from, to: line.to, text: line.text, color: "#43a2f1"
    }).then(() => {
      this._relationGraphView?.value?.getInstance()?.addLines([line]);
      this._relationGraphView?.value?.getInstance()?.refresh();
    });
    return line;
  }

  createNewRelationGraph(): void {
    let graph_data = createDefaultRelationGraphData();
    this._relationGraphView?.value?.setJsonData(graph_data);
    store.dispatch("asyncUpdateGraphData", graph_data).then(r => {
      this.localStorage.setItem(this.graphDataStorageKey, JSON.stringify(graph_data));
    });
  }

  createNewRelationGraphFromStorage(): void {
    let graph_data = relationGraphDelegate.getRelationGraphData();
    this._relationGraphView?.value?.setJsonData(graph_data);
    store.dispatch("asyncUpdateGraphData", graph_data).then(r => {
      this.localStorage.setItem(this.graphDataStorageKey, JSON.stringify(graph_data));
    });
  }

  deleteLine(line: Line): void {
    store.dispatch("asyncDeleteLine", line).then(() => {
      this._relationGraphView?.value?.getInstance()?.removeLinkById(line.from, line.to);
    });
  }

  deleteNode(node: Node): void {
    this._relationGraphView?.value?.getInstance()?.removeNodeById(node.id);
    this._relationGraphView?.value?.getInstance()?.refresh();
    store.dispatch("asyncDeleteNode", node).then(() => {});
  }

  focusNodeById(id: string): void {
    this._relationGraphView?.value?.getInstance().focusNodeById(id);
  }

  getRelationGraphData(): RelationGraphData {
    const data = this.localStorage.getItem(this.graphDataStorageKey);
    if(data == null) {
      return store.state.graph_json_data;
    }
    return JSON.parse(data);
  }

  getRelationGraphView(): Ref<RelationGraph | undefined> {
    return this._relationGraphView;
  }

  refresh(): void {
    this._relationGraphView?.value?.getInstance().dataUpdated();
    this._relationGraphView?.value?.getInstance().refresh();
  }

  saveRelationGraphData(): void {
    let graphJsonData = this._relationGraphView?.value?.getInstance().getGraphJsonData();
    if (!(graphJsonData && "lines" in graphJsonData && "nodes" in graphJsonData && "rootId" in graphJsonData)) {
      console.log("saveRelationGraph => invalid graphJsonData", graphJsonData);
      return;
    }
    store.dispatch("asyncUpdateGraphData", graphJsonData).then(r => {
      this.localStorage.setItem(this.graphDataStorageKey, JSON.stringify(graphJsonData));
    });
  }

  setRelationGraphView(relationGraph: Ref<RelationGraph|undefined>): void {
    this._relationGraphView = relationGraph;
  }

}

export const relationGraphDelegate:RelationGraphDelegate = new RelationGraphDelegate();
