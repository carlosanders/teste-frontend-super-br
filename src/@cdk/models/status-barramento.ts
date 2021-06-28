import * as moment from 'moment';
import { Type, Transform, Exclude } from 'class-transformer';

import {DocumentoAvulso, Processo, Tramitacao} from '@cdk/models';
import { Usuario } from '@cdk/models';

export class StatusBarramento {
    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    idtComponenteDigital: number;

    idt: number;

    mensagemErro?: string;

    codigoErro?: number;

    @Type(() => Processo)
    @Transform( value => value ? value.id : null, { toPlainOnly: true })
    processo?: Processo;

    @Type(() => DocumentoAvulso)
    @Transform( value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulso?: DocumentoAvulso;

    @Type(() => Tramitacao)
    @Transform( value => value ? value.id : null, { toPlainOnly: true })
    tramitacao?: Tramitacao;

    @Exclude({ toPlainOnly: true })
    codSituacaoTramitacao?: number;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    criadoPor?: Usuario;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    atualizadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    apagadoEm?: Date;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    apagadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    atualizadoEm?: Date;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    criadoEm?: Date;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.idt = null;
        this.idtComponenteDigital = null;
        this.processo = null;
        this.documentoAvulso = null;
        this.tramitacao = null;
        this.codSituacaoTramitacao;
        this.mensagemErro = null;
        this.codigoErro = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
