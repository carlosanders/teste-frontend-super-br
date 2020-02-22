import {assinatura as assinaturaSchema} from './base.schema';
import {componenteDigital} from './base.schema';
import {origemDados} from './base.schema';
import {usuario} from './base.schema';

assinaturaSchema.define({
    componenteDigital: componenteDigital,
    origemDados: origemDados,
    usuario: usuario
});

export const assinatura = assinaturaSchema;
