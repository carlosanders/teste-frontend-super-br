export class PaginatedResponse {

    total: number;
    entities: any[];

    constructor(entities, total) {
        this.entities = entities;
        this.total = total;
    }
}
