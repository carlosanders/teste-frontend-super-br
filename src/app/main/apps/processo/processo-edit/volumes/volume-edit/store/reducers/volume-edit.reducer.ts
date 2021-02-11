import * as VolumeEditActions from '../actions/volume-edit.actions';

export interface VolumeEditState {
    volumeId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const VolumeEditInitialState: VolumeEditState = {
    volumeId: null,
    saving: false,
    errors: false,
    loading: false,
    loaded: false
};

export function VolumeEditReducer(
    state = VolumeEditInitialState,
    action: VolumeEditActions.VolumeEditActionsAll
): VolumeEditState {
    switch (action.type) {

        case VolumeEditActions.GET_VOLUME: {
            return {
                ...state,
                volumeId: null,
                loading: true
            };
        }

        case VolumeEditActions.GET_VOLUME_SUCCESS: {

            return {
                ...state,
                volumeId: action.payload.volumeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VolumeEditActions.CREATE_VOLUME: {
            return {
                ...state,
                volumeId: null,
                loaded: {
                    id: 'volumeHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case VolumeEditActions.GET_VOLUME_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case VolumeEditActions.SAVE_VOLUME: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VolumeEditActions.SAVE_VOLUME_SUCCESS: {
            return {
                ...state,
                errors: false
            };
        }

        case VolumeEditActions.SAVE_VOLUME_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case VolumeEditActions.UNLOAD_STORE: {
            return {
                ...VolumeEditInitialState
            };
        }

        default:
            return state;
    }
}
