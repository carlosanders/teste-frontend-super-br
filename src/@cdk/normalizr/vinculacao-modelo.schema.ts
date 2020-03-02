import {modelo} from './index.schema';
import {especieSetor} from './index.schema';
import {setor} from './index.schema';
import {usuario} from './index.schema';
import {vinculacaoModelo as vinculacaoModeloSchema} from './index.schema';

vinculacaoModeloSchema.define({
    modelo: modelo,
    especieSetor: especieSetor,
    setor: setor,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
