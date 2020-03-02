import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Desentranhamento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class DesentranhamentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Desentranhamento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('desentranhamento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Desentranhamento, response)[0])
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

        return this.modelService.get('desentranhamento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Desentranhamento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('desentranhamento', new HttpParams({fromObject: params}));
    }

    save(desentranhamento: Desentranhamento, context: any = {}): Observable<Desentranhamento> {
        const params = {};
        params['context'] = context;
        if (desentranhamento.id) {
            return this.modelService.put('desentranhamento', desentranhamento.id, classToPlain(desentranhamento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Desentranhamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Desentranhamento(), {...desentranhamento, ...response});
                    })
                );
        } else {
            return this.modelService.post('desentranhamento', classToPlain(desentranhamento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Desentranhamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Desentranhamento(), {...desentranhamento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Desentranhamento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('desentranhamento', id, new HttpParams({fromObject: params}));
    }
}
