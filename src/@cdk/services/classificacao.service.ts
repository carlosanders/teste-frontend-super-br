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

    get(id: number, context: any = '{}'): Observable<Classificacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('classificacao', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Classificacao, response)[0])
            );
    }

    query(filters: any = '{}', limit: number = 25, offset: number = 0, order: any = '{}', populate: any = '[]', context: any = '{}'): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('classificacao', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Classificacao, response['entities']), response['total']))
            );
    }

    count(filters: any = '{}', context: any = '{}'): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('classificacao', new HttpParams({fromObject: params}));
    }

    save(classificacao: Classificacao, context: any = '{}'): Observable<Classificacao> {
        const params = {};
        params['context'] = context;
        if (classificacao.id) {
            return this.modelService.put('classificacao', classificacao.id, classToPlain(classificacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Classificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Classificacao(), {...classificacao, ...response});
                    })
                );
        } else {
            return this.modelService.post('classificacao', classToPlain(classificacao), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Classificacao, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Classificacao(), {...classificacao, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = '{}'): Observable<Classificacao> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('classificacao', id, new HttpParams({fromObject: params}));
    }
}
