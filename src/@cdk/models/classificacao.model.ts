import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models';
import {ModalidadeDestinacao} from '@cdk/models';

export class Classificacao {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome: string;

    @Type(() => ModalidadeDestinacao)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeDestinacao?: ModalidadeDestinacao;

    prazoGuardaFaseCorrenteAno?: number;

    prazoGuardaFaseCorrenteMes?: number;    

    prazoGuardaFaseCorrenteDia?: number;

    prazoGuardaFaseCorrenteEvento?: string;

    prazoGuardaFaseIntermediariaAno?: number;

    prazoGuardaFaseIntermediariaMes?: number;

    prazoGuardaFaseIntermediariaDia?: number;

    prazoGuardaFaseIntermediariaEvento?: string;

    codigo: string;

    ativo: boolean;

    permissaoUso: boolean;

    observacao?: string;

    @Type(() => Classificacao)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    parent?: Classificacao;

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
        this.modalidadeDestinacao = null;
        this.prazoGuardaFaseCorrenteAno = null;
        this.prazoGuardaFaseCorrenteDia = null;
        this.prazoGuardaFaseCorrenteMes = null;
        this.prazoGuardaFaseCorrenteEvento = null;
        this.prazoGuardaFaseIntermediariaDia = null;
        this.prazoGuardaFaseIntermediariaMes = null;
        this.prazoGuardaFaseIntermediariaAno = null;
        this.prazoGuardaFaseIntermediariaEvento = null;
        this.codigo = null;
        this.permissaoUso = null;
        this.observacao = null;
        this.parent = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
