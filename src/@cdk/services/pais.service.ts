import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Pais} from '@cdk/models/pais.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class PaisService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Pais> {
        return this.modelService.getOne('pais', id)
            .pipe(
                map(response => plainToClass(Pais, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('pais', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Pais, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('pais', new HttpParams({fromObject: params}));
    }

    save(pais: Pais): Observable<Pais> {
        if (pais.id) {
            return this.modelService.put('pais', pais.id, classToPlain(pais))
                .pipe(
                    map(response => {
                        response = plainToClass(Pais, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Pais(), {...pais, ...response});
                    })
                );
        } else {
            return this.modelService.post('pais', classToPlain(pais))
                .pipe(
                    map(response => {
                        response = plainToClass(Pais, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Pais(), {...pais, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Pais> {
        return this.modelService.delete('pais', id);
    }
}
