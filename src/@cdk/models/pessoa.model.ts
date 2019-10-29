import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models/usuario.model';
import { Pais } from '@cdk/models/pais.model';
import { ModalidadeGeneroPessoa } from '@cdk/models/modalidade-genero-pessoa.model';
import { Municipio } from '@cdk/models/municipio.model';
import { ModalidadeQualificacaoPessoa } from '@cdk/models/modalidade-qualificacao-pessoa.model';
import { OrigemDados } from '@cdk/models/origem-dados.model';

export class Pessoa {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    nome: string;

    numeroDocumentoPrincipal: string;

    contato?: string;

    pessoaValidada: boolean;

    pessoaRepresentada: boolean;

    @Transform(value => value ? value.format('YYYY-MM-DD') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataNascimento?: Date;

    @Transform(value => value ? value.format('YYYY-MM-DD') : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataObito?: Date;

    nomeGenitor?: string;

    nomeGenitora?: string;

    profissao?: string;

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
    modalidadeQualificacaoPessoa: ModalidadeQualificacaoPessoa;

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
        this.nome = null;
        this.naturalidade = null;
        this.profissao = null;
        this.contato = null;
        this.pessoaValidada = null;
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
    }
}
