import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ModalidadeDocumentoIdentificador, OrigemDados, Pessoa, Usuario} from '@cdk/models';

export class DocumentoIdentificador {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    codigoDocumento?: string;

    emissorDocumento?: string;

    @Transform(value => value ? value.format('YYYY-MM-DD') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataEmissao?: moment.Moment;

    @Type(() => ModalidadeDocumentoIdentificador)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeDocumentoIdentificador?: ModalidadeDocumentoIdentificador;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    pessoa?: Pessoa;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    criadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    criadoEm?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    atualizadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    atualizadoEm?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    apagadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    apagadoEm?: moment.Moment;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.codigoDocumento = null;
        this.emissorDocumento = null;
        this.dataEmissao = null;
        this.modalidadeDocumentoIdentificador = null;
        this.origemDados = null;
        this.pessoa = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
