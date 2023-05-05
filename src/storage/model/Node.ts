import { JsonNode } from "relation-graph";
import { ref } from "vue";

export interface NodeData {

  /**
   * 头像
   */
  avatar:string;


}

/**
 * http?://relation-graph.com/#/docs/node
 */
export interface Node extends JsonNode {

  /**
   * 自定义属性需要放在这里，才能在后续使用中从节点获取，如?:{myKey1?:'value1',myKey2?:'value2'}，示例1：
   * 使用自定义属性作为节点名称/节点图标，示例1：使用自定义属性进行筛选
   */
  data?: NodeData;
}

const nodeNameCount = ref(0); // 新建节点名称计数，用于生成node1、node2、...

export const createDefaultNode = ():Node  => {
  return { data: {avatar:"/img/icon.png"}, id: String(new Date().getTime()), text: "节点-" + nodeNameCount.value ++ };
}
