import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';
import {EspecieSetor, GeneroSetor, ModalidadeOrgaoCentral, Municipio, Usuario} from '@cdk/models';

export class Setor {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    apenasProtocolo?: boolean;

    endereco?: string;

    email?: string;

    sigla?: string;

    apenasDistribuidor?: boolean;

    nome?: string;

    ativo?: boolean;

    prefixoNUP?: string;

    sequenciaInicialNUP?: number;

    gerenciamento?: boolean;

    numeracaoDocumentoUnidade?: boolean;

    distribuicaoCentena?: boolean;

    prazoEqualizacao?: number;

    divergenciaMaxima?: number;

    apenasDistribuicaoAutomatica?: boolean;

    comPrevencaoRelativa?: boolean;

    hasChild?: any;

    children?: any;

    expandable?: boolean;

    level?: number;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidade?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    parent?: Setor;

    @Type(() => Setor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    unidadePai?: Setor;

    @Type(() => Municipio)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    municipio?: Municipio;

    @Type(() => GeneroSetor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    generoSetor?: GeneroSetor;

    @Type(() => EspecieSetor)
    @Transform(value => value ? value.id : null, { toPlainOnly: true })
    especieSetor?: EspecieSetor;

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
        this.distribuicaoCentena = false;
        this.prazoEqualizacao = 7;
        this.divergenciaMaxima = 25;
        this.apenasDistribuicaoAutomatica = null;
        this.comPrevencaoRelativa = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.hasChild = null;
        this.children = null;
        this.expandable = null;
        this.level = null;
    }
}
