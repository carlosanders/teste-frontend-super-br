import {usuario} from './usuario.schema';
import {modalidadeCategoriaSigilo} from './modalidade-categoria-sigilo.schema';
import {origemDados} from './origem-dados.schema';
import {tipoSigilo} from './tipo-sigilo.schema';
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
