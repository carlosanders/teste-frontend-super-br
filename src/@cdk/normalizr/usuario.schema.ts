import {usuario as usuarioSchema} from './base.schema';
import {colaborador} from "./colaborador.schema";

usuarioSchema.define({
    colaborador: colaborador
});

export const usuario = usuarioSchema;
