/* eslint-disable */
// @ts-ignore
import { InjectionKey } from "vue";
// @ts-ignore
import { createStore, Store } from "vuex";
import { Node } from "@/storage/model/Node";
import { Line } from "@/storage/model/Line";
import { RelationGraphData, createDefaultRelationGraphData } from "@/storage/model/RelationGraphData";


// 为 store state 声明类型
export interface State {
  normal_color: string[],
  graph_json_data: RelationGraphData;
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    normal_color: ["#FF4500", "#FFA500", "#FFFF00", "#00FF00", "#00BFFF", "#0000FF", "#8B00FF"],
    graph_json_data: createDefaultRelationGraphData(),
  },
  getters: {
    getNodeList(state: State): Node[] {
      return state.graph_json_data.nodes;
    }
  },
  mutations: {
    updateRootId(state: State, newRootId: string) {
      state.graph_json_data.rootId = newRootId;
    },
    addNode(state: State, node: Node) {
      state.graph_json_data.nodes.push(node);
    },
    deleteNode(state: State, deleteNode: Node) {
      deleteNode.isHide;
      // state.graph_json_data.nodes = state.graph_json_data.nodes.filter(node => {
      //   return node.id != deleteNode.id;
      // });
    },
    addLine(state: State, line: Line) {
      state.graph_json_data.lines.push(line);
    },
    deleteLine(state: State, deleteLine: Line) {
      state.graph_json_data.lines = state.graph_json_data.lines.filter(line => {
        return line == deleteLine;
      });
    },
    updateGraphData(state: State, graph_json_data: RelationGraphData) {
      state.graph_json_data = graph_json_data;
    }
  },
  actions: {
    asyncUpdateRootId({ commit }, newRootId: string) {
      commit("updateRootId", newRootId);
    },
    asyncAddNode({ commit }, node: Node) {
      commit("addNode", node);
    },
    asyncDeleteNode({ commit }, node: Node) {
      commit("deleteNode", node);
    },
    asyncDeleteLine({ commit }, line: Line) {
      commit("deleteLine", line);
    },
    asyncAddLine({ commit }, line: Line) {
      commit("addLine", line);
    },
    asyncUpdateGraphData: ({ commit }, data: RelationGraphData) => {
      commit("updateGraphData", data);
    }
  },
  modules: {}
});
