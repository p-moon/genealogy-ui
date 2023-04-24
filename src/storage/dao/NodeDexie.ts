import Dexie, { Table } from 'dexie';

import Line from "@/storage/model/Line";
import Node from "@/storage/model/Node";


export class NodeDexie extends Dexie {
    // 'nodes' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    nodes!: Table<Node>;

    constructor() {
        super('genealogy');
        this.version(1).stores({
            friends: '++id, name, age' // Primary key and indexed props
        });
    }
}

export const nodeDexie = new NodeDexie();
