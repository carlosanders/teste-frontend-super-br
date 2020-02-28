import {usuario} from './index.schema';
import {modalidadeTipoInibidor as modalidadeTipoInibidorSchema} from './index.schema';

modalidadeTipoInibidorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeTipoInibidor = modalidadeTipoInibidorSchema;
