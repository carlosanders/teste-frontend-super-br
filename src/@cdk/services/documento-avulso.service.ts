import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DocumentoAvulso} from '@cdk/models';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {environment} from 'environments/environment';
import {ParentGenericService} from './parent-generic.service';

@Injectable()
export class DocumentoAvulsoService extends ParentGenericService<DocumentoAvulso> {

    constructor(
        protected modelService: ModelService,
        protected http: HttpClient,
    ) {
        super(modelService, 'administrativo/documento_avulso', DocumentoAvulso);
    }

    remeter(documentoAvulso: DocumentoAvulso): Observable<DocumentoAvulso> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/documento_avulso'}/${documentoAvulso.id}/${'remeter'}` + environment.xdebug,
            JSON.stringify(classToPlain(documentoAvulso))
        ).pipe(
            map(response => {
                response = plainToClass(DocumentoAvulso, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
            })
        );
    }

    toggleEncerramento(documentoAvulso: DocumentoAvulso): Observable<DocumentoAvulso> {
        return this.http.patch(
            `${environment.api_url}${'administrativo/documento_avulso'}/${documentoAvulso.id}/${'toggle_encerramento'}` + environment.xdebug,
            JSON.stringify(classToPlain(documentoAvulso))
        ).pipe(
            map(response => {
                response = plainToClass(DocumentoAvulso, response);
                Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                return Object.assign(new DocumentoAvulso(), {...documentoAvulso, ...response});
            })
        );
    }
}
