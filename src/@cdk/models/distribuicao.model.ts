import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {Documento, Setor, Tarefa, Usuario} from '@cdk/models';

export class Distribuicao {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefa?: Tarefa;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulso?: Documento;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraFinalPrazo?: moment.Moment;

    @Exclude({ toPlainOnly: true })
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioAnterior?: Usuario;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuarioPosterior?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorAnterior?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorPosterior?: Setor;

    distribuicaoAutomatica?: boolean;

    livreBalanceamento?: boolean;

    auditoriaDistribuicao?: string;

    tipoDistribuicao?: number;

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
        this.tarefa = null;
        this.documentoAvulso = null;
        this.dataHoraFinalPrazo = null;
        this.usuarioAnterior = null;
        this.usuarioPosterior = null;
        this.setorAnterior = null;
        this.setorPosterior = null;
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
