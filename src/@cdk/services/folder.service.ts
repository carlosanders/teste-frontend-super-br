import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ParentGenericService} from './parent-generic.service';
import {ModelService} from '@cdk/services/model.service';
import {Folder, Tarefa} from '@cdk/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable()
export class FolderService extends ParentGenericService<Folder> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/folder', Folder);
    }

    undelete(folder: Folder, populate: any = '[]', context: any = '{}'): Observable<Folder> {
        const tmpParams: any = {};
        tmpParams['populate'] = populate;
        tmpParams['context'] = context;
        const params = new HttpParams({fromObject: tmpParams});
        return this.http.patch(
            `${environment.api_url}${'administrativo/folder'}/${folder.id}/${'undelete'}` + environment.xdebug,
            null,
            { params }
        ).pipe(
            map((response) => {
                response = plainToClass(Tarefa, response);
                Object.keys(response).forEach(key => (response[key] === null) && delete response[key]);
                return Object.assign(new Tarefa(), {...folder, ...response});
            })
        );
    }

}
