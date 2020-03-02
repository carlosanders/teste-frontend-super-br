import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Modelo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {Pessoa} from '@cdk/models';

@Injectable()
export class ModeloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Modelo> {
        return this.modelService.getOne('modelo', id)
            .pipe(
                map(response => plainToClass(Modelo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modelo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Modelo, response['entities']), response['total']))
            );
    }

    search(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.search('modelo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pessoa, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modelo', new HttpParams({fromObject: params}));
    }

    save(modelo: Modelo): Observable<Modelo> {
        if (modelo.id) {

            return this.modelService.put('modelo', modelo.id, classToPlain(modelo))
                .pipe(
                    map(response => {
                        response = plainToClass(Modelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Modelo(), {...modelo, ...response});
                    })
                );
        } else {
            return this.modelService.post('modelo', classToPlain(modelo))
                .pipe(
                    map(response => {
                        response = plainToClass(Modelo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Modelo(), {...modelo, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Modelo> {
        return this.modelService.delete('modelo', id);
    }
}
