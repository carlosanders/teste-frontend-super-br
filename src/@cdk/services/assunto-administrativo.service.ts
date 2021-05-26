import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {AssuntoAdministrativo} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {plainToClass} from 'class-transformer';
import {map} from 'rxjs/operators';

@Injectable()
export class AssuntoAdministrativoService extends ParentGenericService<AssuntoAdministrativo> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/assunto_administrativo', AssuntoAdministrativo);
    }

    patch(assuntoAdministrativo: AssuntoAdministrativo, changes: any): Observable<AssuntoAdministrativo> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/assuntoAdministrativo'}/${assuntoAdministrativo.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(AssuntoAdministrativo, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new AssuntoAdministrativo(), {...assuntoAdministrativo, ...response});
            })
        );
    }

}
