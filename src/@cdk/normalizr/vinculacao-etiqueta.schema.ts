import {schema} from '@cdk/normalizr-src';
import {etiqueta} from './etiqueta.schema';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';
import {documento} from './documento.schema';

export const vinculacaoEtiqueta = new schema.Entity('vinculacaoEtiqueta', {
    etiqueta: etiqueta,
    documento: documento,
    processo: processo,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
