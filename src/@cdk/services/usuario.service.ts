import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Usuario} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';
import {Usuario} from '../models';

@Injectable()
export class UsuarioService extends ParentGenericService<Usuario> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'usuario', Usuario);
    }

    patch(usuario: Usuario, changes: any, context: any = '{}'): Observable<Usuario> {
        const params: HttpParams = new HttpParams()
        params['context'] = context;
        return this.http.patch(
            `${environment.api_url}${'usuario'}/${usuario.id}` + environment.xdebug,
            JSON.stringify(changes),
            {params}
        ).pipe(
            map(response => {
                response = plainToClass(Usuario, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new Usuario(), {...usuario, ...response});
            })
        );
    }
}
