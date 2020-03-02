import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Lembrete} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class LembreteService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Lembrete> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('lembrete', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Lembrete, response)[0])
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

        return this.modelService.get('lembrete', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Lembrete, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('lembrete', new HttpParams({fromObject: params}));
    }

    save(lembrete: Lembrete, context: any = '{}'): Observable<Lembrete> {
        const params = {};
        params['context'] = context;
        if (lembrete.id) {
            return this.modelService.put('lembrete', lembrete.id, classToPlain(lembrete), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Lembrete, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Lembrete(), {...lembrete, ...response});
                    })
                );
        } else {
            return this.modelService.post('lembrete', classToPlain(lembrete), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Lembrete, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Lembrete(), {...lembrete, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Lembrete> {
        return this.modelService.delete('lembrete', id, new HttpParams({fromObject: params}));
    }
}
