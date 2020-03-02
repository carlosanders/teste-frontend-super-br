import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Historico} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class HistoricoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Historico> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('historico', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Historico, response)[0])
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

        return this.modelService.get('historico', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Historico, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('historico', new HttpParams({fromObject: params}));
    }

    save(historico: Historico, context: any = {}): Observable<Historico> {
        const params = {};
        params['context'] = context;
        if (historico.id) {
            return this.modelService.put('historico', historico.id, classToPlain(historico), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Historico, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Historico(), {...historico, ...response});
                    })
                );
        } else {
            return this.modelService.post('historico', classToPlain(historico), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Historico, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Historico(), {...historico, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Historico> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('historico', id, new HttpParams({fromObject: params}));
    }
}
