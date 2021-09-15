export class Attachment {

    id?: number;
    uuid?: string;
    content?: string;
    mimetype?: string;
    fileName?: string;
    extension?: string;
    imgSrc?: string;
    disposition?: string;
    size?: number;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.content = null;
        this.mimetype = null;
        this.fileName = null;
        this.extension = null;
        this.imgSrc = null;
        this.disposition = null;
        this.size = null;
    }
}
