import {usuario} from './usuario.schema';
import {modalidadeRepresentante} from './modalidade-representante.schema';
import {origemDados} from './origem-dados.schema';
import {interessado} from './interessado.schema';
import {representante as representanteSchema} from './base.schema';

representanteSchema.define({
    modalidadeRepresentante: modalidadeRepresentante,
    interessado: interessado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const representante = representanteSchema;
