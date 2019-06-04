import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneroDocumento} from '@cdk/models/genero-documento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GeneroDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GeneroDocumento> {
        return this.modelService.getOne('genero_documento', id)
            .map(response => plainToClass(GeneroDocumento, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_documento', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(GeneroDocumento, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('genero_documento', new HttpParams({fromObject: params}));
    }

    save(generoDocumento: GeneroDocumento): Observable<GeneroDocumento> {
        if (generoDocumento.id) {
            return this.modelService.put('genero_documento', generoDocumento.id, classToPlain(generoDocumento))
                .map(response => {
                    response = plainToClass(GeneroDocumento, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new GeneroDocumento(), {...generoDocumento, ...response});
                });
        } else {
            return this.modelService.post('genero_documento', classToPlain(generoDocumento))
                .map(response => {
                    response = plainToClass(GeneroDocumento, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new GeneroDocumento(), {...generoDocumento, ...response});
                });
        }
    }

    destroy(id: number): Observable<GeneroDocumento> {
        return this.modelService.delete('genero_documento', id);
    }
}
