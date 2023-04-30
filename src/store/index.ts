/* eslint-disable */
// @ts-ignore
import { InjectionKey } from "vue";
// @ts-ignore
import { createStore, Store } from "vuex";
import { Node } from "@/storage/model/Node";
import { Line } from "@/storage/model/Line";

export interface RelationGraphData {

  /**
   * 跟id
   */
  rootId: string;

  /**
   * 节点列表
   */
  nodes: Node[];

  /**
   * 节点关系列表
   */
  lines: Line[];
}

// 为 store state 声明类型
export interface State {
  graph_json_data: RelationGraphData;
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    graph_json_data: {
      rootId: "a",
      nodes: [
        // node配置选项：http://relation-graph.com/#/docs/node
        // node支持通过插槽slot完全自定义，示例：http://relation-graph.com/#/demo/adv-slot
        { id: "a", text: "A", borderColor: "yellow"},
        { id: "b", text: "B", color: "#43a2f1", fontColor: "yellow" },
        { id: "c", text: "C", nodeShape: 0 },
        { id: "e", text: "E", nodeShape: 0 }
      ],
      lines: [
        // link配置选项：http://relation-graph.com/#/docs/link
        { from: "a", to: "b", text: "关系1", color: "#43a2f1" },
        { from: "a", to: "c", text: "关系2" },
        { from: "a", to: "e", text: "关系3" }
      ]
    }
  },
  getters: {
    getNodeList(state: State): Node[] {
      return state.graph_json_data.nodes;
    },
  },
  mutations: {
    updateRootId(state: State, newRootId: string) {
      state.graph_json_data.rootId = newRootId;
    },
    addNode(state: State, node: Node) {
      state.graph_json_data.nodes.push(node);
    },
    deleteNode(state: State, deleteNode: Node) {
      state.graph_json_data.nodes = state.graph_json_data.nodes.filter(node => {
        return node.id != deleteNode.id;
      });
    },
    addLine(state: State, line: Line) {
      state.graph_json_data.lines.push(line);
    },
    deleteLine(state: State, deleteLine: Line) {
      state.graph_json_data.lines = state.graph_json_data.lines.filter(line => {
        return line == deleteLine;
      });
    },
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
    }
  },
  modules: {}
});
