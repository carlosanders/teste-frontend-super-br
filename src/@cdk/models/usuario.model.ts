import * as moment from 'moment';
import {Exclude, Transform, Type} from 'class-transformer';
import {Colaborador, ComponenteDigital, VinculacaoUsuario} from '@cdk/models';
import {VinculacaoPessoaUsuario} from './vinculacao-pessoa-usuario.model';
import {Coordenador} from './coordenador.model';

export class Usuario {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    username?: string;

    assinaturaHTML?: string;

    email?: string;

    enabled?: boolean;

    validado?: boolean;

    nivelAcesso?: number;

    nome?: string;

    plainPassword?: string;

    currentPlainPassword?: string;

    jwt?: string;

    isDisponivel?: boolean;

    primeiroAcesso?: boolean;

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

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoUsuario)
    vinculacoesUsuariosPrincipais?: VinculacaoUsuario[];

    @Exclude({toPlainOnly: true})
    @Type(() => Colaborador)
    colaborador?: Colaborador;

    @Exclude({toPlainOnly: true})
    roles?: string[];

    @Exclude({toPlainOnly: true})
    @Type(() => VinculacaoPessoaUsuario)
    vinculacoesPessoasUsuarios: VinculacaoPessoaUsuario[];

    @Exclude({toPlainOnly: true})
    @Type(() => Coordenador)
    coordenadores?: Coordenador[];

    @Type(() => ComponenteDigital)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    imgPerfil?: ComponenteDigital;

    @Type(() => ComponenteDigital)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    imgChancela?: ComponenteDigital;

    constructor() {
        this.id = null;
        this.uuid = null;
        this.username = null;
        this.nome = null;
        this.assinaturaHTML = null;
        this.email = null;
        this.enabled = null;
        this.validado = null;
        this.nivelAcesso = null;
        this.colaborador = null;
        this.roles = null;
        this.vinculacoesUsuariosPrincipais = [];
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
        this.vinculacoesPessoasUsuarios = [];
        this.coordenadores = [];
        this.plainPassword = null;
        this.currentPlainPassword = null;
        this.jwt = null;
        this.isDisponivel = null;
        this.primeiroAcesso = null;
        this.imgPerfil = null;
        this.imgChancela = null;
    }
}
