import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieDocumento} from '@cdk/models/especie-documento.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EspecieDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<EspecieDocumento> {
        return this.modelService.getOne('especie_documento', id)
            .pipe(
                map(response => plainToClass(EspecieDocumento, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_documento', new HttpParams({fromObject: params}));
    }

    save(especieDocumento: EspecieDocumento): Observable<EspecieDocumento> {
        if (especieDocumento.id) {
            return this.modelService.put('especie_documento', especieDocumento.id, classToPlain(especieDocumento))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieDocumento(), {...especieDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_documento', classToPlain(especieDocumento))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieDocumento(), {...especieDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<EspecieDocumento> {
        return this.modelService.delete('especie_documento', id);
    }
}
