import {Exclude, Transform, Type} from 'class-transformer';
import {Modulo} from './modulo.model';
import {Usuario} from "./usuario.model";
import * as moment from "moment";

export class ConfigModulo {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    @Type(() => ConfigModulo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    paradigma?: ConfigModulo;

    nome: string;

    sigla: string;

    descricao: string;

    dataSchema?: string;

    dataType?: string;

    dataValue?: string;

    @Type(() => Modulo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modulo?: Modulo;

    mandatory: boolean;

    invalid: boolean;

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
        this.nome = null;
        this.sigla = null;
        this.descricao = null;
        this.dataSchema = null;
        this.dataType = null;
        this.dataValue = null;
        this.modulo = null;
        this.mandatory = null;
        this.invalid = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
