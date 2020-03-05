import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Nome} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class NomeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Nome> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('nome', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Nome, response)[0])
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

        return this.modelService.get('nome', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Nome, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('nome', new HttpParams({fromObject: params}));
    }

    save(nome: Nome, context: any = '{}'): Observable<Nome> {
        const params = {};
        params['context'] = context;
        if (nome.id) {
            return this.modelService.put('nome', nome.id, classToPlain(nome), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Nome, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Nome(), {...nome, ...response});
                    })
                );
        } else {
            return this.modelService.post('nome', classToPlain(nome), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Nome, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Nome(), {...nome, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Nome> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('nome', id, new HttpParams({fromObject: params}));
    }
}
