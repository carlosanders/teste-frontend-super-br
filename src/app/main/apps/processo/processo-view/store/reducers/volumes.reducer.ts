import * as VolumesActions from 'app/main/apps/processo/processo-view/store/actions/volumes.actions';

export interface VolumesState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    selectedVolume: any;
}

export const volumesInitialState: VolumesState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    selectedVolume: false
};

export const volumesReducer = (state = volumesInitialState, action: VolumesActions.VolumesActionsAll): VolumesState => {
    switch (action.type) {

        case VolumesActions.GET_VOLUMES: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case VolumesActions.GET_VOLUMES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case VolumesActions.GET_VOLUMES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VolumesActions.UNLOAD_VOLUMES: {

            if (action.payload.reset) {
                return {
                    ...volumesInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    selectedVolume: false,
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case VolumesActions.SELECT_VOLUME: {
            return {
                ...state,
                selectedVolume: action.payload
            };
        }

        default:
            return state;
    }
};
