import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Municipio} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class MunicipioService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Municipio> {
        return this.modelService.getOne('municipio', id)
            .pipe(
                map(response => plainToClass(Municipio, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('municipio', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Municipio, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('municipio', new HttpParams({fromObject: params}));
    }

    save(municipio: Municipio): Observable<Municipio> {
        if (municipio.id) {
            return this.modelService.put('municipio', municipio.id, classToPlain(municipio))
                .pipe(
                    map(response => {
                        response = plainToClass(Municipio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Municipio(), {...municipio, ...response});
                    })
                );
        } else {
            return this.modelService.post('municipio', classToPlain(municipio))
                .pipe(
                    map(response => {
                        response = plainToClass(Municipio, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Municipio(), {...municipio, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Municipio> {
        return this.modelService.delete('municipio', id);
    }
}
