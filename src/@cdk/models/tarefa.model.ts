import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';
import {Usuario} from '@cdk/models/usuario.model';
import {EspecieTarefa} from '@cdk/models/especie-tarefa.model';
import {Processo} from '@cdk/models/processo.model';
import {Setor} from '@cdk/models/setor.model';
import {VinculacaoEtiqueta} from '@cdk/models/vinculacao-etiqueta.model';
import {Folder} from '@cdk/models/folder.model';

export class Tarefa {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    postIt?: string;

    urgente: boolean;

    observacao?: string;

    @Exclude({toPlainOnly: true})
    redistribuida: boolean;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraInicioPrazo: Date|moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraFinalPrazo: Date|moment.Moment;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraConclusaoPrazo?: Date;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    processo: Processo;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    especieTarefa: EspecieTarefa;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuarioResponsavel: Usuario;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorOrigem?: Setor;

    @Exclude()
    unidadeResponsavel: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorResponsavel: Setor;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuarioConclusaoPrazo?: Usuario;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    criadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    criadoEm?: Date;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    atualizadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    atualizadoEm?: Date;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    apagadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    apagadoEm?: Date;

    distribuicaoAutomatica: boolean;

    @Exclude({toPlainOnly: true})
    livreBalanceamento: boolean;

    @Exclude({toPlainOnly: true})
    auditoriaDistribuicao?: string;

    @Exclude({toPlainOnly: true})
    tipoDistribuicao: number;

    @Type(() => Folder)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    folder?: Folder;

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEtiqueta)
    vinculacoesEtiquetas: VinculacaoEtiqueta[];

    constructor() {
        this.id = null;
        this.uuid = null;
        this.postIt = null;
        this.urgente = null;
        this.observacao = null;
        this.redistribuida = null;
        this.dataHoraInicioPrazo = null;
        this.dataHoraFinalPrazo = null;
        this.dataHoraConclusaoPrazo = null;
        this.processo = null;
        this.especieTarefa = null;
        this.usuarioResponsavel = null;
        this.setorOrigem = null;
        this.setorResponsavel = null;
        this.usuarioConclusaoPrazo = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.distribuicaoAutomatica = null;
        this.livreBalanceamento = null;
        this.auditoriaDistribuicao = null;
        this.tipoDistribuicao = null;
        this.folder = null;
        this.vinculacoesEtiquetas = null;
    }
}
