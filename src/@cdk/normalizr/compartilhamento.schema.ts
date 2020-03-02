import {usuario} from './index.schema';
import {compartilhamento as compartilhamentoSchema} from './index.schema';

compartilhamentoSchema.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const compartilhamento = compartilhamentoSchema;
