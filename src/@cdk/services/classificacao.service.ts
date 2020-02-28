import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Classificacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ClassificacaoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Classificacao> {
        return this.modelService.getOne('classificacao', id)
            .pipe(
                map(response => plainToClass(Classificacao, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('classificacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Classificacao, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('classificacao', new HttpParams({fromObject: params}));
    }

    save(classificacao: Classificacao): Observable<Classificacao> {
        if (classificacao.id) {
            return this.modelService.put('classificacao', classificacao.id, classToPlain(classificacao))
                .pipe(
                    map(response => {
                        response = plainToClass(Classificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Classificacao(), {...classificacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('classificacao', classToPlain(classificacao))
                .pipe(
                    map(response => {
                        response = plainToClass(Classificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Classificacao(), {...classificacao, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Classificacao> {
        return this.modelService.delete('classificacao', id);
    }
}
