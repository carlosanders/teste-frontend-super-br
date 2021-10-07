import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Visibilidade} from '../models';

@Injectable()
export class TipoRelatorioService extends ParentGenericService<TipoRelatorio> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/tipo_relatorio', TipoRelatorio);
    }

    patch(tipoRelatorio: TipoRelatorio, changes: any): Observable<TipoRelatorio> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/tipo_relatorio'}/${tipoRelatorio.id}` + environment.xdebug,
            JSON.stringify(changes)
        ).pipe(
            map((response) => {
                response = plainToClass(TipoRelatorio, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new TipoRelatorio(), {...tipoRelatorio, ...response});
            })
        );
    }


    getVisibilidade(id: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.get(`${environment.api_url}administrativo/${'tipo_relatorio'}/${id}/visibilidade` + environment.xdebug, {params})
            .pipe(
                map(response => plainToClass(Visibilidade, response))
            );
    }

    createVisibilidade(tipoRelatorioId: number, visibilidade: Visibilidade, context: any = '{}'): Observable<Visibilidade> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.put(
            `${environment.api_url}${'administrativo/tipo_relatorio'}/${tipoRelatorioId}/${'visibilidade'}` + environment.xdebug,
            JSON.stringify(visibilidade),
            {params}
        ).pipe(
            map(response => plainToClass(Visibilidade, response))
        );
    }

    destroyVisibilidade(tipoRelatorioId: number, visibilidadeId: number, context: any = '{}'): Observable<any> {
        const params: HttpParams = new HttpParams();
        params['context'] = context;
        return this.http.delete(
            `${environment.api_url}${'administrativo/tipo_relatorio'}/${tipoRelatorioId}/${'visibilidade'}/${visibilidadeId}` + environment.xdebug,
            {params}
        );
    }
}
