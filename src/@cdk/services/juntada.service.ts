import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Juntada} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class JuntadaService extends ParentGenericService<Juntada> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/juntada', Juntada);
    }

    enviaEmail(id: number | string, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams().set('context', context);
        return this.http.get(`${environment.api_url}administrativo/juntada/${id}/sendEmail` + environment.xdebug, {params});
    }
}
