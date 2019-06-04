import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Atividade} from '@cdk/models/atividade.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class AtividadeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Atividade> {
        return this.modelService.getOne('atividade', id)
            .map(response => plainToClass(Atividade, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('atividade', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Atividade, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('atividade', new HttpParams({fromObject: params}));
    }

    save(atividade: Atividade): Observable<Atividade> {
        if (atividade.id) {
            return this.modelService.put('atividade', atividade.id, classToPlain(atividade))
                .map(response => {
                    response = plainToClass(Atividade, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Atividade(), {...atividade, ...response});
                });
        } else {
            return this.modelService.post('atividade', classToPlain(atividade))
                .map(response => {
                    response = plainToClass(Atividade, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Atividade(), {...atividade, ...response});
                });
        }
    }

    destroy(id: number): Observable<Atividade> {
        return this.modelService.delete('atividade', id);
    }
}
