import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroAtividade} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GeneroAtividadeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<GeneroAtividade> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('genero_atividade', id, new HttpParams({fromObject: params}))
            .pipe(response => plainToClass(GeneroAtividade, response)[0]);
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('genero_atividade', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroAtividade, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('genero_atividade', new HttpParams({fromObject: params}));
    }

    save(generoAtividade: GeneroAtividade, context: any = '{}'): Observable<GeneroAtividade> {
        const params = {};
        params['context'] = context;
        if (generoAtividade.id) {
            return this.modelService.put('genero_atividade', generoAtividade.id, classToPlain(generoAtividade), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroAtividade, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroAtividade(), {...generoAtividade, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_atividade', classToPlain(generoAtividade), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroAtividade, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroAtividade(), {...generoAtividade, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<GeneroAtividade> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('genero_atividade', id, new HttpParams({fromObject: params}));
    }
}
