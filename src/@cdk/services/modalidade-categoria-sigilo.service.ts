import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeCategoriaSigilo} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeCategoriaSigiloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<ModalidadeCategoriaSigilo> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('modalidade_categoria_sigilo', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(ModalidadeCategoriaSigilo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = [], context: any = {}): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;
        params['context'] = context;

        return this.modelService.get('modalidade_categoria_sigilo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeCategoriaSigilo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('modalidade_categoria_sigilo', new HttpParams({fromObject: params}));
    }

    save(modalidadeCategoriaSigilo: ModalidadeCategoriaSigilo, context: any = {}): Observable<ModalidadeCategoriaSigilo> {
        const params = {};
        params['context'] = context;
        if (modalidadeCategoriaSigilo.id) {
            return this.modelService.put('modalidade_categoria_sigilo', modalidadeCategoriaSigilo.id, classToPlain(modalidadeCategoriaSigilo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeCategoriaSigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeCategoriaSigilo(), {...modalidadeCategoriaSigilo, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_categoria_sigilo', classToPlain(modalidadeCategoriaSigilo), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeCategoriaSigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeCategoriaSigilo(), {...modalidadeCategoriaSigilo, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<ModalidadeCategoriaSigilo> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('modalidade_categoria_sigilo', id, new HttpParams({fromObject: params}));
    }
}
