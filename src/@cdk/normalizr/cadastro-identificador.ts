import {cadastroIdentificador as cadastroIdentificadorSchema} from './base.schema';
import { origemDados } from './origem-dados.schema';
import {pessoa} from './pessoa.schema';
import {usuario} from './usuario.schema';

cadastroIdentificadorSchema.define({
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const cadastroIdentificador = cadastroIdentificadorSchema;
