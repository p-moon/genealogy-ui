import {
  RGCenterLayoutOptions,
  RGLayoutOptionsCore,
  RGOptions,
  RGTreeLayoutOptions
} from "relation-graph/vue3/RelationGraph";

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
  layouts: [
    centerLayout,
    treeLayout,
    forceLayout,
  ]
};

export default relationGraphConfig;
