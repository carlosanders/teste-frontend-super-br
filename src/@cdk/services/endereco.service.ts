import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endereco} from '@cdk/models/endereco.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class EnderecoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Endereco> {
        return this.modelService.getOne('endereco', id)
            .map(response => plainToClass(Endereco, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('endereco', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Endereco, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('endereco', new HttpParams({fromObject: params}));
    }

    save(endereco: Endereco): Observable<Endereco> {
        if (endereco.id) {
            return this.modelService.put('endereco', endereco.id, classToPlain(endereco))
                .map(response => {
                    response = plainToClass(Endereco, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Endereco(), {...endereco, ...response});
                });
        } else {
            return this.modelService.post('endereco', classToPlain(endereco))
                .map(response => {
                    response = plainToClass(Endereco, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Endereco(), {...endereco, ...response});
                });
        }
    }

    destroy(id: number): Observable<Endereco> {
        return this.modelService.delete('endereco', id);
    }
}
