import {usuario} from './index.schema';
import {modalidadeAlvoInibidor as modalidadeAlvoInibidorSchema} from './index.schema';

modalidadeAlvoInibidorSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeAlvoInibidor = modalidadeAlvoInibidorSchema;
