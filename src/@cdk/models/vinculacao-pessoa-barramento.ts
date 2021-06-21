import { Type, Transform, Exclude } from 'class-transformer';
import {Pessoa, Usuario} from '@cdk/models';
import * as moment from "moment";

export class VinculacaoPessoaBarramento {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    pessoa?: Pessoa;

    repositorio: number;

    estrutura: number;

    nomeRepositorio: string;

    nomeEstrutura: string;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    criadoPor?: Usuario;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    atualizadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    apagadoEm?: Date;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    apagadoPor?: Usuario;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    atualizadoEm?: Date;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    criadoEm?: Date;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.repositorio = null;
        this.estrutura = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
