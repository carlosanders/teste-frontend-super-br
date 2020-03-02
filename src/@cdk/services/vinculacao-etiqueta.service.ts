import {Injectable} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoEtiqueta} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import { environment } from 'environments/environment';

@Injectable()
export class VinculacaoEtiquetaService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<VinculacaoEtiqueta> {
        return this.modelService.getOne('vinculacao_etiqueta', id)
            .pipe(
                map(response => plainToClass(VinculacaoEtiqueta, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('vinculacao_etiqueta', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoEtiqueta, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('vinculacao_etiqueta', new HttpParams({fromObject: params}));
    }

    save(vinculacaoEtiqueta: VinculacaoEtiqueta): Observable<VinculacaoEtiqueta> {
        if (vinculacaoEtiqueta.id) {
            return this.modelService.put('vinculacao_etiqueta', vinculacaoEtiqueta.id, classToPlain(vinculacaoEtiqueta))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoEtiqueta, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoEtiqueta(), {...vinculacaoEtiqueta, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_etiqueta', classToPlain(vinculacaoEtiqueta))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoEtiqueta, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoEtiqueta(), {...vinculacaoEtiqueta, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<VinculacaoEtiqueta> {
        return this.modelService.delete('vinculacao_etiqueta', id);
    }

    patch(vinculacaoEtiqueta: VinculacaoEtiqueta, changes: any): Observable<VinculacaoEtiqueta> {
        return this.modelService.patch('vinculacao_etiqueta', vinculacaoEtiqueta.id, changes)
        .pipe(  
            map(response => {
                response = plainToClass(VinculacaoEtiqueta, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new VinculacaoEtiqueta(), {...vinculacaoEtiqueta, ...response});
            })
        );
    } 
}
