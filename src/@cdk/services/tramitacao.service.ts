import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tramitacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class TramitacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Tramitacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('tramitacao', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Tramitacao, response)[0])
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

        return this.modelService.get('tramitacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Tramitacao, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('tramitacao', new HttpParams({fromObject: params}));
    }

    save(tramitacao: Tramitacao, context: any = {}): Observable<Tramitacao> {
        const params = {};
        params['context'] = context;
        if (tramitacao.id) {
            return this.modelService.put('tramitacao', tramitacao.id, classToPlain(tramitacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Tramitacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Tramitacao(), {...tramitacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('tramitacao', classToPlain(tramitacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Tramitacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Tramitacao(), {...tramitacao, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Tramitacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('tramitacao', id, new HttpParams({fromObject: params}));
    }
}
