import {cadastroIdentificador as cadastroIdentificadorSchema} from './index.schema';
import { origemDados } from './index.schema';
import {pessoa} from './index.schema';
import {usuario} from './index.schema';

cadastroIdentificadorSchema.define({
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const cadastroIdentificador = cadastroIdentificadorSchema;
