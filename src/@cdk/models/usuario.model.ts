import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';
import {VinculacaoUsuario} from '@cdk/models';
import {Colaborador} from '@cdk/models';
import {VinculacaoPessoaUsuario} from './vinculacao-pessoa-usuario.model';
import {Coordenador} from "./coordenador.model";

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

    password?: string;

    jwt?: string;

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
        this.password = null;
        this.jwt = null;
    }
}
