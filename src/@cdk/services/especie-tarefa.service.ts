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

    get(id: number): Observable<EspecieTarefa> {
        return this.modelService.getOne('especie_tarefa', id)
            .pipe(
                map(response => plainToClass(EspecieTarefa, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_tarefa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieTarefa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_tarefa', new HttpParams({fromObject: params}));
    }

    save(especieTarefa: EspecieTarefa): Observable<EspecieTarefa> {
        if (especieTarefa.id) {
            return this.modelService.put('especie_tarefa', especieTarefa.id, classToPlain(especieTarefa))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieTarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieTarefa(), {...especieTarefa, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_tarefa', classToPlain(especieTarefa))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieTarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieTarefa(), {...especieTarefa, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<EspecieTarefa> {
        return this.modelService.delete('especie_tarefa', id);
    }
}
