import {usuario} from './usuario.schema';
import {modalidadeTipoInibidor as modalidadeTipoInibidorSchema} from './base.schema';

modalidadeTipoInibidorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeTipoInibidor = modalidadeTipoInibidorSchema;
