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
    total: number;
    context: any;

    constructor() {
        this.limit = 10;
        this.offset = 0;
        this.total = 0;
        this.filter = {};
        this.listFilter = {};
        this.gridFilter = {};
        this.etiquetaFilter = {};
        this.folderFilter = {};
        this.populate = [];
        this.sort = {};
        this.context = {};
    }
}
