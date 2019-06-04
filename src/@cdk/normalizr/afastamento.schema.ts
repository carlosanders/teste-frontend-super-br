import {schema} from '@cdk/normalizr-src';
import {modalidadeAfastamento} from './modalidade-afastamento.schema';
import {colaborador} from './colaborador.schema';
import {usuario} from './usuario.schema';

export const afastamento = new schema.Entity('afastamento', {
    modalidadeAfastamento: modalidadeAfastamento,
    colaborador: colaborador,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

