import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';

import { Usuario } from '@cdk/models/usuario.model';
import {Processo} from '@cdk/models/processo.model';
import {Pessoa} from '@cdk/models/pessoa.model';
import {TipoDocumento} from '@cdk/models/tipo-documento.model';
import {Setor} from '@cdk/models/setor.model';
import {Tarefa} from '@cdk/models/tarefa.model';
import {OrigemDados} from '@cdk/models/origem-dados.model';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {VinculacaoDocumento} from '@cdk/models/vinculacao-documento.model';
import {DocumentoAvulso} from './documento-avulso.model';
import {Modelo} from './modelo.model';
import {Repositorio} from './repositorio.model';

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

    constructor() {
        this.id = null;
        this.uuid = null;
        this.numeroFolhas = null;
        this.dataHoraProducao = null;
        this.outroNumero = null;
        this.semEfeito = null;
        this.localizadorOriginal = null;
        this.localProducao = null;
        this.autor = null;
        this.processoOrigem = null;
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
        this.repositorio = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.componentesDigitais = [];
        this.vinculacoesDocumentos = [];
        this.documentoAvulsoRemessa = null;
        this.vinculacaoDocumentoPrincipal = null;
    }
}
