import {Exclude} from 'class-transformer';

export class Campo {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    descricao?: string;

    html?: string;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.html = null;
    }
}
