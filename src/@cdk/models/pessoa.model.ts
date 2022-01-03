import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';

import {ModalidadeGeneroPessoa, ModalidadeQualificacaoPessoa, Municipio, OrigemDados, Pais, Usuario, Dossie} from '@cdk/models';

export class Pessoa {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Transform(value => value ? value.format('YYYY-MM-DD') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataNascimento?: moment.Moment;

    @Transform(value => value ? value.format('YYYY-MM-DD') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataObito?: moment.Moment;

    @Type(() => Pais)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    nacionalidade?: Pais;

    @Type(() => ModalidadeGeneroPessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeGeneroPessoa?: ModalidadeGeneroPessoa;

    @Type(() => Municipio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    naturalidade?: Municipio;

    @Type(() => ModalidadeQualificacaoPessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeQualificacaoPessoa?: ModalidadeQualificacaoPessoa;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

    @Exclude({toPlainOnly: true})
    @Type(() => Dossie)
    dossies?: Dossie[];

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

    nome?: string;

    numeroDocumentoPrincipal?: string;

    contato?: string;

    pessoaValidada?: boolean;

    pessoaConveniada?: boolean;

    nomeGenitor?: string;

    nomeGenitora?: string;

    profissao?: string;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.nome = null;
        this.naturalidade = null;
        this.profissao = null;
        this.contato = null;
        this.pessoaValidada = null;
        this.pessoaConveniada = null;
        this.dataNascimento = null;
        this.dataObito = null;
        this.nacionalidade = null;
        this.numeroDocumentoPrincipal = null;
        this.nomeGenitor = null;
        this.nomeGenitora = null;
        this.modalidadeGeneroPessoa = null;
        this.modalidadeQualificacaoPessoa = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.dossies = [];
    }
}
