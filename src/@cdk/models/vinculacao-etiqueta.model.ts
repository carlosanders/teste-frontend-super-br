import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models';
import { Etiqueta } from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {Documento} from '@cdk/models';
import {Processo} from '@cdk/models';

export class VinculacaoEtiqueta {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    conteudo?: string;

    privada?: boolean;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraExpiracao?: Date;

    @Type(() => Etiqueta)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    etiqueta?: Etiqueta;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefa?: Tarefa;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento?: Documento;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processo?: Processo;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

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

    @Exclude({toPlainOnly: true})
    podeAlterarConteudo?: boolean;

    @Exclude({toPlainOnly: true})
    podeExcluir?: boolean;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.etiqueta = null;
        this.conteudo = null;
        this.privada = null;
        this.dataHoraExpiracao = null;
        this.tarefa = null;
        this.documento = null;
        this.processo = null;
        this.usuario = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.podeAlterarConteudo = null;
        this.podeExcluir = null;
    }
}
