import store from "../store/index";
export let RelationGraph = {};
RelationGraph.getUserList = () => {
    return window.localStorage.getItem();
};
RelationGraph.addGraphNode = (node) => {
    store.dispatch("asyncAddNode", {
        id: node.name, text: node.name, borderColor: "yellow"
    }).then((res) => { }).catch((error) => { });
};
RelationGraph.addLine = (line) => {
    store.dispatch("asyncAddLine", {
        from: line.from, to: line.to, text: line.text, color: "#43a2f1"
    }).then((res1) => { }).catch((error) => { });
};
//# sourceMappingURL=RelationGraphStorge.js.map