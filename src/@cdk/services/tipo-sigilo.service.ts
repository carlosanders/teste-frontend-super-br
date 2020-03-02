import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TipoSigilo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class TipoSigiloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<TipoSigilo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('tipo_sigilo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(TipoSigilo, response)[0])
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

        return this.modelService.get('tipo_sigilo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(TipoSigilo, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('tipo_sigilo', new HttpParams({fromObject: params}));
    }

    save(tipoSigilo: TipoSigilo, context: any = '{}'): Observable<TipoSigilo> {
        const params = {};
        params['context'] = context;
        if (tipoSigilo.id) {
            return this.modelService.put('tipo_sigilo', tipoSigilo.id, classToPlain(tipoSigilo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(TipoSigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new TipoSigilo(), {...tipoSigilo, ...response});
                    })
                );
        } else {
            return this.modelService.post('tipo_sigilo', classToPlain(tipoSigilo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(TipoSigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new TipoSigilo(), {...tipoSigilo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<TipoSigilo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('tipo_sigilo', id, new HttpParams({fromObject: params}));
    }
}
