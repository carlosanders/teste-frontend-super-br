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

    get(id: number): Observable<Role> {
        return this.modelService.getOne('role', id)
            .pipe(
                map(response => plainToClass(Role, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('role', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Role, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('role', new HttpParams({fromObject: params}));
    }

    save(role: Role): Observable<Role> {
        if (role.id) {
            return this.modelService.put('role', role.id, classToPlain(role))
                .pipe(
                    map(response => {
                        response = plainToClass(Role, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Role(), {...role, ...response});
                    })
                );
        } else {
            return this.modelService.post('role', classToPlain(role))
                .pipe(
                    map(response => {
                        response = plainToClass(Role, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Role(), {...role, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Role> {
        return this.modelService.delete('role', id);
    }
}
