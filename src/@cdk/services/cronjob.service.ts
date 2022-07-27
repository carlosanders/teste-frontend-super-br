import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Cronjob} from '@cdk/models';
import {environment} from 'environments/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CronjobService extends ParentGenericService<Cronjob> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/cronjob', Cronjob);
    }

    startJob(cronjobId: number, populate: any = '[]', context: any = '{}'): Observable<Cronjob> {
        const params: HttpParams = new HttpParams()
        params['populate'] = populate;
        params['context'] = context;

        return this.http.patch(
            `${environment.api_url}${this.path}/${cronjobId}/start_job` + environment.xdebug,
            null,
            {params}
        ).pipe(
            map((response) => {
                response = plainToClass(Cronjob, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Cronjob(), response);
            })
        );
    }
}
