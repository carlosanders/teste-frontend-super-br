import {Observable} from 'rxjs';

export interface Filter {
    field: string;
    name: string;
}

export declare interface ProcessoAutocompleteActionFilter {
    onSelected(): Observable<Filter>;
    filterSelectedState: Observable<Filter>;
}
