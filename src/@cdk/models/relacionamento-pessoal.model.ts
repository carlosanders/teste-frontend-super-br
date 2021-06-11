import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ModalidadeRelacionamentoPessoal, OrigemDados, Pessoa, Usuario} from '@cdk/models';

export class RelacionamentoPessoal {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    pessoa?: Pessoa;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    pessoaRelacionada?: Pessoa;

    @Type(() => ModalidadeRelacionamentoPessoal)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeRelacionamentoPessoal?: ModalidadeRelacionamentoPessoal;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

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
        this.pessoa = null;
        this.pessoaRelacionada = null;
        this.modalidadeRelacionamentoPessoal = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
