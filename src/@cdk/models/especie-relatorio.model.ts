import {Exclude, Transform, Type} from 'class-transformer';
import {GeneroRelatorio} from './genero-relatorio.model';

export class EspecieRelatorio {

    @Exclude({toPlainOnly: true})
    id?: number;

    nome?: string;

    ativo?: boolean;

    descricao?: string;

    @Type(() => GeneroRelatorio)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    generoRelatorio?: GeneroRelatorio;


    constructor() {
        this.id = null;
        this.nome = null;
        this.ativo = null;
        this.descricao = null;
        this.generoRelatorio = null;
    }
}
