import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieTarefa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EspecieTarefaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<EspecieTarefa> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('especie_tarefa', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(EspecieTarefa, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('especie_tarefa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieTarefa, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('especie_tarefa', new HttpParams({fromObject: params}));
    }

    save(especieTarefa: EspecieTarefa, context: any = '{}'): Observable<EspecieTarefa> {
        const params = {};
        params['context'] = context;
        if (especieTarefa.id) {
            return this.modelService.put('especie_tarefa', especieTarefa.id, classToPlain(especieTarefa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieTarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieTarefa(), {...especieTarefa, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_tarefa', classToPlain(especieTarefa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieTarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieTarefa(), {...especieTarefa, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<EspecieTarefa> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('especie_tarefa', id, new HttpParams({fromObject: params}));
    }
}
