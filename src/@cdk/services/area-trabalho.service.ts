import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AreaTrabalho} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class AreaTrabalhoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<AreaTrabalho> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('area_trabalho', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(AreaTrabalho, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('area_trabalho', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(AreaTrabalho, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('area_trabalho', new HttpParams({fromObject: params}));
    }

    save(areaTrabalho: AreaTrabalho, context: any = {}): Observable<AreaTrabalho> {
        const params = {};
        params['context'] = context;
        if (areaTrabalho.id) {
            return this.modelService.put('area_trabalho', areaTrabalho.id, classToPlain(areaTrabalho), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(AreaTrabalho, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new AreaTrabalho(), {...areaTrabalho, ...response});
                    })
                );
        } else {
            return this.modelService.post('area_trabalho', classToPlain(areaTrabalho), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(AreaTrabalho, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new AreaTrabalho(), {...areaTrabalho, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<AreaTrabalho> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('area_trabalho', id, new HttpParams({fromObject: params}));
    }
}
