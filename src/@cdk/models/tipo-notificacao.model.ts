import {Exclude} from 'class-transformer';

export class TipoNotificacao {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    nome?: string;

    @Exclude({ toPlainOnly: true })
    descricao?: string;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
    }
}
