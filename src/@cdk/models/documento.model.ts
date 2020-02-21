import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models';
import {Processo} from '@cdk/models';
import {Pessoa} from '@cdk/models';
import {TipoDocumento} from '@cdk/models';
import {Setor} from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {OrigemDados} from '@cdk/models';
import {ComponenteDigital} from '@cdk/models';
import {VinculacaoDocumento} from '@cdk/models';
import {DocumentoAvulso} from './documento-avulso.model';
import {Modelo} from './modelo.model';
import {Repositorio} from './repositorio.model';
import {Juntada} from './juntada.model';
import {Sigilo} from './sigilo.model';

export class Documento {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    descricaoOutros?: string;

    numeroFolhas?: number;

    outroNumero?: string;

    semEfeito?: boolean;

    redator?: string;

    localizadorOriginal?: string;

    localProducao?: string;

    autor?: string;

    observacao?: string;

    copia: boolean;

    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    dataHoraProducao?: Date;

    @Type(() => Processo)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    processoOrigem?: Processo;

    @Type(() => Documento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    documentoOrigem?: Documento;

    @Type(() => Pessoa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    procedencia?: Pessoa;

    @Type(() => TipoDocumento)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tipoDocumento: TipoDocumento;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    setorOrigem?: Setor;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    tarefaOrigem?: Tarefa;

    @Type(() => Juntada)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    juntadaAtual?: Juntada;

    @Exclude({ toPlainOnly: true })
    @Type(() => OrigemDados)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    origemDados?: OrigemDados;

    @Exclude({ toPlainOnly: true })
    @Type(() => DocumentoAvulso)
    documentoAvulsoRemessa?: DocumentoAvulso;

    @Exclude({ toPlainOnly: true })
    @Type(() => Modelo)
    modelo?: Modelo;

    @Exclude({ toPlainOnly: true })
    @Type(() => Repositorio)
    repositorio?: Repositorio;

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

    @Exclude({ toPlainOnly: true })
    @Type(() => ComponenteDigital)
    componentesDigitais: ComponenteDigital[];

    @Exclude({ toPlainOnly: true })
    @Type(() => VinculacaoDocumento)
    vinculacoesDocumentos: VinculacaoDocumento[];

    @Exclude({ toPlainOnly: true })
    @Type(() => VinculacaoDocumento)
    vinculacaoDocumentoPrincipal: VinculacaoDocumento;

    @Exclude({ toPlainOnly: true })
    @Type(() => Sigilo)
    sigilos: Sigilo[];

    constructor() {
        this.id = null;
        this.uuid = null;
        this.numeroFolhas = 0;
        this.dataHoraProducao = null;
        this.outroNumero = null;
        this.semEfeito = false;
        this.localizadorOriginal = null;
        this.localProducao = null;
        this.autor = null;
        this.processoOrigem = null;
        this.documentoOrigem = null;
        this.redator = null;
        this.procedencia = null;
        this.tipoDocumento = null;
        this.descricaoOutros = null;
        this.observacao = null;
        this.copia = null;
        this.setorOrigem = null;
        this.tarefaOrigem = null;
        this.origemDados = null;
        this.modelo = null;
        this.juntadaAtual = null;
        this.repositorio = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.componentesDigitais = null;
        this.vinculacoesDocumentos = null;
        this.documentoAvulsoRemessa = null;
        this.vinculacaoDocumentoPrincipal = null;
        this.sigilos = null;
    }
}
