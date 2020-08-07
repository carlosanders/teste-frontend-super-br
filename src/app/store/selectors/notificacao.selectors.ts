import {createSelector} from '@ngrx/store';

import {Notificacao} from '@cdk/models';
import {notificacao as notificacaoSchema} from '@cdk/normalizr/notificacao.schema';
import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {NotificacaoState} from '../reducers/notificacao.reducer';
import {getNotificacaoState, State} from '../reducers';

const schemaNotificacaoSelectors = createSchemaSelectors<Notificacao>(notificacaoSchema);

// export const getNotificacaoList = createSelector(
//     getNotificacaoState,
//     (state: Notificacao) => state
// );

// export const getNotificacaoId = createSelector(
//     getNotificacaoState,
//     (state: NotificacaoState) => state
// );

// export const getNotificacao = createSelector(
//     schemaNotificacaoSelectors.getNormalizedEntities,
//     getNotificacaoId,
//     schemaNotificacaoSelectors.entityProjector
// );
