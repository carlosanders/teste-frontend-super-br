import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Setor} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class SetorService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<Setor> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('setor', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Setor, response)[0])
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

        return this.modelService.get('setor', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Setor, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('setor', new HttpParams({fromObject: params}));
    }

    save(setor: Setor, context: any = '{}'): Observable<Setor> {
        const params = {};
        params['context'] = context;
        if (setor.id) {
            return this.modelService.put('setor', setor.id, classToPlain(setor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Setor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Setor(), {...setor, ...response});
                    })
                );
        } else {
            return this.modelService.post('setor', classToPlain(setor), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Setor, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Setor(), {...setor, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Setor> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('setor', id, new HttpParams({fromObject: params}));
    }
}
