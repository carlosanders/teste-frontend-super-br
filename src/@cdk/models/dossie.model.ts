import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';
import {Documento, OrigemDados, Pessoa, Processo, TipoDossie, Usuario} from '@cdk/models';

export class Dossie {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    origemDados: OrigemDados;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    pessoa?: Pessoa;

    @Type(() => TipoDossie)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tipoDossie?: TipoDossie;

    @Transform(value => value ? value.format('YYYY-MM-DDTHH:mm:ss') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataConsulta?: moment.Moment;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    documento?: Documento;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    processo?: Processo;

    sobDemanda?: boolean;

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

    conteudo: string;

    protocoloRequerimento: string;

    statusRequerimento: string;

    numeroDocumentoPrincipal: string;

    fonteDados: string;

    versao: number;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.pessoa = null;
        this.processo = null;
        this.origemDados = null;
        this.documento = null;
        this.tipoDossie = null;
        this.numeroDocumentoPrincipal = null;
        this.dataConsulta = null;
        this.conteudo = null;
        this.protocoloRequerimento = null;
        this.statusRequerimento = null;
        this.fonteDados = null;
        this.versao = null;
        this.sobDemanda = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
