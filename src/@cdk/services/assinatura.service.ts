import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Assinatura} from '@cdk/models';
import {Observable} from 'rxjs';
import {classToPlain, plainToClass} from 'class-transformer';
import {map} from 'rxjs/operators';
import {LoginService} from '../../app/main/auth/login/login.service';

@Injectable()
export class AssinaturaService extends ParentGenericService<Assinatura> {

    constructor(
        protected modelService: ModelService,
        private _loginService: LoginService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/assinatura', Assinatura);
    }

    save(t: Assinatura, context: any = '{}', populate: any = '[]'): Observable<Assinatura> {
        const params = {};
        params['populate'] = populate;
        params['context'] = context;
        if (t['id']) {
            return this.modelService.put(this.path, t['id'], classToPlain(t), new HttpParams({fromObject: params}))
                .pipe(
                    map((response) => {
                        response = plainToClass(this.clz, response);
                        Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                        return Object.assign(new this.clz(), {...t, ...response});
                    })
                );
        } else {
            const ass = classToPlain(t);
            if (ass['plainPassword']) {
                ass['plainPassword'] = this._loginService.getLoginType() + '://' + ass['plainPassword'];
            }
            return this.modelService.post(this.path, ass, new HttpParams({fromObject: params}))
                .pipe(
                    map((response) => {
                        response = plainToClass(this.clz, response);
                        Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                        return Object.assign(new this.clz(), {...t, ...response});
                    })
                );
        }
    }
}
