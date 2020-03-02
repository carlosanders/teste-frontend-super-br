import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Garantia} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GarantiaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Garantia> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('garantia', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Garantia, response)[0])
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

        return this.modelService.get('garantia', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Garantia, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('garantia', new HttpParams({fromObject: params}));
    }

    save(garantia: Garantia, context: any = '{}'): Observable<Garantia> {
        const params = {};
        params['context'] = context;
        if (garantia.id) {
            return this.modelService.put('garantia', garantia.id, classToPlain(garantia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Garantia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Garantia(), {...garantia, ...response});
                    })
                );
        } else {
            return this.modelService.post('garantia', classToPlain(garantia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Garantia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Garantia(), {...garantia, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Garantia> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('garantia', id, new HttpParams({fromObject: params}));
    }
}
