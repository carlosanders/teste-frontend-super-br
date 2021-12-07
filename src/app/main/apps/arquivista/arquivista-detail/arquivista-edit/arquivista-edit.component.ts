import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Colaborador, Pagination, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import {SaveProcesso} from '../store';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../../auth/login/login.service';
import {Back} from '../../../../../store';
import {getProcesso} from '../../../processo/store';

@Component({
    selector: 'arquivista-edit',
    templateUrl: './arquivista-edit.component.html',
    styleUrls: ['./arquivista-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ArquivistaEditComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    _profile: Colaborador;
    logEntryPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ArquivistaDetailAppState>,
        public _loginService: LoginService
    ) {
        this.processo$ = this._store.pipe(select(getProcesso));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._profile = _loginService.getUserProfile().colaborador;

        this.logEntryPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            filter(processo => !!processo && (!this.processo || processo.id !== this.processo.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
            this.logEntryPagination.filter = {
                entity: 'SuppCore\\AdministrativoBackend\\Entity\\Processo',
                id: +this.processo.id
            };
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const changes: any = {
            classificacao: values['classificacao'] ? values['classificacao'].id : null,
            dataHoraProximaTransicao: values['dataHoraProximaTransicao'] ?? null,
            lembreteArquivista: values['lembreteArquivista'] ?? null
        };

        const payload: any = {
            processo: this.processo,
            changes: changes
        };

        this._store.dispatch(new SaveProcesso(payload));
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }
}
