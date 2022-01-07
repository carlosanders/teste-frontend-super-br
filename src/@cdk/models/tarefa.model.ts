import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';
import {EspecieTarefa, Folder, Processo, Setor, Usuario, VinculacaoEtiqueta, Workflow} from '@cdk/models';
import {VinculacaoWorkflow} from './vinculacao-workflow.model';

export class Tarefa {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    postIt?: string;

    urgente?: boolean;

    observacao?: string;

    localEvento?: string;

    @Exclude({toPlainOnly: true})
    redistribuida?: boolean;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraLeitura?: moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraDistribuicao?: moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraInicioPrazo?: moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraFinalPrazo?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    dataHoraConclusaoPrazo?: moment.Moment;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    processo?: Processo;

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoWorkflow)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    vinculacaoWorkflow?: VinculacaoWorkflow;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    especieTarefa?: EspecieTarefa;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuarioResponsavel?: Usuario;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorOrigem?: Setor;

    @Exclude()
    unidadeResponsavel?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setorResponsavel?: Setor;

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
    criadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    atualizadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    atualizadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    apagadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    apagadoEm?: moment.Moment;

    distribuicaoAutomatica?: boolean;

    @Exclude({toPlainOnly: true})
    livreBalanceamento?: boolean;

    @Exclude({toPlainOnly: true})
    auditoriaDistribuicao?: string;

    @Exclude({toPlainOnly: true})
    tipoDistribuicao?: number;

    @Type(() => Folder)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    folder?: Folder;

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEtiqueta)
    vinculacoesEtiquetas?: VinculacaoEtiqueta[];

    @Type(() => Workflow)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    workflow?: Workflow;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.postIt = null;
        this.urgente = null;
        this.observacao = null;
        this.localEvento = null;
        this.redistribuida = null;
        this.dataHoraInicioPrazo = null;
        this.dataHoraFinalPrazo = null;
        this.dataHoraConclusaoPrazo = null;
        this.dataHoraLeitura = null;
        this.dataHoraDistribuicao = null;
        this.processo = null;
        this.vinculacaoWorkflow = null;
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
        this.vinculacoesEtiquetas = [];
    }
}
