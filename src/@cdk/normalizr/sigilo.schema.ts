import {usuario} from './base.schema';
import {modalidadeCategoriaSigilo} from './base.schema';
import {origemDados} from './base.schema';
import {tipoSigilo} from './base.schema';
import {sigilo as sigiloSchema} from './base.schema';

sigiloSchema.define({
    modalidadeCategoriaSigilo: modalidadeCategoriaSigilo,
    tipoSigilo: tipoSigilo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const sigilo = sigiloSchema;
