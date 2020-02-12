import {schema} from '@cdk/normalizr-src';
import {colaborador} from "./colaborador.schema";

export const usuario = new schema.Entity('usuario', {
    colaborador: colaborador
});
