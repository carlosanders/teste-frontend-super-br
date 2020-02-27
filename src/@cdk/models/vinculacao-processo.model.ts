import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models';
import {Processo} from '@cdk/models';
import {ModalidadeVinculacaoProcesso} from '@cdk/models';

export class VinculacaoProcesso {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processo: Processo;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processoVinculado: Processo;

    @Type(() => ModalidadeVinculacaoProcesso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeVinculacaoProcesso: ModalidadeVinculacaoProcesso;

    observacao?: string;

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
        this.processo = null;
        this.processoVinculado = null;
        this.modalidadeVinculacaoProcesso = null;
        this.observacao = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
