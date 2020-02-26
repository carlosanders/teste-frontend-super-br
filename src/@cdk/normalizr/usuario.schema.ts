import {colaborador, usuario as usuarioSchema} from './base.schema';

usuarioSchema.define({
    colaborador: colaborador
});

export const usuario = usuarioSchema;
