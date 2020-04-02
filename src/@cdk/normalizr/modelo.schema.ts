import {usuario} from './index.schema';
import {documento} from './index.schema';
import {vinculacaoModelo} from './index.schema';
import {modalidadeMeio} from './index.schema';
import {template} from './index.schema';
import {modelo as modeloSchema} from './index.schema';

modeloSchema.define({
    modalidadeModelo: modalidadeMeio,
    template: template,
    documento: documento,
    vinculacaoModelo: vinculacaoModelo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modelo = modeloSchema;
