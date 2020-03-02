import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Relevancia} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class RelevanciaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Relevancia> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('relevancia', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Relevancia, response)[0])
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

        return this.modelService.get('relevancia', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Relevancia, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('relevancia', new HttpParams({fromObject: params}));
    }

    save(relevancia: Relevancia, context: any = {}): Observable<Relevancia> {
        const params = {};
        params['context'] = context;
        if (relevancia.id) {
            return this.modelService.put('relevancia', relevancia.id, classToPlain(relevancia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Relevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Relevancia(), {...relevancia, ...response});
                    })
                );
        } else {
            return this.modelService.post('relevancia', classToPlain(relevancia), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Relevancia, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Relevancia(), {...relevancia, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Relevancia> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('relevancia', id, new HttpParams({fromObject: params}));
    }
}
