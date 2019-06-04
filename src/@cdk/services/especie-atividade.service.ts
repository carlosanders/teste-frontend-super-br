import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EspecieAtividadeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<EspecieAtividade> {
        return this.modelService.getOne('especie_atividade', id)
            .map(response => plainToClass(EspecieAtividade, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_atividade', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(EspecieAtividade, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_atividade', new HttpParams({fromObject: params}));
    }

    save(especieAtividade: EspecieAtividade): Observable<EspecieAtividade> {
        if (especieAtividade.id) {
            return this.modelService.put('especie_atividade', especieAtividade.id, classToPlain(especieAtividade))
                .map(response => {
                    response = plainToClass(EspecieAtividade, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieAtividade(), {...especieAtividade, ...response});
                });
        } else {
            return this.modelService.post('especie_atividade', classToPlain(especieAtividade))
                .map(response => {
                    response = plainToClass(EspecieAtividade, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieAtividade(), {...especieAtividade, ...response});
                });
        }
    }

    destroy(id: number): Observable<EspecieAtividade> {
        return this.modelService.delete('especie_atividade', id);
    }
}
