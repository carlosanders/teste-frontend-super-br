import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Transicao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class TransicaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Transicao> {
        return this.modelService.getOne('transicao', id)
            .pipe(
                map(response => plainToClass(Transicao, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('transicao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Transicao, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('transicao', new HttpParams({fromObject: params}));
    }

    save(transicao: Transicao): Observable<Transicao> {
        if (transicao.id) {
            return this.modelService.put('transicao', transicao.id, classToPlain(transicao))
                .pipe(
                    map(response => {
                        response = plainToClass(Transicao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Transicao(), {...transicao, ...response});
                    })
                );
        } else {
            return this.modelService.post('transicao', classToPlain(transicao))
                .pipe(
                    map(response => {
                        response = plainToClass(Transicao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Transicao(), {...transicao, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Transicao> {
        return this.modelService.delete('transicao', id);
    }
}
