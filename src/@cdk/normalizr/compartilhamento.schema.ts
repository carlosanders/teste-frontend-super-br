import {usuario} from './base.schema';
import {compartilhamento as compartilhamentoSchema} from './base.schema';

compartilhamentoSchema.define({
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const compartilhamento = compartilhamentoSchema;
