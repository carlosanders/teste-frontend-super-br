import {createSelector} from '@ngrx/store';
import {CalendarioAppState, CalendarioState, getCalendarioAppState} from 'app/main/apps/calendario/store/reducers';

import {createSchemaSelectors} from '@cdk/ngrx-normalizr';
import {tarefa as tarefaSchema} from '@cdk/normalizr';
import {Tarefa} from '@cdk/models';
import {CalendarEventModel} from '../../event.model';

const schemaSelectors = createSchemaSelectors<Tarefa>(tarefaSchema);

export const getCalendarioState: any = createSelector(
    getCalendarioAppState,
    (state: CalendarioAppState) => state.tarefas
);

export const getTarefasIds: any = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.entitiesId
);

export const getTarefas: any = createSelector(
    schemaSelectors.getNormalizedEntities,
    getTarefasIds,
    schemaSelectors.entitiesProjector
);

export const getEvents: any = (context: string) => createSelector(
    getTarefas,
    (tarefas: Tarefa[]): CalendarEventModel[] => {
        if (tarefas) {
            return tarefas.map((tarefa: Tarefa) => {
                const data = {
                    start    : (context === 'evento' ? tarefa.dataHoraInicioPrazo : tarefa.dataHoraFinalPrazo),
                    end      : tarefa.dataHoraFinalPrazo,
                    title    : tarefa.especieTarefa.nome,
                    allDay   : false,
                    color    : {
                        primary  : tarefa.especieTarefa.corHexadecimalPrimaria ?? '#F44336',
                        secondary: tarefa.especieTarefa.corHexadecimalSecundaria ?? '#FFCDD2'
                    },
                    resizable: {
                        beforeStart: (context === 'evento'),
                        afterEnd   : (context === 'evento')
                    },
                    draggable: (context === 'evento'),
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


export const getPagination: any = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.pagination
);

export const getTarefasLoaded: any = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.loaded
);

export const getIsLoading: any = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.loading
);

export const getDeletingTarefaIds: any = createSelector(
    getCalendarioState,
    (state: CalendarioState) => state.deletingTarefaIds
);
