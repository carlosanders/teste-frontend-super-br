import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoDocumento} from '@cdk/models/tipo-documento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class TipoDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<TipoDocumento> {
        return this.modelService.getOne('tipo_documento', id)
            .map(response => plainToClass(TipoDocumento, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('tipo_documento', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(TipoDocumento, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('tipo_documento', new HttpParams({fromObject: params}));
    }

    save(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
        if (tipoDocumento.id) {
            return this.modelService.put('tipo_documento', tipoDocumento.id, classToPlain(tipoDocumento))
                .map(response => {
                    response = plainToClass(TipoDocumento, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new TipoDocumento(), {...tipoDocumento, ...response});
                });
        } else {
            return this.modelService.post('tipo_documento', classToPlain(tipoDocumento))
                .map(response => {
                    response = plainToClass(TipoDocumento, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new TipoDocumento(), {...tipoDocumento, ...response});
                });
        }
    }

    destroy(id: number): Observable<TipoDocumento> {
        return this.modelService.delete('tipo_documento', id);
    }
}
