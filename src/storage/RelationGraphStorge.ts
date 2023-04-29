import { store } from "@/store";
import { Line } from "@/storage/model/Line";
import { Node } from "@/storage/model/Node";
import {lineDexie} from "@/storage/dao/LineDexie";
import {nodeDexie} from "@/storage/dao/NodeDexie";


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
    deleteNode: (node:Node) => void;

    /**
     * 删除用户关系
     */
    deleteLine: (line:Line) => void;
}

export let relationGraphStorage: IRelationGraph = {
    addGraphNode: (node: Node):Node => {
        node.id = String(new Date().getTime());
        store.dispatch("asyncAddNode", node).then(() => {})
        return node;
    },
    addLine: (line: Line):Line => {
        // lineDexie.nodes.add(line);
        store.dispatch("asyncAddLine", {
            from: line.from, to: line.to, text: line.text, color: "#43a2f1"
        }).then(() => {})
        return line;
    },
    deleteNode: (node:Node) => {
        store.dispatch("asyncDeleteNode", node).then(() => {})
    },
    deleteLine: (line:Line) => {
        store.dispatch("asyncDeleteLine", line).then(() => {})
    }
}
