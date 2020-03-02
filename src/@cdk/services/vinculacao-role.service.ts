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

    get(id: number, context: any = {}): Observable<VinculacaoRole> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('vinculacao_role', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(VinculacaoRole, response)[0])
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

        return this.modelService.get('vinculacao_role', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(VinculacaoRole, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('vinculacao_role', new HttpParams({fromObject: params}));
    }

    save(vinculacaoRole: VinculacaoRole, context: any = {}): Observable<VinculacaoRole> {
        const params = {};
        params['context'] = context;
        if (vinculacaoRole.id) {
            return this.modelService.put('vinculacao_role', vinculacaoRole.id, classToPlain(vinculacaoRole), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoRole, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoRole(), {...vinculacaoRole, ...response});
                    })
                );
        } else {
            return this.modelService.post('vinculacao_role', classToPlain(vinculacaoRole), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(VinculacaoRole, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new VinculacaoRole(), {...vinculacaoRole, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<VinculacaoRole> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('vinculacao_role', id, new HttpParams({fromObject: params}));
    }
}
