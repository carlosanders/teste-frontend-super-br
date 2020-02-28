import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Acao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {map} from 'rxjs/operators';

@Injectable()
export class AcaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Acao> {
        return this.modelService.getOne('acao', id)
            .pipe(
                map(response => plainToClass(Acao, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('acao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Acao, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('acao', new HttpParams({fromObject: params}));
    }

    save(acao: Acao): Observable<Acao> {
        if (acao.id) {
            return this.modelService.put('acao', acao.id, classToPlain(acao))
                .pipe(
                    map(response => {
                        response = plainToClass(Acao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Acao(), {...acao, ...response});
                    })
                );
        } else {
            return this.modelService.post('acao', classToPlain(acao))
                .pipe(
                    map(response => {
                        response = plainToClass(Acao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Acao(), {...acao, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Acao> {
        return this.modelService.delete('acao', id);
    }
}
