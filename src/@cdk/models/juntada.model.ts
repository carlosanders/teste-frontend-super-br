import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models/usuario.model';
import {Documento} from '@cdk/models/documento.model';
import {OrigemDados} from '@cdk/models/origem-dados.model';
import {Volume} from '@cdk/models/volume.model';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Atividade} from '@cdk/models/atividade.model';
import {Tarefa} from '@cdk/models/tarefa.model';

export class Juntada {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    ativo?: boolean;

    @Exclude({ toPlainOnly: true })
    numeracaoSequencial?: number;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento: Documento;

    descricao: string;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

    @Type(() => Volume)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    volume: Volume;

    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulso?: DocumentoAvulso;

    @Type(() => Atividade)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    atividade?: Atividade;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefa?: Tarefa;

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
        this.ativo = null;
        this.numeracaoSequencial = null;
        this.documento = null;
        this.volume = null;
        this.tarefa = null;
        this.atividade = null;
        this.documentoAvulso = null;
        this.descricao = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
