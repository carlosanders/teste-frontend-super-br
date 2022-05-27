import {Exclude, Transform, Type} from 'class-transformer';
import {Modulo} from './modulo.model';

export class ConfigModulo {

    @Exclude({toPlainOnly: true})
    id?: number;

    @Exclude({toPlainOnly: true})
    uuid?: string;

    @Type(() => ConfigModulo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    paradigma?: ConfigModulo;

    nome: string;

    descricao: string;

    dataSchema?: string;

    dataType?: string;

    dataValue?: string;

    @Type(() => Modulo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    modulo?: Modulo;

    mandatory: boolean;

    invalid: boolean;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.descricao = null;
        this.dataSchema = null;
        this.dataType = null;
        this.dataValue = null;
        this.modulo = null;
        this.mandatory = null;
        this.invalid = null;
    }
}
