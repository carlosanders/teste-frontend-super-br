import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Pagination, Template} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'templates-edit',
    templateUrl: './templates-edit.component.html',
    styleUrls: ['./templates-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TemplatesEditComponent implements OnInit, OnDestroy {

    routerState: any;
    template$: Observable<Template>;
    template: Template;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    tipoDocumentoPagination: Pagination;
    modalidadeTemplatePagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _store: Store<fromStore.TemplatesEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.template$ = this._store.pipe(select(fromStore.getTemplates));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.tipoDocumentoPagination = new Pagination();
        this.modalidadeTemplatePagination = new Pagination();
    }

    ngOnInit(): void {
        this.template$.pipe(
            filter(template => !!template),
            takeUntil(this._unsubscribeAll)
        ).subscribe(template => this.template = template);

        if (!this.template) {
            this.template = new Template();
            this.template.ativo = true;
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    submit(values): void {

        const template = new Template();

        Object.entries(values).forEach(
            ([key, value]) => {
                template[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTemplates({
            template: template,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
