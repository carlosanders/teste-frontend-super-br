import {Exclude} from 'class-transformer';


export class GeneroRelatorio {

    @Exclude({toPlainOnly: true})
    id?: number;

    nome?: string;

    descricao?: string;

    especiesRelatorios?: boolean;

    // //Todo: Especies Relatórios
    // @Type(() => Processo)
    // @Transform(value => value ? value.id : null, {toPlainOnly: true})
    // generoRelatorio?: Processo;


    constructor() {
        this.id = null;
        this.nome = null;
        this.descricao = null;
        this.especiesRelatorios = null;
    }
}
