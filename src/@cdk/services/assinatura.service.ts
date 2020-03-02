import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Assinatura} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class AssinaturaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Assinatura> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('assinatura', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Assinatura, response)[0])
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

        return this.modelService.get('assinatura', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Assinatura, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('assinatura', new HttpParams({fromObject: params}));
    }

    save(assinatura: Assinatura, context: any = {}): Observable<Assinatura> {
        const params = {};
        params['context'] = context;
        if (assinatura.id) {
            return this.modelService.put('assinatura', assinatura.id, classToPlain(assinatura), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Assinatura, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Assinatura(), {...assinatura, ...response});
                    })
                );
        } else {
            return this.modelService.post('assinatura', classToPlain(assinatura), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Assinatura, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Assinatura(), {...assinatura, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Assinatura> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('assinatura', id, new HttpParams({fromObject: params}));
    }
}
