import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AssuntoAdministrativo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class AssuntoAdministrativoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<AssuntoAdministrativo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('assunto_administrativo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(AssuntoAdministrativo, response)[0])
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

        return this.modelService.get('assunto_administrativo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(AssuntoAdministrativo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('assunto_administrativo', new HttpParams({fromObject: params}));
    }

    save(assuntoAdministrativo: AssuntoAdministrativo, context: any = {}): Observable<AssuntoAdministrativo> {
        const params = {};
        params['context'] = context;
        if (assuntoAdministrativo.id) {
            return this.modelService.put('assunto_administrativo', assuntoAdministrativo.id, classToPlain(assuntoAdministrativo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(AssuntoAdministrativo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new AssuntoAdministrativo(), {...assuntoAdministrativo, ...response});
                    })
                );
        } else {
            return this.modelService.post('assunto_administrativo', classToPlain(assuntoAdministrativo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(AssuntoAdministrativo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new AssuntoAdministrativo(), {...assuntoAdministrativo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<AssuntoAdministrativo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('assunto_administrativo', id, new HttpParams({fromObject: params}));
    }
}
