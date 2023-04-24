
/**
 * http://relation-graph.com/#/docs/link
 */
export default interface Line {

    /**
     * 关系from节点的id，必选
     */
    from: string;

    /**
     * 关系to节点的id，必选
     */
    to: string;

    /**
     * 关系文字，必选
     */
    text: string;

    /**
     * 节点样式class
     */
    styleClass:string;

    /**
     * 线条粗细（像素）
     */
    lineWidth:string;

    /**
     * 线条颜色
     */
    color:string;

    /**
     * 是否显示
     */
    isHide:boolean;

    /**
     * 线条样式（1:直线/2:样式2/3:样式3/4:折线/5:样式5/6:样式6）
     */
    lineShape:number;

    /**
     * 线条文字颜色
     */
    fontColor:string;

    /**
     * 是否显示箭头
     */
    isHideArrow:boolean;

    /**
     * isHideArrow=true时此选项无效，是否显示起始箭头
     */
    showStartArrow:boolean;

    /**
     * isHideArrow=true时此选项无效，是否显示终止箭头
     */
    showEndArrow:boolean;

    /**
     * 连线文字沿着连线路径走
     */
    useTextPath:boolean;

    /**
     * 自定义属性需要放在这里，才能在后续使用中从节点获取，如:{myKey1:'value1',myKey2:'value2'},示例1：使用自定义属性进行筛选
     */
    data:object;
}
