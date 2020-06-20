import {usuario, vinculacaoEtiqueta} from './index.schema';
import {documento} from './index.schema';
import {tipoRelatorio} from './index.schema';
import {relatorio as relatorioSchema} from './index.schema';

relatorioSchema.define({
    tipoRelatorio: tipoRelatorio,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    vinculacoesEtiquetas: [vinculacaoEtiqueta]
});

export const relatorio = relatorioSchema;
