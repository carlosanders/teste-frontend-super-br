import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Processo} from '@cdk/models/processo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ProcessoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Processo> {
        return this.modelService.getOne('processo', id)
            .map(response => plainToClass(Processo, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('processo', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Processo, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('processo', new HttpParams({fromObject: params}));
    }

    save(processo: Processo): Observable<Processo> {
        if (processo.id) {
            return this.modelService.put('processo', processo.id, classToPlain(processo))
                .map(response => {
                    response = plainToClass(Processo, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Processo(), {...processo, ...response});
                });
        } else {
            return this.modelService.post('processo', classToPlain(processo))
                .map(response => {
                    response = plainToClass(Processo, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Processo(), {...processo, ...response});
                });
        }
    }

    destroy(id: number): Observable<Processo> {
        return this.modelService.delete('processo', id);
    }
}
