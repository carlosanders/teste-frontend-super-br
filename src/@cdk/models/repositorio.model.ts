import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import {Usuario, VinculacaoRepositorio} from '@cdk/models';
import {ModalidadeRepositorio} from '@cdk/models';
import {Documento} from '@cdk/models';

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

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    vinculacoesRepositorios?: VinculacaoRepositorio[];

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
        this.nome = null;
        this.descricao = null;
        this.ativo = null;
        this.highlights = null;
        this.modalidadeRepositorio = null;
        this.vinculacoesRepositorios = [];
        this.documento = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
