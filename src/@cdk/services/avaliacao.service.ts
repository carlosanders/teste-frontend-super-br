import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Avaliacao} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {ParentGenericService} from './parent-generic.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class AvaliacaoService extends ParentGenericService<Avaliacao> {
    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/avaliacao', Avaliacao);
    }

    avaliar(body: any = {}, populate: any = '[]', context: any = '{}'): Observable<Avaliacao> {
        const params = {};
        params['context'] = context;
        params['populate'] = populate;
        return this.http.post(
            environment.api_url + this.path + environment.xdebug,
            body,
            { params }
        ).pipe(
            map((response) => {
                response = plainToClass(this.clz, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new this.clz(), response);
            })
        );
    }
}
