import {modelo} from './modelo.schema';
import {especieSetor} from './especie-setor.schema';
import {setor} from './setor.schema';
import {usuario} from './usuario.schema';
import {vinculacaoModelo as vinculacaoModeloSchema} from './base.schema';

vinculacaoModeloSchema.define({
    modelo: modelo,
    especieSetor: especieSetor,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
