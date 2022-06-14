import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {Acao, ModalidadeEtiqueta, ModalidadeOrgaoCentral, Setor, Usuario, VinculacaoEtiqueta} from '@cdk/models';

export class Etiqueta {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    nome?: string;

    descricao?: string;

    corHexadecimal?: string;

    ativo?: boolean;

    sistema?: boolean;

    @Type(() => ModalidadeEtiqueta)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeEtiqueta?: ModalidadeEtiqueta;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuario?: Usuario;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    setor?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    unidade?: Setor;

    @Type(() => VinculacaoEtiqueta)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    vinculacoesEtiquetas?: VinculacaoEtiqueta[];

    @Type(() => Acao)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    acoes?: Acao[];

    @Type(() => ModalidadeOrgaoCentral)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modalidadeOrgaoCentral?: ModalidadeOrgaoCentral;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    criadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    criadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    atualizadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    atualizadoEm?: moment.Moment;

    @Exclude({toPlainOnly: true})
    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    apagadoPor?: Usuario;

    @Exclude({toPlainOnly: true})
    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    apagadoEm?: moment.Moment;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.ativo = null;
        this.sistema = null;
        this.descricao = null;
        this.corHexadecimal = null;
        this.modalidadeEtiqueta = null;
        this.usuario = null;
        this.setor = null;
        this.unidade = null;
        this.modalidadeOrgaoCentral = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
