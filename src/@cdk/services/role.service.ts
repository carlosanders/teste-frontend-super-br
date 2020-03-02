import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Role} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';

@Injectable()
export class RoleService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number, context: any = {}): Observable<Role> {
        const params = {};
        params['context'] = context;
        return this.modelService.getOne('role', id, new HttpParams({fromObject: params}))
            .pipe(
                map(response => plainToClass(Role, response)[0])
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

        return this.modelService.get('role', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Role, response['entities']), response['total']))
            );
    }

    count(filters: any = {}, context: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['context'] = context;

        return this.modelService.count('role', new HttpParams({fromObject: params}));
    }

    save(role: Role, context: any = {}): Observable<Role> {
        const params = {};
        params['context'] = context;
        if (role.id) {
            return this.modelService.put('role', role.id, classToPlain(role), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Role, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Role(), {...role, ...response});
                    })
                );
        } else {
            return this.modelService.post('role', classToPlain(role), new HttpParams({fromObject: params}))
                .pipe(
                    map(response => {
                        response = plainToClass(Role, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Role(), {...role, ...response});
                    })
                );
        }
    }

    destroy(id: number, context: any = {}): Observable<Role> {
        const params = {};
        params['context'] = context;
        return this.modelService.delete('role', id, new HttpParams({fromObject: params}));
    }
}
