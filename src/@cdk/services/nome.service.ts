import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Nome} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class NomeService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Nome> {
        return this.modelService.getOne('nome', id)
            .pipe(
                map(response => plainToClass(Nome, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('nome', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Nome, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('nome', new HttpParams({fromObject: params}));
    }

    save(nome: Nome): Observable<Nome> {
        if (nome.id) {
            return this.modelService.put('nome', nome.id, classToPlain(nome))
                .pipe(
                    map(response => {
                        response = plainToClass(Nome, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Nome(), {...nome, ...response});
                    })
                );
        } else {
            return this.modelService.post('nome', classToPlain(nome))
                .pipe(
                    map(response => {
                        response = plainToClass(Nome, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Nome(), {...nome, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Nome> {
        return this.modelService.delete('nome', id);
    }
}
