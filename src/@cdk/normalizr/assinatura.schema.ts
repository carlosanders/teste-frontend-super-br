import {assinatura as assinaturaSchema} from './index.schema';
import {componenteDigital} from './index.schema';
import {origemDados} from './index.schema';
import {usuario} from './index.schema';

assinaturaSchema.define({
    componenteDigital: componenteDigital,
    origemDados: origemDados,
    usuario: usuario
});

export const assinatura = assinaturaSchema;
