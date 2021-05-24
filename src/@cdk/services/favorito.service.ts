import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Favorito} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class FavoritoService extends ParentGenericService<Favorito> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/favorito', Favorito);
    }

    patch(favorito: Favorito, changes: any): Observable<Favorito> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/favorito'}/${favorito.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(Favorito, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Favorito(), {...favorito, ...response});
            })
        );
    }
}
