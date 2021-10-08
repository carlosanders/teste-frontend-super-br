export class Folder {

    id?: number;
    uuid?: string;
    path?: string;
    name?: string;
    parsedName?: string;
    fullname?: string;
    hasChildren?: boolean;
    childrens: Folder[];
    totalMessages: number;
    recentMessages: number;
    unreadMessages: number;


    constructor() {
        this.id = null;
        this.uuid = null;
        this.name = null;
        this.path = null;
        this.parsedName = null;
        this.fullname = null;
        this.hasChildren = null;
        this.childrens = [];
        this.totalMessages = null;
        this.recentMessages = null;
        this.unreadMessages = null;
    }
}
