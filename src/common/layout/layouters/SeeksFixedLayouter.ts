import RGGraphMath from "../utils/RGGraphMath";
import { devLog } from "../utils/RGCommon";
import type {
  RGLayoutOptions,
  RGLayouter,
  RGNode,
  RGOptionsFull
} from "@/relation-graph/vue3";
import { IGraphLayouter } from "@/common/layout/layouters/IGraphLayouter";
import { Ref } from "vue";
import RelationGraph from "@/relation-graph/vue3";
import { relationGraphDelegate } from "@/storage/RelationGraphDelegate";

export class SeeksFixedLayouter implements IGraphLayouter {

  constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull) {
    this.layoutOptions = layoutOptions;
    this.graphOptions = graphOptions;
  }

  graphOptions: RGOptionsFull;
  layoutOptions: RGLayoutOptions;
  rootNode: RGNode | undefined = undefined;
  allNodes: RGNode[] = [];
  __origin_nodes: RGNode[] = [];


  doBeforeLayout() {
    const relationGraph = relationGraphDelegate.getRelationGraphView()?.value?.getInstance();
    relationGraph?.setDefaultLineShape(1);
    relationGraph?.setDefaultJunctionPoint("border");
  }

  refresh() {
    this.placeNodes(this.__origin_nodes, this.rootNode);
  }

  placeNodes(allNodes: RGNode[], rootNode?: RGNode) {
    if (!rootNode) {
      devLog("root is null:", rootNode);
      return;
    }
    devLog("layout by root:", rootNode);
    this.__origin_nodes = allNodes;
    this.rootNode = rootNode as RGNode;
    allNodes.forEach((thisNode) => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      // thisNode.lot.parent = undefined
      thisNode.lot.index_of_parent = 0;
      thisNode.lot.strength = 0;
      thisNode.lot.placed = false;
    });
    this.allNodes = [];
    const analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    };
    RGGraphMath.analysisNodes4Didirectional(
      this.allNodes,
      [this.rootNode],
      0,
      analyticResult,
      0
    );
  }
}

export default SeeksFixedLayouter;
