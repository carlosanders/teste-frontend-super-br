import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieRelevancia} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class EspecieRelevanciaService extends ParentGenericService<EspecieRelevancia> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/especie_relevancia', EspecieRelevancia);
    }

    patch(especieRelevancia: EspecieRelevancia, changes: any): Observable<EspecieRelevancia> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/especie_relevancia'}/${especieRelevancia.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(EspecieRelevancia, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new EspecieRelevancia(), {...especieRelevancia, ...response});
            })
        );
    }
}
