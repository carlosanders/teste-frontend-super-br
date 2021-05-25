import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Relatorio} from '@cdk/models/relatorio.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class RelatorioService extends ParentGenericService<Relatorio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/relatorio', Relatorio);
    }

    downloadAsPdf(id: number | string, sequencial: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/relatorio/${id}/download_as_pdf/${sequencial}` + environment.xdebug, {params});
    }

    downloadAsZip(id: number | string, sequencial: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/relatorio/${id}/download_as_zip/${sequencial}` + environment.xdebug, {params});
    }

    patch(relatorio: Relatorio, changes: any): Observable<Relatorio> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/relatorio'}/${relatorio.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(Relatorio, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Relatorio(), {...relatorio, ...response});
            })
        );
    }
}
