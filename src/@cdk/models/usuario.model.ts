import * as moment from 'moment';
import {Type, Transform, Exclude} from 'class-transformer';
import {VinculacaoUsuario} from '@cdk/models';
import {Colaborador} from '@cdk/models';

export class Usuario {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    uuid?: string;

    @Exclude({ toPlainOnly: true })
    username?: string;

    assinaturaHTML?: string;

    @Exclude({ toPlainOnly: true })
    email?: string;

    @Exclude({ toPlainOnly: true })
    enabled?: boolean;

    @Exclude({ toPlainOnly: true })
    nivelAcesso?: number;

    @Exclude({ toPlainOnly: true })
    nome?: string;

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

    constructor() {
        this.id = null;
        this.uuid = null;
        this.username = null;
        this.nome = null;
        this.assinaturaHTML = null;
        this.email = null;
        this.enabled = null;
        this.nivelAcesso = null;
        this.colaborador = null;
        this.roles = null;
        this.vinculacoesUsuariosPrincipais = null;
        this.criadoPor = null;
        this.criadoEm = null;
        this.atualizadoPor = null;
        this.atualizadoEm = null;
        this.apagadoPor = null;
        this.apagadoEm = null;
    }
}
