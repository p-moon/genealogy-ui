import { store } from "@/store";
import { Line } from "@/storage/model/Line";
import { Node } from "@/storage/model/Node";
import { lineDexie } from "@/storage/dao/LineDexie";
import { nodeDexie } from "@/storage/dao/NodeDexie";
import RelationGraph from "relation-graph/vue3";
import { Ref } from "vue";


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
   * 保存绘图数据
   */
  saveRelationGraph: () => void;
}

let relationGraphView: Ref<RelationGraph | undefined>;
export let relationGraphDelegate: IRelationGraph = {
  addGraphNode: (node: Node): Node => {
    node.id = String(new Date().getTime());
    store.dispatch("asyncAddNode", node).then(() => {
      relationGraphView?.value?.getInstance()?.addNodes([node]);
    });
    return node;
  },
  addLine: (line: Line): Line => {
    // lineDexie.nodes.add(line);
    store.dispatch("asyncAddLine", {
      from: line.from, to: line.to, text: line.text, color: "#43a2f1"
    }).then(() => {
      relationGraphView?.value?.getInstance()?.addLines([line]);
    });
    return line;
  },
  deleteNode: (node: Node) => {
    node.isHide = true;
    store.dispatch("asyncDeleteNode", node).then(() => {
      // relationGraphView?.value?.getInstance()?.removeNodeById(node.id);
    });
  },
  deleteLine: (line: Line) => {
    store.dispatch("asyncDeleteLine", line).then(() => {
      // relationGraphView?.value?.getInstance()?.removeLinkById(line.from, line.to);
    });
  },
  setRelationGraphView: (relationGraph: Ref<RelationGraph | undefined>) => {
    relationGraphView = relationGraph;
  },
  saveRelationGraph: () => {
    let graphJsonData = relationGraphView.value?.getInstance().getGraphJsonData();
    if (!("lines" in graphJsonData && "nodes" in graphJsonData && "rootId" in graphJsonData)) {
      console.log("saveRelationGraph => invalid graphJsonData", graphJsonData);
      return;
    }
    console.log("saveRelationGraph => ", graphJsonData);
    store.dispatch("asyncUpdateGraphData", graphJsonData).then(r => {

    });
  }
};
