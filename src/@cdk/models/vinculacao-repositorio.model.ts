import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import {ModalidadeOrgaoCentral, Usuario} from '@cdk/models';
import {Repositorio} from '@cdk/models';
import {EspecieSetor} from '@cdk/models';
import {Setor} from '@cdk/models';

export class VinculacaoRepositorio {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Repositorio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modelo?: Repositorio;

    @Type(() => EspecieSetor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieSetor?: EspecieSetor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setor?: Setor;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

    @Type(() => ModalidadeOrgaoCentral)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    orgaoCentral?: ModalidadeOrgaoCentral;

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
        this.modelo = null;
        this.especieSetor = null;
        this.setor = null;
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
