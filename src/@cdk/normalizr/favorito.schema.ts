import {setor} from './index.schema';
import {usuario} from './index.schema';
import {especieAtividade} from './index.schema';
import {especieTarefa} from './index.schema';
import {favorito as favoritoSchema} from './index.schema';

favoritoSchema.define({
    especieAtividade: especieAtividade,
    setorResponsavel: setor,
    usuario: usuario,
    especieTarefa: especieTarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const favorito = favoritoSchema;
