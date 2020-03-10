import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EspecieDocumento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class EspecieDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<EspecieDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('especie_documento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(EspecieDocumento, response)[0])
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

        return this.modelService.get('especie_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(EspecieDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('especie_documento', new HttpParams({fromObject: params}));
    }

    save(especieDocumento: EspecieDocumento, context: any = '{}'): Observable<EspecieDocumento> {
        const params = {};
        params['context'] = context;
        if (especieDocumento.id) {
            return this.modelService.put('especie_documento', especieDocumento.id, classToPlain(especieDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieDocumento(), {...especieDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('especie_documento', classToPlain(especieDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(EspecieDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new EspecieDocumento(), {...especieDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<EspecieDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('especie_documento', id, new HttpParams({fromObject: params}));
    }
}
