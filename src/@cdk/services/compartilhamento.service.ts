import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Compartilhamento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class CompartilhamentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Compartilhamento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('compartilhamento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Compartilhamento, response)[0])
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

        return this.modelService.get('compartilhamento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Compartilhamento, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('compartilhamento', new HttpParams({fromObject: params}));
    }

    save(compartilhamento: Compartilhamento, context: any = '{}'): Observable<Compartilhamento> {
        const params = {};
        params['context'] = context;
        if (compartilhamento.id) {
            return this.modelService.put('compartilhamento', compartilhamento.id, classToPlain(compartilhamento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Compartilhamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Compartilhamento(), {...compartilhamento, ...response});
                    })
                );
        } else {
            return this.modelService.post('compartilhamento', classToPlain(compartilhamento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Compartilhamento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Compartilhamento(), {...compartilhamento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Compartilhamento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('compartilhamento', id, new HttpParams({fromObject: params}));
    }
}
