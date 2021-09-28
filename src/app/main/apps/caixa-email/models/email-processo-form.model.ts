import {Transform, Type} from 'class-transformer';
import {ContaEmail, Processo} from '@cdk/models';

export class EmailProcessoForm {

    id?: number;
    uuid?: string;
    tipo?: string;
    folderIdentifier?: string|number;
    messageIdentifier?: string|number;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    processo?: Processo;

    @Type(() => ContaEmail)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    contaEmail?: ContaEmail;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.tipo = null;
        this.processo = null;
        this.folderIdentifier = null;
        this.messageIdentifier = null;
    }
}
