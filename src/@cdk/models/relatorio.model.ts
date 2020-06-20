import {Type, Transform, Exclude} from 'class-transformer';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Documento} from './documento.model';
import {VinculacaoEtiqueta} from './vinculacao-etiqueta.model';
import * as moment from 'moment';
import {Usuario} from './usuario.model';

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
        this.formato = null;
        this.documento = null;
        this.observacao = null;
        this.tipoRelatorio = null;
        this.parametros = null;
        this.vinculacoesEtiquetas = [];
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
