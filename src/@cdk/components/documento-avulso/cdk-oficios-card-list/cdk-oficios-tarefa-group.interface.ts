export interface CdkOficiosTarefaGroupInterface {
    tarefaId: number;
    nupFormatado?: string;
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
    loaded: any;
    saving: boolean;
    loading: boolean;
    error?: any;
}
