import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Repositorio} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {Pessoa} from '@cdk/models';

@Injectable()
export class RepositorioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Repositorio> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('repositorio', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Repositorio, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('repositorio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Repositorio, response['entities']), response['total']))
            );
    }

    search(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.search('repositorio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('repositorio', new HttpParams({fromObject: params}));
    }

    save(repositorio: Repositorio, context: any = {}): Observable<Repositorio> {
        const params = {};
        params['context'] = context;
        if (repositorio.id) {

            return this.modelService.put('repositorio', repositorio.id, classToPlain(repositorio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Repositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Repositorio(), {...repositorio, ...response});
                    })
                );
        } else {
            return this.modelService.post('repositorio', classToPlain(repositorio), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Repositorio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Repositorio(), {...repositorio, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Repositorio> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('repositorio', id, new HttpParams({fromObject: params}));
    }
}
