import {Type, Transform, Exclude} from 'class-transformer';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Documento} from './documento.model';
import {VinculacaoEtiqueta} from './vinculacao-etiqueta.model';

export class Relatorio {

    @Exclude({ toPlainOnly: true })
    id?: number;

    observacao?: string;

    formato?: string;

    @Type(() => TipoRelatorio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tipoRelatorio?: TipoRelatorio;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documento?: Documento;

    parametros?: string;

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEtiqueta)
    vinculacoesEtiquetas?: VinculacaoEtiqueta[];

    constructor() {
        this.id = null;
        this.formato = null;
        this.observacao = null;
        this.tipoRelatorio = null;
        this.parametros = null;
        this.vinculacoesEtiquetas = [];
    }
}
