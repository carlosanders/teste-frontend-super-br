export class Pagination {

    limit: number;
    offset: number;
    filter: any;
    listFilter: any;
    gridFilter: any;
    etiquetaFilter: any;
    folderFilter: any;
    populate: any;
    sort: any;

    constructor() {
        this.limit = 5;
        this.offset = 0;
        this.filter = {};
        this.listFilter = {};
        this.gridFilter = {};
        this.etiquetaFilter = {};
        this.folderFilter = {};
        this.populate = [];
        this.sort = {};
    }
}
