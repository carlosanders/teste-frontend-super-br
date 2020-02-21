import {modelo} from './base.schema';
import {especieSetor} from './base.schema';
import {setor} from './base.schema';
import {usuario} from './base.schema';
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
