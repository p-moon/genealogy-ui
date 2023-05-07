import {
  RGCenterLayoutOptions,
  RGLayoutOptionsCore,
  RGOptions,
  RGTreeLayoutOptions
} from "@/relation-graph/vue3/RelationGraph";

const centerLayout: RGCenterLayoutOptions = {
  label: "中心",
  layoutName: "center",
  layoutClassName: "seeks-layout-center",
  distance_coefficient: 1
};

const treeLayout: RGTreeLayoutOptions = {
  label: "树状",
  layoutName: "tree",
  layoutClassName: "seeks-layout-center"
};

const forceLayout: RGLayoutOptionsCore = {
  label: "自动",
  layoutName: "force",
  layoutClassName: "seeks-layout-center"
};

const circleLayout: RGLayoutOptionsCore = {
  label: "圆形",
  layoutName: "circle",
  layoutClassName: "seeks-layout-circle"
};

const fixedLayout: RGLayoutOptionsCore = {
  label: "fixed",
  layoutName: "fixed",
  layoutClassName: "seeks-layout-fixed"
};

const relationGraphConfig: RGOptions = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultJunctionPoint: 'border',
  // defaultJunctionPoint: 'border',
  allowAutoLayoutIfSupport: true,
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  useAnimationWhenRefresh: true,
  allowShowZoomMenu: true,
  placeSingleNode: true,
  defaultLineColor:"#1465ce",
  defaultNodeFontColor:"#000000",
  defaultNodeBorderColor: "#decd16",
  // isMoveByParentNode: true,
  // allowShowDownloadButton: false,
  layouts: [
    centerLayout,
    treeLayout,
    forceLayout,
    circleLayout,
    fixedLayout,
  ]
};

export default relationGraphConfig;
