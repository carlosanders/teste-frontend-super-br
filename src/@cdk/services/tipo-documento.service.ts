import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TipoDocumento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class TipoDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<TipoDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('tipo_documento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(TipoDocumento, response)[0])
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

        return this.modelService.get('tipo_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(TipoDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('tipo_documento', new HttpParams({fromObject: params}));
    }

    save(tipoDocumento: TipoDocumento, context: any = {}): Observable<TipoDocumento> {
        const params = {};
        params['context'] = context;
        if (tipoDocumento.id) {
            return this.modelService.put('tipo_documento', tipoDocumento.id, classToPlain(tipoDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(TipoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new TipoDocumento(), {...tipoDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('tipo_documento', classToPlain(tipoDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(TipoDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new TipoDocumento(), {...tipoDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<TipoDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('tipo_documento', id, new HttpParams({fromObject: params}));
    }
}
