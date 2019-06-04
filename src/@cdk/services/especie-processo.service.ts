import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EspecieProcesso} from '@cdk/models/especie-processo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EspecieProcessoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<EspecieProcesso> {
        return this.modelService.getOne('especie_processo', id)
            .map(response => plainToClass(EspecieProcesso, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('especie_processo', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(EspecieProcesso, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('especie_processo', new HttpParams({fromObject: params}));
    }

    save(especieProcesso: EspecieProcesso): Observable<EspecieProcesso> {
        if (especieProcesso.id) {
            return this.modelService.put('especie_processo', especieProcesso.id, classToPlain(especieProcesso))
                .map(response => {
                    response = plainToClass(EspecieProcesso, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieProcesso(), {...especieProcesso, ...response});
                });
        } else {
            return this.modelService.post('especie_processo', classToPlain(especieProcesso))
                .map(response => {
                    response = plainToClass(EspecieProcesso, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new EspecieProcesso(), {...especieProcesso, ...response});
                });
        }
    }

    destroy(id: number): Observable<EspecieProcesso> {
        return this.modelService.delete('especie_processo', id);
    }
}
