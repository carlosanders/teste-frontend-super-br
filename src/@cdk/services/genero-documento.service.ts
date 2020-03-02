import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeneroDocumento} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class GeneroDocumentoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<GeneroDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('genero_documento', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(GeneroDocumento, response)[0])
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

        return this.modelService.get('genero_documento', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(GeneroDocumento, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('genero_documento', new HttpParams({fromObject: params}));
    }

    save(generoDocumento: GeneroDocumento, context: any = {}): Observable<GeneroDocumento> {
        const params = {};
        params['context'] = context;
        if (generoDocumento.id) {
            return this.modelService.put('genero_documento', generoDocumento.id, classToPlain(generoDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroDocumento(), {...generoDocumento, ...response});
                    })
                );
        } else {
            return this.modelService.post('genero_documento', classToPlain(generoDocumento), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(GeneroDocumento, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new GeneroDocumento(), {...generoDocumento, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<GeneroDocumento> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('genero_documento', id, new HttpParams({fromObject: params}));
    }
}
