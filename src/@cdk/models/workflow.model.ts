import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {EspecieTarefa, GeneroProcesso, Usuario} from '@cdk/models';
import {VinculacaoEspecieProcessoWorkflow} from './vinculacao-especie-processo-workflow.model';

export class Workflow {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    descricao?: string;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieTarefaInicial?: EspecieTarefa;

    @Type(() => GeneroProcesso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    generoProcesso?: GeneroProcesso;

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEspecieProcessoWorkflow)
    vinculacoesEspecieProcessoWorkflow?: VinculacaoEspecieProcessoWorkflow[];

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
        this.nome = null;
        this.descricao = null;
        this.especieTarefaInicial = null;
        this.generoProcesso = null;
        this.vinculacoesEspecieProcessoWorkflow = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
