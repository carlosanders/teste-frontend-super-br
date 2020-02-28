import {usuario} from './index.schema';
import {modalidadeRepresentante} from './index.schema';
import {origemDados} from './index.schema';
import {interessado} from './index.schema';
import {representante as representanteSchema} from './index.schema';

representanteSchema.define({
    modalidadeRepresentante: modalidadeRepresentante,
    interessado: interessado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const representante = representanteSchema;
