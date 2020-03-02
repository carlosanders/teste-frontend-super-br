import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {VinculacaoRole} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class VinculacaoRoleService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<VinculacaoRole> {
        return this.modelService.getOne('vinculacao_role', id)
            .pipe(
                map(response => plainToClass(VinculacaoRole, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('vinculacao_role', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoRole, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('vinculacao_role', new HttpParams({fromObject: params}));
    }

    save(vinculacaoRole: VinculacaoRole): Observable<VinculacaoRole> {
        if (vinculacaoRole.id) {
            return this.modelService.put('vinculacao_role', vinculacaoRole.id, classToPlain(vinculacaoRole))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoRole, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoRole(), {...vinculacaoRole, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_role', classToPlain(vinculacaoRole))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoRole, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoRole(), {...vinculacaoRole, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<VinculacaoRole> {
        return this.modelService.delete('vinculacao_role', id);
    }
}
