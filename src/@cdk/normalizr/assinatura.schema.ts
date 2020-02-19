import {assinatura as assinaturaSchema} from './base.schema';
import {componenteDigital} from './componente-digital.schema';
import {origemDados} from './origem-dados.schema';
import {usuario} from './usuario.schema';

assinaturaSchema.define({
    componenteDigital: componenteDigital,
    origemDados: origemDados,
    usuario: usuario
});

export const assinatura = assinaturaSchema;
