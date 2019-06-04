import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assinatura} from '@cdk/models/assinatura.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class AssinaturaService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Assinatura> {
        return this.modelService.getOne('assinatura', id)
            .map(response => plainToClass(Assinatura, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('assinatura', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Assinatura, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('assinatura', new HttpParams({fromObject: params}));
    }

    save(assinatura: Assinatura): Observable<Assinatura> {
        if (assinatura.id) {
            return this.modelService.put('assinatura', assinatura.id, classToPlain(assinatura))
                .map(response => {
                    response = plainToClass(Assinatura, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Assinatura(), {...assinatura, ...response});
                });
        } else {
            return this.modelService.post('assinatura', classToPlain(assinatura))
                .map(response => {
                    response = plainToClass(Assinatura, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Assinatura(), {...assinatura, ...response});
                });
        }
    }

    destroy(id: number): Observable<Assinatura> {
        return this.modelService.delete('assinatura', id);
    }
}
