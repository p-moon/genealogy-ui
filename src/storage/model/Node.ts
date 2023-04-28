import { JsonNode } from "relation-graph";

export interface NodeData {

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
