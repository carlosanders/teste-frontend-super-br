import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models/usuario.model';
import {Setor} from '@cdk/models/setor.model';
import {EspecieDocumentoAvulso} from '@cdk/models/especie-documento-avulso.model';
import {Modelo} from '@cdk/models/modelo.model';
import {Pessoa} from '@cdk/models/pessoa.model';
import {Documento} from '@cdk/models/documento.model';
import {Processo} from '@cdk/models/processo.model';
import {Tarefa} from '@cdk/models/tarefa.model';

export class DocumentoAvulso {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorOrigem?: Setor;

    @Type(() => EspecieDocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieDocumentoAvulso: EspecieDocumentoAvulso;

    observacao?: string;

    urgente?: boolean;

    @Type(() => Modelo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modelo: Modelo;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraEncerramento?: Date|moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraInicioPrazo?: Date|moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraFinalPrazo?: Date|moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraConclusaoPrazo?: Date|moment.Moment;

    @Exclude()
    unidadeResponsavel: Setor;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    pessoaDestino?: Pessoa;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorDestino?: Setor;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraRemessa?: Date;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraResposta?: Date|moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraReiteracao?: Date|moment.Moment;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoResposta?: Documento;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoRemessa: Documento;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioResponsavel: Usuario;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorResponsavel: Setor;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioResposta?: Usuario;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioRemessa?: Usuario;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processo: Processo;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processoDestino?: Processo;

    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulsoOrigem?: DocumentoAvulso;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefaOrigem?: Tarefa;

    postIt?: string;

    distribuicaoAutomatica?: boolean;

    livreBalanceamento?: boolean;

    auditoriaDistribuicao: string;

    tipoDistribuicao?: number;

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
        this.setorOrigem = null;
        this.especieDocumentoAvulso = null;
        this.observacao = null;
        this.urgente = null;
        this.modelo = null;
        this.dataHoraEncerramento = null;
        this.dataHoraInicioPrazo = null;
        this.dataHoraFinalPrazo = null;
        this.dataHoraConclusaoPrazo = null;
        this.pessoaDestino = null;
        this.setorDestino = null;
        this.dataHoraRemessa = null;
        this.dataHoraResposta = null;
        this.dataHoraReiteracao = null;
        this.documentoResposta = null;
        this.documentoRemessa = null;
        this.usuarioResponsavel = null;
        this.setorResponsavel = null;
        this.usuarioResposta = null;
        this.usuarioRemessa = null;
        this.processo = null;
        this.processoDestino = null;
        this.documentoAvulsoOrigem = null;
        this.tarefaOrigem = null;
        this.postIt = null;
        this.distribuicaoAutomatica = null;
        this.livreBalanceamento = null;
        this.auditoriaDistribuicao = null;
        this.tipoDistribuicao = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
