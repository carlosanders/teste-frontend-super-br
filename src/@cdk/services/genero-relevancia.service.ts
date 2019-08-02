import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroRelevancia} from '@cdk/models/genero-relevancia.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GeneroRelevanciaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GeneroRelevancia> {
        return this.modelService.getOne('genero_relevancia', id)
            .pipe(
                map(response => plainToClass(GeneroRelevancia, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_relevancia', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroRelevancia, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('genero_relevancia', new HttpParams({fromObject: params}));
    }

    save(generoRelevancia: GeneroRelevancia): Observable<GeneroRelevancia> {
        if (generoRelevancia.id) {
            return this.modelService.put('genero_relevancia', generoRelevancia.id, classToPlain(generoRelevancia))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroRelevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroRelevancia(), {...generoRelevancia, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_relevancia', classToPlain(generoRelevancia))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroRelevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroRelevancia(), {...generoRelevancia, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<GeneroRelevancia> {
        return this.modelService.delete('genero_relevancia', id);
    }
}
