import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneroAtividade} from '@cdk/models/genero-atividade.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class GeneroAtividadeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<GeneroAtividade> {
        return this.modelService.getOne('genero_atividade', id)
            .map(response => plainToClass(GeneroAtividade, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('genero_atividade', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(GeneroAtividade, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('genero_atividade', new HttpParams({fromObject: params}));
    }

    save(generoAtividade: GeneroAtividade): Observable<GeneroAtividade> {
        if (generoAtividade.id) {
            return this.modelService.put('genero_atividade', generoAtividade.id, classToPlain(generoAtividade))
                .map(response => {
                    response = plainToClass(GeneroAtividade, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new GeneroAtividade(), {...generoAtividade, ...response});
                });
        } else {
            return this.modelService.post('genero_atividade', classToPlain(generoAtividade))
                .map(response => {
                    response = plainToClass(GeneroAtividade, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new GeneroAtividade(), {...generoAtividade, ...response});
                });
        }
    }

    destroy(id: number): Observable<GeneroAtividade> {
        return this.modelService.delete('genero_atividade', id);
    }
}
