import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import {ModalidadeOrgaoCentral, Usuario, VinculacaoEtiqueta, VinculacaoModelo} from '@cdk/models';
import {ModalidadeModelo} from '@cdk/models';
import {Template} from '@cdk/models';
import {Setor} from '@cdk/models';
import {Documento} from '@cdk/models';

export class Modelo {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    @Exclude({toPlainOnly: true})
    highlights?: string;

    descricao?: string;

    ativo?: boolean;

    @Type(() => ModalidadeModelo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeModelo?: ModalidadeModelo;

    @Type(() => Template)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    template?: Template;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento?: Documento;

    @Type(() => VinculacaoModelo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    vinculacoesModelos?: VinculacaoModelo[];

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
    orgaoCentral?: ModalidadeOrgaoCentral;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.ativo = null;
        this.highlights = null;
        this.modalidadeModelo = null;
        this.template = null;
        this.vinculacoesModelos = [];
        this.documento = null;
        this.setor = null;
        this.unidade = null;
        this.usuario = null;
        this.orgaoCentral = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
