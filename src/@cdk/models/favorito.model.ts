import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models';
import {EspecieAtividade} from '@cdk/models';
import {Setor} from '@cdk/models';
import {EspecieTarefa} from '@cdk/models';

export class Favorito {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => EspecieAtividade)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieAtividade: EspecieAtividade;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorResponsavel: Setor;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    usuario: Usuario;

    @Type(() => EspecieTarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieTarefa: EspecieTarefa;

    qtdUso?: number;

    prioritario: boolean;

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
        this.qtdUso = null;
        this.prioritario = null;
        this.especieAtividade = null;
        this.setorResponsavel = null;
        this.usuario = null;
        this.especieTarefa = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
