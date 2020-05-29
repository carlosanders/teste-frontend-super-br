import {usuario} from './index.schema';
import {documento} from './index.schema';
import {tipoRelatorio} from './index.schema';
import {relatorio as relatorioSchema} from './index.schema';

relatorioSchema.define({
    tipoRelatorio: tipoRelatorio,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const relatorio = relatorioSchema;
