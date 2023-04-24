import Dexie, { Table } from 'dexie';

import Line from "@/storage/model/Line";


export class LineDexie extends Dexie {
    // 'nodes' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    nodes!: Table<Line>;

    constructor() {
        super('genealogy');
        this.version(1).stores({
            friends: '++id, name, age' // Primary key and indexed props
        });
    }
}

export const lineDexie = new LineDexie();
