import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Usuario} from '@cdk/models/usuario.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';
import {environment} from 'environments/environment';

@Injectable()
export class UsuarioService {

    constructor(
        private modelService: ModelService,
        private http: HttpClient
    ) {
    }

    get(id: number): Observable<Usuario> {
        return this.modelService.getOne('usuario', id)
            .pipe(
                map(response => plainToClass(Usuario, response)[0])
            );
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('usuario', new HttpParams({fromObject: params}))
            .pipe(
                map(response => new PaginatedResponse(plainToClass(Usuario, response['entities']), response['total']))
            );
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('usuario', new HttpParams({fromObject: params}));
    }

    save(usuario: Usuario): Observable<Usuario> {
        if (usuario.id) {
            return this.modelService.put('usuario', usuario.id, classToPlain(usuario))
                .pipe(
                    map(response => {
                        response = plainToClass(Usuario, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Usuario(), {...usuario, ...response});
                    })
                );
        } else {
            return this.modelService.post('usuario', classToPlain(usuario))
                .pipe(
                    map(response => {
                        response = plainToClass(Usuario, response);
                        Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                        return Object.assign(new Usuario(), {...usuario, ...response});
                    })
                );
        }
    }

    destroy(id: number): Observable<Usuario> {
        return this.modelService.delete('usuario', id);
    }

    patch(usuario: Usuario, changes: any): Observable<Usuario> {
        return this.http.patch(
            `${environment.api_url}${'usuario'}/${usuario.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(Usuario, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Usuario(), {...usuario, ...response});
            })
        );
    }
}
