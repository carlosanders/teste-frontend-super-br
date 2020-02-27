import {generoProcesso} from './genero-processo.schema';
import {usuario} from './usuario.schema';
import {especieProcesso as especieProcessoSchema} from './base.schema';

especieProcessoSchema.define({
    generoProcesso: generoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const especieProcesso = especieProcessoSchema;
