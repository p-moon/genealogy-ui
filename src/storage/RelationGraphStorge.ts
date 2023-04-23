import store from "../store/index";

interface RelationGraphStorage {
    getUserList(): string | null;

    addGraphNode(node: { name: string }): void;

    addLine(line: { from: string; to: string; text: string }): void;
}

export const RelationGraph: RelationGraphStorage = {
    getUserList: () => {
        return window.localStorage.getItem("userList");
    },

    addGraphNode: (node) => {
        store.dispatch("asyncAddNode", {
                id: node.name,
                text: node.name,
                borderColor: "yellow",
            })
            .then((res) => {
            })
            .catch((error) => {
            });
    },

    addLine: (line) => {
        store
            .dispatch("asyncAddLine", {
                from: line.from,
                to: line.to,
                text: line.text,
                color: "#43a2f1",
            })
            .then((res1) => {
            })
            .catch((error) => {
            });
    },
};
