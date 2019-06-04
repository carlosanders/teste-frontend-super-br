import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EspecieDocumentoAvulso} from '@cdk/models/especie-documento-avulso.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EspecieDocumentoAvulsoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<EspecieDocumentoAvulso> {
        return this.modelService.getOne('especie_documento_avulso', id)
            .map(response => plainToClass(EspecieDocumentoAvulso, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_documento_avulso', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(EspecieDocumentoAvulso, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_documento_avulso', new HttpParams({fromObject: params}));
    }

    save(especieDocumentoAvulso: EspecieDocumentoAvulso): Observable<EspecieDocumentoAvulso> {
        if (especieDocumentoAvulso.id) {
            return this.modelService.put('especie_documento_avulso', especieDocumentoAvulso.id, classToPlain(especieDocumentoAvulso))
                .map(response => {
                    response = plainToClass(EspecieDocumentoAvulso, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieDocumentoAvulso(), {...especieDocumentoAvulso, ...response});
                });
        } else {
            return this.modelService.post('especie_documento_avulso', classToPlain(especieDocumentoAvulso))
                .map(response => {
                    response = plainToClass(EspecieDocumentoAvulso, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieDocumentoAvulso(), {...especieDocumentoAvulso, ...response});
                });
        }
    }

    destroy(id: number): Observable<EspecieDocumentoAvulso> {
        return this.modelService.delete('especie_documento_avulso', id);
    }
}
