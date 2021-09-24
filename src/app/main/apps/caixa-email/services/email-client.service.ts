import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ModelService} from '@cdk/services/model.service';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Message} from '../models/message.model';
import {PaginatedResponse} from '@cdk/models';
import {Attachment} from '../models/attachment.model';

@Injectable()
export class EmailClientService {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
    }

    getFolders(id: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.base_url}email_client/${id}/folders` + environment.xdebug, {params});
    }

    getDefaultFolders(id: number | string, params: HttpParams = new HttpParams(), context: any = '{}'): Observable<any> {
        params['context'] = context;
        return this.http.get(`${environment.base_url}email_client/${id}/default_folders` + environment.xdebug, {params});
    }

    getMessages(id: number | string, filters: any = '{}', limit: number = 25, offset: number = 0): Observable<any> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;

        return this.http.get(
            `${environment.base_url}email_client/${id}/messages` + environment.xdebug,
            {params: new HttpParams({fromObject: params})}
        ).pipe(
            map(response => new PaginatedResponse(plainToClass(Message, response['entities']), response['total']))
        );
    }

    getMessage(id: number | string, folderIdentifier: number | string, messageIdentifier: number | string): Observable<any> {

        return this.http.get(
            `${environment.base_url}email_client/${id}/message/${folderIdentifier}/${messageIdentifier}` + environment.xdebug
        ).pipe(
            map(response => plainToClass(Message, response))
        );
    }

    getMessageAttachment(id: number | string, folderIdentifier: number | string, messageIdentifier: number | string, attachmentIdentifier: number | string): Observable<any> {
        const params = new HttpParams();
        return this.http.get(
            `${environment.base_url}email_client/${id}/message/${folderIdentifier}/${messageIdentifier}/${attachmentIdentifier}` + environment.xdebug, {params}
        ).pipe(
            map(response => plainToClass(Attachment, response))
        );
    }
}
