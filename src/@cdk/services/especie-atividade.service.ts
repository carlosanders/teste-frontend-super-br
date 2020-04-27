import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {EspecieAtividade} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass, classToPlain} from 'class-transformer';

@Injectable()
export class EspecieAtividadeService extends ParentGenericService<EspecieAtividade> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'especie_atividade', EspecieAtividade);
    }

    patch(especieAtividade: EspecieAtividade, changes: any): Observable<EspecieAtividade> {
        return this.http.patch(
            `${environment.api_url}${'especieAtividade'}/${especieAtividade.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map(response => {
                response = plainToClass(EspecieAtividade, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new EspecieAtividade(), {...especieAtividade, ...response});
            })
        );
    }

}