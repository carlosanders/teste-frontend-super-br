import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ModalidadeOrgaoCentral, Setor, Usuario} from '@cdk/models';

export class Coordenador {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setor?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidade?: Setor;

    @Type(() => ModalidadeOrgaoCentral)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    orgaoCentral?: ModalidadeOrgaoCentral;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario?: Usuario;

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
        this.setor = null;
        this.unidade = null;
        this.orgaoCentral = null;
        this.usuario = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
