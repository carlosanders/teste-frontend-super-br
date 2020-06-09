import {usuario} from './index.schema';
import {especieRelatorio} from './especie-relatorio.schema';
import {tipoRelatorio as tipoRelatorioSchema} from './index.schema';

tipoRelatorioSchema.define({
    especieRelatorio: especieRelatorio,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const tipoRelatorio = tipoRelatorioSchema;
