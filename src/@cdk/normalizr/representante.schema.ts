import {usuario} from './base.schema';
import {modalidadeRepresentante} from './base.schema';
import {origemDados} from './base.schema';
import {interessado} from './base.schema';
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
