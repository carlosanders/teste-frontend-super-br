import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieSetor} from '@cdk/models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {environment} from '../../environments/environment';

@Injectable()
export class EspecieSetorService extends ParentGenericService<EspecieSetor> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/especie_setor', EspecieSetor);
    }

    patch(especieSetor: EspecieSetor, changes: any): Observable<EspecieSetor> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/especie_setor'}/${especieSetor.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(EspecieSetor, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new EspecieSetor(), {...especieSetor, ...response});
            })
        );
    }
}
