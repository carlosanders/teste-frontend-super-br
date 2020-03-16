import {usuario} from './index.schema';
import {tipoDocumento} from './index.schema';
import {setor} from './index.schema';
import {documento} from './index.schema';
import {numeroUnicoDocumento as numeroUnicoDocumentoSchema} from './index.schema';

numeroUnicoDocumentoSchema.define({
    tipoDocumento: tipoDocumento,
    setor: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario,
    documento: documento
});

export const numeroUnicoDocumento = numeroUnicoDocumentoSchema;
