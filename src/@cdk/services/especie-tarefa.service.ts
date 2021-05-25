import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieTarefa} from '@cdk/models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {environment} from '../../environments/environment';

@Injectable()
export class EspecieTarefaService extends ParentGenericService<EspecieTarefa> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/especie_tarefa', EspecieTarefa);
    }

    patch(especieTarefa: EspecieTarefa, changes: any): Observable<EspecieTarefa> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/especie_tarefa'}/${especieTarefa.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(EspecieTarefa, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new EspecieTarefa(), {...especieTarefa, ...response});
            })
        );
    }
}
