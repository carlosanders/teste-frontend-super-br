import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModalidadeInteressado} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class ModalidadeInteressadoService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<ModalidadeInteressado> {
        return this.modelService.getOne('modalidade_interessado', id)
            .pipe(
                map(response => plainToClass(ModalidadeInteressado, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('modalidade_interessado', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(ModalidadeInteressado, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('modalidade_interessado', new HttpParams({fromObject: params}));
    }

    save(modalidadeInteressado: ModalidadeInteressado): Observable<ModalidadeInteressado> {
        if (modalidadeInteressado.id) {
            return this.modelService.put('modalidade_interessado', modalidadeInteressado.id, classToPlain(modalidadeInteressado))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeInteressado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeInteressado(), {...modalidadeInteressado, ...response});
                    })
                );
        } else {
            return this.modelService.post('modalidade_interessado', classToPlain(modalidadeInteressado))
                .pipe(
                    map(response => {
                        response = plainToClass(ModalidadeInteressado, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new ModalidadeInteressado(), {...modalidadeInteressado, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<ModalidadeInteressado> {
        return this.modelService.delete('modalidade_interessado', id);
    }
}
