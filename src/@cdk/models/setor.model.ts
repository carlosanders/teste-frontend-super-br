import * as moment from 'moment';
import { Type, Transform, Exclude } from 'class-transformer';
import { EspecieSetor } from '@cdk/models';
import { ModalidadeOrgaoCentral } from '@cdk/models';
import { Municipio } from '@cdk/models';
import { GeneroSetor } from '@cdk/models';
import { Usuario } from '@cdk/models';

export class Setor {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;


    apenasProtocolo: boolean;


    endereco?: string;

    @Exclude({ toPlainOnly: true })
    email?: string;


    sigla: string;


    apenasDistribuidor: boolean;


    nome: string;


    ativo?: boolean;


    prefixoNUP?: string;


    sequenciaInicialNUP?: number;


    gerenciamento?: boolean;


    numeracaoDocumentoUnidade?: boolean;


    distribuicaoCentena?: boolean;


    prazoEqualizacao?: number;

    @Exclude({ toPlainOnly: true })
    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidade: Setor;

    @Exclude({ toPlainOnly: true })
    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    parent?: Setor;

    @Exclude({ toPlainOnly: true })
    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidadePai?: Setor;

    @Exclude({ toPlainOnly: true })
    @Type(() => Municipio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    municipio: Municipio;

    @Exclude({ toPlainOnly: true })
    @Type(() => GeneroSetor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    generoSetor?: GeneroSetor;

    @Exclude({ toPlainOnly: true })
    @Type(() => EspecieSetor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieSetor?: EspecieSetor;

    @Exclude({ toPlainOnly: true })
    @Type(() => ModalidadeOrgaoCentral)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    modalidadeOrgaoCentral?: ModalidadeOrgaoCentral;

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
        this.especieSetor = null;
        this.generoSetor = null;
        this.ativo = null;
        this.modalidadeOrgaoCentral = null;
        this.endereco = null;
        this.email = null;
        this.sigla = null;
        this.unidade = null;
        this.parent = null;
        this.unidadePai = null;
        this.municipio = null;
        this.prefixoNUP = null;
        this.sequenciaInicialNUP = null;
        this.gerenciamento = null;
        this.apenasProtocolo = null;
        this.numeracaoDocumentoUnidade = null;
        this.apenasDistribuidor = null;
        this.distribuicaoCentena = null;
        this.prazoEqualizacao = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
