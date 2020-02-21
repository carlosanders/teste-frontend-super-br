import {usuario} from './base.schema';
import {modalidadeAlvoInibidor as modalidadeAlvoInibidorSchema} from './base.schema';

modalidadeAlvoInibidorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeAlvoInibidor = modalidadeAlvoInibidorSchema;
