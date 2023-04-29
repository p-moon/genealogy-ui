import { RGOptions } from "relation-graph/vue3/RelationGraph";

const relationGraphConfig:RGOptions = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultJunctionPoint: 'border',
  allowAutoLayoutIfSupport: true,
  backgrounImageNoRepeat: true,
  moveToCenterWhenRefresh: true,
  zoomToFitWhenRefresh: true,
  useAnimationWhenRefresh: true,
  allowShowZoomMenu: true,
  placeSingleNode: true,
  // layouts: [
  //   {
  //     label: "中心",
  //     layoutName: "center",
  //     layoutClassName: "seeks-layout-center",
  //     distance_coefficient: 1
  //     // defaultJunctionPoint: 'border'
  //   },
  //   {
  //     label: "树状",
  //     layoutName: "tree",
  //     layoutClassName: "seeks-layout-center",
  //   },
  //   {
  //     label: "自动",
  //     layoutName: "force",
  //     layoutClassName: "seeks-layout-center",
  //   }
  // ]
}

export default relationGraphConfig;
