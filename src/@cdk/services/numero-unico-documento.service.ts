import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NumeroUnicoDocumento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';

@Injectable()
export class NumeroUnicoDocumentoService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<NumeroUnicoDocumento> {
        return this.modelService.getOne('numero_unico_documento', id)
            .pipe(
                map(response => plainToClass(NumeroUnicoDocumento, response)[0])
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

        return this.modelService.get('numero_unico_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(NumeroUnicoDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('numero_unico_documento', new HttpParams({fromObject: params}));
    }

    save(numeroUnicoDocumento: NumeroUnicoDocumento): Observable<NumeroUnicoDocumento> {
        if (numeroUnicoDocumento.id) {
            return this.modelService.put('numero_unico_documento', numeroUnicoDocumento.id, classToPlain(numeroUnicoDocumento))
                .pipe(
                    map(response => {
                        response = plainToClass(NumeroUnicoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new NumeroUnicoDocumento(), {...numeroUnicoDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('numero_unico_documento', classToPlain(numeroUnicoDocumento))
                .pipe(
                    map(response => {
                        response = plainToClass(NumeroUnicoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new NumeroUnicoDocumento(), {...numeroUnicoDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<NumeroUnicoDocumento> {
        return this.modelService.delete('numero_unico_documento', id);
    }

    patch(numeroUnicoDocumento: NumeroUnicoDocumento, changes: any): Observable<NumeroUnicoDocumento> {
        return this.http.patch(
            `${environment.api_url}${'numero_unico_documento'}/${numeroUnicoDocumento.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(NumeroUnicoDocumento, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new NumeroUnicoDocumento(), {...numeroUnicoDocumento, ...response});
            })
        );
    }
}
