import {ModalidadeEtiqueta} from "@cdk/models";

export class TriggerAcao {
    id?: number;
    descricao?: string;
    valor?: any;
    trigger?: string;
    modalidadeEtiqueta?: ModalidadeEtiqueta;

    constructor() {
        this.id = null;
        this.descricao = null;
        this.valor = null;
        this.trigger = null;
        this.modalidadeEtiqueta = null;
    }
}