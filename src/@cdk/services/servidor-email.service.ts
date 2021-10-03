import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {ServidorEmail} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class ServidorEmailService extends ParentGenericService<ServidorEmail> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/servidor_email', ServidorEmail);
    }

    patch(servidorEmail: ServidorEmail, changes: any): Observable<ServidorEmail> {
        return this.http.patch(
            `${environment.api_url}administrativo/servidor_email/${servidorEmail.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(ServidorEmail, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new ServidorEmail(), {...servidorEmail, ...response});
            })
        );
    }

}
