import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrigemDados} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class OrigemDadosService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<OrigemDados> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('origem_dados', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(OrigemDados, response)[0])
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

        return this.modelService.get('origem_dados', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(OrigemDados, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('origem_dados', new HttpParams({fromObject: params}));
    }

    save(origemDados: OrigemDados, context: any = '{}'): Observable<OrigemDados> {
        const params = {};
        params['context'] = context;
        if (origemDados.id) {
            return this.modelService.put('origem_dados', origemDados.id, classToPlain(origemDados), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(OrigemDados, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new OrigemDados(), {...origemDados, ...response});
                    })
                );
        } else {
            return this.modelService.post('origem_dados', classToPlain(origemDados), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(OrigemDados, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new OrigemDados(), {...origemDados, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<OrigemDados> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('origem_dados', id, new HttpParams({fromObject: params}));
    }
}
