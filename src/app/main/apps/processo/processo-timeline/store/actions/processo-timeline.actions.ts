import {Action} from '@ngrx/store';

export const GET_TIMELINE = '[PROCESSO TIMELINE] GET TIMELINE';
export const GET_TIMELINE_SUCCESS = '[PROCESSO TIMELINE] GET TIMELINE SUCCESS';
export const GET_TIMELINE_FAILED = '[PROCESSO TIMELINE] GET TIMELINE FAILED';

export class GetTimeline implements Action
{
    readonly type = GET_TIMELINE;

    constructor(public payload: any)
    {
    }
}

export class GetTimelineSuccess implements Action
{
    readonly type = GET_TIMELINE_SUCCESS;

    constructor(public payload: any)
    {
    }
}
export class GetTimelineFailed implements Action
{
    readonly type = GET_TIMELINE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ProcessoTimelineActionsAll
    =  GetTimeline
    | GetTimelineSuccess
    | GetTimelineFailed
    ;
