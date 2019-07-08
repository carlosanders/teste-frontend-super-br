import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrigemDados} from '@cdk/models/origem-dados.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class OrigemDadosService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<OrigemDados> {
        return this.modelService.getOne('origem_dados', id)
            .pipe(
                map(response => plainToClass(OrigemDados, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('origem_dados', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(OrigemDados, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('origem_dados', new HttpParams({fromObject: params}));
    }

    save(origemDados: OrigemDados): Observable<OrigemDados> {
        if (origemDados.id) {
            return this.modelService.put('origem_dados', origemDados.id, classToPlain(origemDados))
                .pipe(
                    map(response => {
                        response = plainToClass(OrigemDados, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new OrigemDados(), {...origemDados, ...response});
                    })
                );
        } else {
            return this.modelService.post('origem_dados', classToPlain(origemDados))
                .pipe(
                    map(response => {
                        response = plainToClass(OrigemDados, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new OrigemDados(), {...origemDados, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<OrigemDados> {
        return this.modelService.delete('origem_dados', id);
    }
}
