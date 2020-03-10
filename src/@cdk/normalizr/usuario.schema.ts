import {colaborador, usuario as usuarioSchema} from './index.schema';

usuarioSchema.define({
    colaborador: colaborador
});

export const usuario = usuarioSchema;
