import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models/usuario.model';
import {ModalidadeCategoriaSigilo} from '@cdk/models/modalidade-categoria-sigilo.model';
import {TipoSigilo} from '@cdk/models/tipo-sigilo.model';
import {Processo} from '@cdk/models/processo.model';
import {Documento} from '@cdk/models/documento.model';
import {OrigemDados} from '@cdk/models/origem-dados.model';

export class Sigilo {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    desclassificado?: boolean;

    observacao?: string;

    codigoIndexacao?: string;

    fundamentoLegal: string;

    razoesClassificacaoSigilo?: string;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraValidadeSigilo: Date;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraExpiracao: Date;

    nivelAcesso: number;

    @Type(() => ModalidadeCategoriaSigilo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeCategoriaSigilo?: ModalidadeCategoriaSigilo;

    @Type(() => TipoSigilo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tipoSigilo: TipoSigilo;

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
    criadoEm?: Date;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    atualizadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    atualizadoEm?: Date;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    apagadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    apagadoEm?: Date;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.desclassificado = null;
        this.observacao = null;
        this.codigoIndexacao = null;
        this.fundamentoLegal = null;
        this.razoesClassificacaoSigilo = null;
        this.dataHoraExpiracao = null;
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
