import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Afastamento} from '@cdk/models/afastamento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {map} from 'rxjs/operators';

@Injectable()
export class AfastamentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Afastamento> {
        return this.modelService.getOne('afastamento', id)
            .pipe(
                map(response => plainToClass(Afastamento, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('afastamento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Afastamento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('afastamento', new HttpParams({fromObject: params}));
    }

    save(afastamento: Afastamento): Observable<Afastamento> {
        if (afastamento.id) {
            return this.modelService.put('afastamento', afastamento.id, classToPlain(afastamento))
                .pipe(
                    map(response => {
                        response = plainToClass(Afastamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Afastamento(), {...afastamento, ...response});
                    })
                );
        } else {
            return this.modelService.post('afastamento', classToPlain(afastamento))
                .pipe(
                    map(response => {
                        response = plainToClass(Afastamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Afastamento(), {...afastamento, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Afastamento> {
        return this.modelService.delete('afastamento', id);
    }
}
