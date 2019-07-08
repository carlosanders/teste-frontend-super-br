import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeCategoriaSigilo} from '@cdk/models/modalidade-categoria-sigilo.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class ModalidadeCategoriaSigiloService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeCategoriaSigilo> {
        return this.modelService.getOne('modalidade_categoria_sigilo', id)
            .pipe(
                map(response => plainToClass(ModalidadeCategoriaSigilo, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_categoria_sigilo', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeCategoriaSigilo, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_categoria_sigilo', new HttpParams({fromObject: params}));
    }

    save(modalidadeCategoriaSigilo: ModalidadeCategoriaSigilo): Observable<ModalidadeCategoriaSigilo> {
        if (modalidadeCategoriaSigilo.id) {
            return this.modelService.put('modalidade_categoria_sigilo', modalidadeCategoriaSigilo.id, classToPlain(modalidadeCategoriaSigilo))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeCategoriaSigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeCategoriaSigilo(), {...modalidadeCategoriaSigilo, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_categoria_sigilo', classToPlain(modalidadeCategoriaSigilo))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeCategoriaSigilo, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeCategoriaSigilo(), {...modalidadeCategoriaSigilo, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeCategoriaSigilo> {
        return this.modelService.delete('modalidade_categoria_sigilo', id);
    }
}
