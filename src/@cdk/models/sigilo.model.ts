import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {Documento, ModalidadeCategoriaSigilo, OrigemDados, Processo, TipoSigilo, Usuario} from '@cdk/models';

export class Sigilo {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    desclassificado?: boolean;

    observacao?: string;

    codigoIndexacao?: string;

    fundamentoLegal?: string;

    razoesClassificacaoSigilo?: string;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraValidadeSigilo?: moment.Moment;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraInicioSigilo?: moment.Moment;

    nivelAcesso?: number;

    @Type(() => ModalidadeCategoriaSigilo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeCategoriaSigilo?: ModalidadeCategoriaSigilo;

    @Type(() => TipoSigilo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tipoSigilo?: TipoSigilo;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processo?: Processo;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento?: Documento;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

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
        this.desclassificado = null;
        this.observacao = null;
        this.codigoIndexacao = null;
        this.fundamentoLegal = null;
        this.razoesClassificacaoSigilo = null;
        this.dataHoraInicioSigilo = null;
        this.dataHoraValidadeSigilo = null;
        this.nivelAcesso = null;
        this.modalidadeCategoriaSigilo = null;
        this.tipoSigilo = null;
        this.processo = null;
        this.documento = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
