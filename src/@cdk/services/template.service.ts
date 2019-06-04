import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Template} from '@cdk/models/template.model';
import {ModelService} from '@cdk/services/model.service';
import {plainToClass, classToPlain} from 'class-transformer';
import {PaginatedResponse} from '@cdk/models/paginated.response';

@Injectable()
export class TemplateService {

    constructor(
        private modelService: ModelService
    ) {
    }

    get(id: number): Observable<Template> {
        return this.modelService.getOne('template', id)
            .map(response => plainToClass(Template, response)[0]);
    }

    query(filters: any = {}, limit: number = 25, offset: number = 0, order: any = {}, populate: any = []): Observable<PaginatedResponse> {
        const params = {};
        params['where'] = filters;
        params['limit'] = limit;
        params['offset'] = offset;
        params['order'] = order;
        params['populate'] = populate;

        return this.modelService.get('template', new HttpParams({fromObject: params}))
            .map(response => new PaginatedResponse(plainToClass(Template, response['entities']), response['total']));
    }

    count(filters: any = {}): Observable<any> {
        const params = {};
        params['where'] = filters;

        return this.modelService.count('template', new HttpParams({fromObject: params}));
    }

    save(template: Template): Observable<Template> {
        if (template.id) {
            return this.modelService.put('template', template.id, classToPlain(template))
                .map(response => {
                    response = plainToClass(Template, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Template(), {...template, ...response});
                });
        } else {
            return this.modelService.post('template', classToPlain(template))
                .map(response => {
                    response = plainToClass(Template, response);
                    Object.keys(response).forEach((key) => (response[key] === null) && delete response[key]);
                    return Object.assign(new Template(), {...template, ...response});
                });
        }
    }

    destroy(id: number): Observable<Template> {
        return this.modelService.delete('template', id);
    }
}
