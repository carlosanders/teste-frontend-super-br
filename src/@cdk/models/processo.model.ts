import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';
import { Usuario } from '@cdk/models/usuario.model';
import { EspecieProcesso } from '@cdk/models/especie-processo.model';
import { Setor } from '@cdk/models/setor.model';

import {ModalidadeFase} from '@cdk/models/modalidade-fase.model';
import {ModalidadeMeio} from '@cdk/models/modalidade-meio.model';

import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Classificacao} from '@cdk/models/classificacao.model';
import {Pessoa} from '@cdk/models/pessoa.model';
import {Localizador} from '@cdk/models/localizador.model';
import {OrigemDados} from '@cdk/models/origem-dados.model';
import {VinculacaoEtiqueta} from './vinculacao-etiqueta.model';

export class Processo {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processoOrigem: Processo;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    novo: boolean;

    NUP: string;

    semValorEconomico: boolean;

    visibilidadeExterna: boolean;

    acessoNegado: boolean;
    
    titulo: string;

    descricao?: string;
    
    outroNumero?: string;

    @Exclude({ toPlainOnly: true })
    chaveAcesso: string;

    @Exclude({ toPlainOnly: true })
    valorEconomico?: number;

    @Type(() => Classificacao)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    classificacao: Classificacao;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

    @Exclude({ toPlainOnly: true })
    @Type(() => DocumentoAvulso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoAvulsoOrigem?: DocumentoAvulso;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    procedencia: Pessoa;

    @Type(() => Localizador)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    localizador?: Localizador;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorAtual: Setor;

    @Exclude({ toPlainOnly: true })
    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorInicial: Setor;
    
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraAbertura: Date;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraProximaTransicao?: Date;

    @Type(() => ModalidadeFase)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeFase: ModalidadeFase;

    @Type(() => ModalidadeMeio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeMeio: ModalidadeMeio;

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoEtiqueta)
    vinculacoesEtiquetas: VinculacaoEtiqueta[];

    @Type(() => EspecieProcesso)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieProcesso: EspecieProcesso;
    
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
        this.processoOrigem = null;
        this.uuid = null;
        this.novo = null;
        this.descricao = null;
        this.valorEconomico = null;
        this.semValorEconomico = null;
        this.NUP = null;
        this.especieProcesso = null;
        this.visibilidadeExterna = null;
        this.dataHoraAbertura = null;
        this.acessoNegado = null;
        this.dataHoraProximaTransicao = null;
        this.titulo = null;
        this.outroNumero = null;
        this.chaveAcesso = null;
        this.modalidadeMeio = null;
        this.modalidadeFase = null;
        this.documentoAvulsoOrigem = null;
        this.classificacao = null;
        this.procedencia = null;
        this.localizador = null;
        this.setorAtual = null;
        this.setorInicial = null;
        this.origemDados = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.vinculacoesEtiquetas = null;
    }
}
