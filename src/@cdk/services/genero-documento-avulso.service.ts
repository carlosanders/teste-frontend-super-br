import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneroDocumentoAvulso} from '@cdk/models/genero-documento-avulso.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GeneroDocumentoAvulsoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GeneroDocumentoAvulso> {
        return this.modelService.getOne('genero_documento_avulso', id)
            .map(response => plainToClass(GeneroDocumentoAvulso, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_documento_avulso', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(GeneroDocumentoAvulso, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('genero_documento_avulso', new HttpParams({fromObject: params}));
    }

    save(generoDocumentoAvulso: GeneroDocumentoAvulso): Observable<GeneroDocumentoAvulso> {
        if (generoDocumentoAvulso.id) {
            return this.modelService.put('genero_documento_avulso', generoDocumentoAvulso.id, classToPlain(generoDocumentoAvulso))
                .map(response => {
                    response = plainToClass(GeneroDocumentoAvulso, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new GeneroDocumentoAvulso(), {...generoDocumentoAvulso, ...response});
                });
        } else {
            return this.modelService.post('genero_documento_avulso', classToPlain(generoDocumentoAvulso))
                .map(response => {
                    response = plainToClass(GeneroDocumentoAvulso, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new GeneroDocumentoAvulso(), {...generoDocumentoAvulso, ...response});
                });
        }
    }

    destroy(id: number): Observable<GeneroDocumentoAvulso> {
        return this.modelService.delete('genero_documento_avulso', id);
    }
}
