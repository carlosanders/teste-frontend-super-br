import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pessoa} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class PessoaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Pessoa> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('pessoa', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Pessoa, response)[0])
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

        return this.modelService.get('pessoa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pessoa, response['entities']), response['total']))
            );
    }

    search(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.search('pessoa', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('pessoa', new HttpParams({fromObject: params}));
    }

    save(pessoa: Pessoa, context: any = '{}'): Observable<Pessoa> {
        const params = {};
        params['context'] = context;
        if (pessoa.id) {
            return this.modelService.put('pessoa', pessoa.id, classToPlain(pessoa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Pessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Pessoa(), {...pessoa, ...response});
                    })
                );
        } else {
            return this.modelService.post('pessoa', classToPlain(pessoa), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Pessoa, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Pessoa(), {...pessoa, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Pessoa> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('pessoa', id, new HttpParams({fromObject: params}));
    }
}
