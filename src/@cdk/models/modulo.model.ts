import {Exclude} from 'class-transformer';

export class Modulo {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    nome: string;

    descricao: string;

    sigla: string;

    prefixo: string;

    ativo: boolean;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.sigla = null;
        this.prefixo = null;
        this.ativo = null;
    }
}
