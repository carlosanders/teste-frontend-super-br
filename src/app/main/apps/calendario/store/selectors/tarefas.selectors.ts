import {createSelector} from '@ngrx/store';
import {getCalendarioAppState, CalendarioAppState, CalendarioState} from 'app/main/apps/calendario/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {CalendarEventModel} from '../../event.model';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getCalendarioState = createSelector(
    getCalendarioAppState,
    (state: CalendarioAppState) => state.tarefas
);

export const getTarefasIds = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.entitiesId
);

export const getTarefas = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getEvents = createSelector(
    getTarefas,
    (tarefas: Tarefa[]): CalendarEventModel[] => {
        if (tarefas) {
            return tarefas.map((tarefa: Tarefa) => {
                const data = {
                    start    : tarefa.dataHoraInicioPrazo,
                    end      : tarefa.dataHoraFinalPrazo,
                    title    : tarefa.especieTarefa.nome,
                    allDay   : false,
                    color    : {
                        primary  : tarefa.especieTarefa.corHexadecimalPrimaria ?? '#F44336',
                        secondary: tarefa.especieTarefa.corHexadecimalSecundaria ?? '#FFCDD2'
                    },
                    resizable: {
                        beforeStart: true,
                        afterEnd   : true
                    },
                    draggable: true,
                    meta     : {
                        location: tarefa.localEvento,
                        notes   : tarefa.observacao,
                        tarefa  : tarefa
                    }
                };

                return new CalendarEventModel(data);
            });
        } else {
            return [];
        }

    }
);


export const getPagination = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.pagination
);

export const getTarefasLoaded = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.loaded
);

export const getIsLoading = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.loading
);

export const getDeletingTarefaIds = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.deletingTarefaIds
);
