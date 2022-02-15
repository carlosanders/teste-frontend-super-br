import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Dossie} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';

@Injectable()
export class DossieService extends ParentGenericService<Dossie> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/dossie', Dossie);
    }

    downloadAsPdf(id: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/dossie/${id}/download_as_pdf` + environment.xdebug, {params});
    }
}
