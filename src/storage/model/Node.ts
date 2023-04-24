/**
 * http://relation-graph.com/#/docs/node
 */
export default interface Node {
    /**
     * 节点id,必传
     */
    id: string;

    /**
     * 节点名称，必传
     */
    name: string;

    /**
     * 节点样式class
     */
    styleClass: string;

    /**
     * 节点背景颜色
     */
    color: string;

    /**
     * 节点文字颜色
     */
    fontColor: string;

    /**
     * 节点边框粗细（像素）,默认为1
     */
    borderWidth: bigint;

    /**
     * 节点边框颜色
     */
    borderColor: string;

    /**
     * 节点形状，0:圆形；1:矩形;默认为1
     */
    nodeShape: bigint;

    /**
     * 节点宽度
     */
    width: bigint;
    /**
     * 节点高度
     */
    height: bigint;

    /**
     * 透明度(值范围：0到1,或者0到100)
     */
    opacity: bigint;

    /**
     * 是否隐藏这个节点
     */
    isHide: boolean;

    /**
     * 是否禁用节点的拖动功能
     */
    disableDrag: boolean;

    /**
     * 是否禁用默认的点击选中效果（即使禁用，可以出发自定的节点点击事件）
     */
    disableDefaultClickEffect: boolean;

    /**
     * 节点展开/关闭按钮位置（left/top/right/bottom）节点的这个设置会覆盖全局的expandHolderPosition设置，
     * 即使改节点没有子节点也可以让其显示展开/收缩按钮，
     * 可以实现部分节点显示展开/收缩按钮的效果;
     */
    expandHolderPosition: string;

    /**
     * 手工设置节点的展开收缩状态
     */
    expanded: boolean;

    /**
     * 是否使用固定位置（以当前图谱左上角为0,0的坐标系）;使用示例
     */
    fixed: boolean;

    /**
     * x坐标（以当前图谱左上角为0,0的坐标系）,fixed=true时有效
     */
    x: bigint;

    /**
     * y坐标（以当前图谱左上角为0,0的坐标系）,fixed=true时有效
     */
    y: bigint;

    /**
     * 用HTML自定义节点内部的内容，当此属性不为空时，text属性将失效;使用示例
     */
    innerHTML: string;

    /**
     * 用HTML自定义节点，当此属性不为空时，节点的所有样式属性将失效使用示例
     */
    html: string;

    /**
     * 自定义属性需要放在这里，才能在后续使用中从节点获取，如:{myKey1:'value1',myKey2:'value2'}，示例1：
     * 使用自定义属性作为节点名称/节点图标，示例1：使用自定义属性进行筛选
     */
    data: Object;
}
