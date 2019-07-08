import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Distribuicao} from '@cdk/models/distribuicao.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class DistribuicaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Distribuicao> {
        return this.modelService.getOne('distribuicao', id)
            .pipe(
                map(response => plainToClass(Distribuicao, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('distribuicao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Distribuicao, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('distribuicao', new HttpParams({fromObject: params}));
    }

    save(distribuicao: Distribuicao): Observable<Distribuicao> {
        if (distribuicao.id) {
            return this.modelService.put('distribuicao', distribuicao.id, classToPlain(distribuicao))
                .pipe(
                    map(response => {
                        response = plainToClass(Distribuicao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Distribuicao(), {...distribuicao, ...response});
                    })
                );
        } else {
            return this.modelService.post('distribuicao', classToPlain(distribuicao))
                .pipe(
                    map(response => {
                        response = plainToClass(Distribuicao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Distribuicao(), {...distribuicao, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Distribuicao> {
        return this.modelService.delete('distribuicao', id);
    }
}
