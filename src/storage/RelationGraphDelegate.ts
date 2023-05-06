import { store } from "@/store";
import { Line } from "@/storage/model/Line";
import { Node } from "@/storage/model/Node";
import { lineDexie } from "@/storage/dao/LineDexie";
import { nodeDexie } from "@/storage/dao/NodeDexie";
import RelationGraph from "relation-graph/vue3";
import { ref, Ref } from "vue";
import { RGJsonData } from "relation-graph/vue3/RelationGraph";
import { createDefaultRelationGraphData, RelationGraphData } from "@/storage/model/RelationGraphData";
import { ElMessage, ElNotification } from "element-plus";


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
  getRelationGraphView: () => Ref<RelationGraph | undefined>;

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
  createNewRelationGraphFromStorage: () => void;

  /**
   * 导出数据
   */
  exportRelationGraphData: () => void;


  /**
   * 导入数据
   */
  importRelationGraphData: () => void;
}

class RelationGraphDelegate implements IRelationGraph {

  private _relationGraphView: Ref<RelationGraph | undefined> = ref<RelationGraph>();
  private localStorage: Storage = window.localStorage;
  private graphDataStorageKey: string = "GRAPH_DATA_STORAGE_KEY";

  public addGraphNode(node: Node): Node {
    node.id = String(new Date().getTime());
    store.dispatch("asyncAddNode", node).then(() => {
      this._relationGraphView?.value?.getInstance()?.addNodes([node]);
      this._relationGraphView?.value?.getInstance()?.refresh();
      this.focusNodeById(node.id);
    });
    return node;
  }

  public addLine(line: Line): Line {
    // lineDexie.nodes.add(line);
    store.dispatch("asyncAddLine", {
      from: line.from, to: line.to, text: line.text, color: "#43a2f1"
    }).then(() => {
      this._relationGraphView?.value?.getInstance()?.addLines([line]);
      this._relationGraphView?.value?.getInstance()?.refresh();
    });
    return line;
  }

  public createNewRelationGraph(): void {
    let graph_data = createDefaultRelationGraphData();
    this._relationGraphView?.value?.setJsonData(graph_data);
    store.dispatch("asyncUpdateGraphData", graph_data).then(r => {
      this.localStorage.setItem(this.graphDataStorageKey, JSON.stringify(graph_data));
    });
  }

  public createNewRelationGraphFromStorage(): void {
    let graph_data = relationGraphDelegate.getRelationGraphData();
    this._relationGraphView?.value?.setJsonData(graph_data);
    store.dispatch("asyncUpdateGraphData", graph_data).then(r => {
      this.localStorage.setItem(this.graphDataStorageKey, JSON.stringify(graph_data));
    });
  }

  public deleteLine(line: Line): void {
    store.dispatch("asyncDeleteLine", line).then(() => {
      this._relationGraphView?.value?.getInstance()?.removeLinkById(line.from, line.to);
    });
  }

  public deleteNode(node: Node): void {
    this._relationGraphView?.value?.getInstance()?.removeNodeById(node.id);
    this._relationGraphView?.value?.getInstance()?.refresh();
    store.dispatch("asyncDeleteNode", node).then(() => {
    });
  }

  public focusNodeById(id: string): void {
    this._relationGraphView?.value?.getInstance().focusNodeById(id);
  }

  public getRelationGraphData(): RelationGraphData {
    const data = this.localStorage.getItem(this.graphDataStorageKey);
    if (data == null) {
      return store.state.graph_json_data;
    }
    return JSON.parse(data);
  }

  public getRelationGraphView(): Ref<RelationGraph | undefined> {
    return this._relationGraphView;
  }

  public refresh(): void {
    this._relationGraphView?.value?.getInstance().dataUpdated();
    this._relationGraphView?.value?.getInstance().refresh();
  }

  public saveRelationGraphData(): void {
    let graphJsonData = this._relationGraphView?.value?.getInstance().getGraphJsonData();
    if (!(graphJsonData && "lines" in graphJsonData && "nodes" in graphJsonData && "rootId" in graphJsonData)) {
      console.log("saveRelationGraph => invalid graphJsonData", graphJsonData);
      return;
    }
    store.dispatch("asyncUpdateGraphData", graphJsonData).then(r => {
      this.localStorage.setItem(this.graphDataStorageKey, JSON.stringify(graphJsonData));
    });
  }

  public setRelationGraphView(relationGraph: Ref<RelationGraph | undefined>): void {
    this._relationGraphView = relationGraph;
  }

  public exportRelationGraphData(): void {
    const data = JSON.stringify(this.getRelationGraphData()); // 要导出的数据
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.g7y"; // 下载的文件名
    link.click();
    URL.revokeObjectURL(url);
  }

  public importRelationGraphData(): void {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result as string;
          try {
            const jsonData = JSON.parse(fileContent);
          } catch (error) {
            ElNotification({ title: '错误', message: '非法的文件', type: 'error', })
            return;
          }
          this.localStorage.setItem(this.graphDataStorageKey, fileContent);
          this.createNewRelationGraphFromStorage();
        };
        reader.readAsText(file);
      }
    });
    fileInput.click();
  }
}

export const relationGraphDelegate: RelationGraphDelegate = new RelationGraphDelegate();
