/* eslint-disable */
import {createStore} from "vuex";

export default createStore({
    state: {
        graph_json_data: {
            rootId: "a",
            nodes: [
                // node配置选项：http://relation-graph.com/#/docs/node
                // node支持通过插槽slot完全自定义，示例：http://relation-graph.com/#/demo/adv-slot
                {id: "a", text: "A", borderColor: "yellow"},
                {id: "b", text: "B", color: "#43a2f1", fontColor: "yellow"},
                {id: "c", text: "C", nodeShape: 1, width: 80, height: 60},
                {id: "e", text: "E", nodeShape: 0, width: 150, height: 150},
            ],
            lines: [
                // link配置选项：http://relation-graph.com/#/docs/link
                {from: "a", to: "b", text: "关系1", color: "#43a2f1"},
                {from: "a", to: "c", text: "关系2"},
                {from: "a", to: "e", text: "关系3"},
            ],
        }
    },
    getters: {},
    mutations: {
        updateRootId(state, newRootId) {
            state.graph_json_data.rootId = newRootId;
        },
        addNode(state, node) {
            state.graph_json_data.nodes.push(node)
        },
        addLine(state, line) {
            state.graph_json_data.lines.push(line)
        }
    },
    actions: {
        asyncUpdateRootId({commit}, newRootId) {
            commit('updateRootId', newRootId);
        },
        asyncAddNode({commit}, node) {
            commit('addNode', node);
        },
        asyncAddLine({commit}, line) {
            commit('addLine', line)
        }
    },
    modules: {},
});
