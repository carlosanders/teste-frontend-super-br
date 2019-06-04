import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from '../../environments/environment';

@Injectable()
export class ComponenteDigitalService {

    constructor(
        private http: HttpClient,
        private modelService: ModelService
    ) {
    }

    download(id: number|string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}componente_digital/${id}/download` + environment.xdebug, { params });
    }

    get(id: number): Observable<ComponenteDigital> {
        return this.modelService.getOne('componente_digital', id)
            .map(response => plainToClass(ComponenteDigital, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('componente_digital', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(ComponenteDigital, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('componente_digital', new HttpParams({fromObject: params}));
    }

    save(componenteDigital: ComponenteDigital): Observable<ComponenteDigital> {
        if (componenteDigital.id) {
            return this.modelService.put('componente_digital', componenteDigital.id, classToPlain(componenteDigital))
                .map(response => {
                    response = plainToClass(ComponenteDigital, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
                });
        } else {
            return this.modelService.post('componente_digital', classToPlain(componenteDigital))
                .map(response => {
                    response = plainToClass(ComponenteDigital, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new ComponenteDigital(), {...componenteDigital, ...response});
                });
        }
    }

    destroy(id: number): Observable<ComponenteDigital> {
        return this.modelService.delete('componente_digital', id);
    }
}
