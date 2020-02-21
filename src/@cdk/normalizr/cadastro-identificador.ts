import {cadastroIdentificador as cadastroIdentificadorSchema} from './base.schema';
import { origemDados } from './base.schema';
import {pessoa} from './base.schema';
import {usuario} from './base.schema';

cadastroIdentificadorSchema.define({
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const cadastroIdentificador = cadastroIdentificadorSchema;
