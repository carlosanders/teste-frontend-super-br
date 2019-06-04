import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoSigilo} from '@cdk/models/tipo-sigilo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class TipoSigiloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<TipoSigilo> {
        return this.modelService.getOne('tipo_sigilo', id)
            .map(response => plainToClass(TipoSigilo, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('tipo_sigilo', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(TipoSigilo, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('tipo_sigilo', new HttpParams({fromObject: params}));
    }

    save(tipoSigilo: TipoSigilo): Observable<TipoSigilo> {
        if (tipoSigilo.id) {
            return this.modelService.put('tipo_sigilo', tipoSigilo.id, classToPlain(tipoSigilo))
                .map(response => {
                    response = plainToClass(TipoSigilo, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new TipoSigilo(), {...tipoSigilo, ...response});
                });
        } else {
            return this.modelService.post('tipo_sigilo', classToPlain(tipoSigilo))
                .map(response => {
                    response = plainToClass(TipoSigilo, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new TipoSigilo(), {...tipoSigilo, ...response});
                });
        }
    }

    destroy(id: number): Observable<TipoSigilo> {
        return this.modelService.delete('tipo_sigilo', id);
    }
}
