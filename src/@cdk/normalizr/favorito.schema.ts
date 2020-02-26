import {setor} from './base.schema';
import {usuario} from './base.schema';
import {especieAtividade} from './base.schema';
import {especieTarefa} from './base.schema';
import {favorito as favoritoSchema} from './base.schema';

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
