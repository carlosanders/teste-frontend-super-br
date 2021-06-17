import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {
    Documento,
    ModalidadeOrgaoCentral,
    ModalidadeRepositorio,
    Setor,
    Usuario,
    VinculacaoRepositorio
} from '@cdk/models';

export class Repositorio {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    @Exclude({toPlainOnly: true})
    highlights?: string;

    descricao?: string;

    ativo?: boolean;

    @Type(() => ModalidadeRepositorio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeRepositorio?: ModalidadeRepositorio;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento?: Documento;

    @Type(() => VinculacaoRepositorio)
    vinculacoesRepositorios?: VinculacaoRepositorio[];

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

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setor?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidade?: Setor;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

    @Type(() => ModalidadeOrgaoCentral)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeOrgaoCentral?: ModalidadeOrgaoCentral;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.ativo = null;
        this.highlights = null;
        this.modalidadeRepositorio = null;
        this.vinculacoesRepositorios = [];
        this.documento = null;
        this.setor = null;
        this.unidade = null;
        this.usuario = null;
        this.modalidadeOrgaoCentral = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
