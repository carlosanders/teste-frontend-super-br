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

    get(id: number): Observable<Lembrete> {
        return this.modelService.getOne('lembrete', id)
            .pipe(
                map(response => plainToClass(Lembrete, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('lembrete', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Lembrete, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('lembrete', new HttpParams({fromObject: params}));
    }

    save(lembrete: Lembrete): Observable<Lembrete> {
        if (lembrete.id) {
            return this.modelService.put('lembrete', lembrete.id, classToPlain(lembrete))
                .pipe(
                    map(response => {
                        response = plainToClass(Lembrete, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Lembrete(), {...lembrete, ...response});
                    })
                );
        } else {
            return this.modelService.post('lembrete', classToPlain(lembrete))
                .pipe(
                    map(response => {
                        response = plainToClass(Lembrete, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Lembrete(), {...lembrete, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Lembrete> {
        return this.modelService.delete('lembrete', id);
    }
}
