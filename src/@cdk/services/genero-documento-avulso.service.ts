import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroDocumentoAvulso} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GeneroDocumentoAvulsoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = '{}'): Observable<GeneroDocumentoAvulso> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('genero_documento_avulso', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(GeneroDocumentoAvulso, response)[0])
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

        return this.modelService.get('genero_documento_avulso', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroDocumentoAvulso, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('genero_documento_avulso', new HttpParams({fromObject: params}));
    }

    save(generoDocumentoAvulso: GeneroDocumentoAvulso, context: any = '{}'): Observable<GeneroDocumentoAvulso> {
        const params = {};
        params['context'] = context;
        if (generoDocumentoAvulso.id) {
            return this.modelService.put('genero_documento_avulso', generoDocumentoAvulso.id, classToPlain(generoDocumentoAvulso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroDocumentoAvulso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroDocumentoAvulso(), {...generoDocumentoAvulso, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_documento_avulso', classToPlain(generoDocumentoAvulso), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroDocumentoAvulso, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroDocumentoAvulso(), {...generoDocumentoAvulso, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<GeneroDocumentoAvulso> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('genero_documento_avulso', id, new HttpParams({fromObject: params}));
    }
}
