import { store } from "@/store";
import { Line } from "@/storage/model/Line";
import { Node } from "@/storage/model/Node";
import {lineDexie} from "@/storage/dao/LineDexie";
import {nodeDexie} from "@/storage/dao/NodeDexie";


interface IRelationGraph {

    /**
     * 添加节点
     */
    addGraphNode: (node: Node) => void;

    /**
     * 添加节点关系
     */
    addLine: (line: Line) => void;


}

export let relationGraph: IRelationGraph = {
    addGraphNode: (node: Node) => {
        // nodeDexie.nodes.add(node).then((res) => {});
        store.dispatch("asyncAddNode", node).then(() => {})
    },
    addLine: (line: Line) => {
        // lineDexie.nodes.add(line);
        store.dispatch("asyncAddLine", {
            from: line.from, to: line.to, text: line.text, color: "#43a2f1"
        }).then(() => {})
    }
}
