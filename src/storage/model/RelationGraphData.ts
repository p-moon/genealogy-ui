import { Node, createDefaultNode } from "@/storage/model/Node";
import { Line } from "@/storage/model/Line";
import { store } from "@/store";

export interface RelationGraphData {

  /**
   * 跟id
   */
  rootId: string;

  /**
   * 节点列表
   */
  nodes: Node[];

  /**
   * 节点关系列表
   */
  lines: Line[];
}

export const createDefaultRelationGraphData = (): RelationGraphData => {
  return {
    rootId: "a",
    nodes: [
      {
        id: "a",
        text: "A",
        nodeShape: 0,
        borderColor: "#FFFF00",
        data: { avatar: "/img/icon.png" }
      }
    ],
    lines: [
    ]
  }
}
