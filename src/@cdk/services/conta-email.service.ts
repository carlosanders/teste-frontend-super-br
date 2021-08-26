import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ContaEmail} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class ContaEmailService extends ParentGenericService<ContaEmail> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/conta_email', ContaEmail);
    }

    patch(contaEmail: ContaEmail, changes: any): Observable<ContaEmail> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/conta_email'}/${contaEmail.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(ContaEmail, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new ContaEmail(), {...contaEmail, ...response});
            })
        );
    }

}
