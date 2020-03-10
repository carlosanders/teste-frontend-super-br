import {usuario} from './index.schema';
import {modalidadeCategoriaSigilo} from './index.schema';
import {origemDados} from './index.schema';
import {tipoSigilo} from './index.schema';
import {sigilo as sigiloSchema} from './index.schema';

sigiloSchema.define({
    modalidadeCategoriaSigilo: modalidadeCategoriaSigilo,
    tipoSigilo: tipoSigilo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const sigilo = sigiloSchema;
