import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroTarefa} from '@cdk/models/genero-tarefa.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GeneroTarefaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GeneroTarefa> {
        return this.modelService.getOne('genero_tarefa', id)
            .pipe(
                map(response => plainToClass(GeneroTarefa, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_tarefa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroTarefa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('genero_tarefa', new HttpParams({fromObject: params}));
    }

    save(generoTarefa: GeneroTarefa): Observable<GeneroTarefa> {
        if (generoTarefa.id) {
            return this.modelService.put('genero_tarefa', generoTarefa.id, classToPlain(generoTarefa))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroTarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroTarefa(), {...generoTarefa, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_tarefa', classToPlain(generoTarefa))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroTarefa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroTarefa(), {...generoTarefa, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<GeneroTarefa> {
        return this.modelService.delete('genero_tarefa', id);
    }
}
