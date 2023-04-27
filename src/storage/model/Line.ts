import { JsonLine } from "relation-graph";

export interface LineData {

}

/**
 * http://relation-graph.com/#/docs/link
 */
export interface Line extends JsonLine {

    /**
     * 自定义属性需要放在这里，才能在后续使用中从节点获取，如:{myKey1:'value1',myKey2:'value2'},示例1：使用自定义属性进行筛选
     */
    data?:object;
}
