import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {Usuario} from '@cdk/models';
import {EspecieRelatorio} from '@cdk/models/especie-relatorio.model';

export class TipoRelatorio {

    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome?: string;

    templateHTML?: string;

    DQL?: string;

    parametros?: string;

    descricao?: string;

    ativo?: boolean;

    limite?: number;

    @Type(() => EspecieRelatorio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieRelatorio?: EspecieRelatorio;

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
        this.descricao = null;
        this.templateHTML = null;
        this.DQL = null;
        this.parametros = null;
        this.limite = null;
        this.ativo = null;
        this.especieRelatorio = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
