import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {TipoValidacaoWorkflow, ValidacaoTransicaoWorkflow} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../../../../../store';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {LoginService} from '../../../../../../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'validacao-transicao-workflow-edit',
    templateUrl: './validacao-transicao-workflow-edit.component.html',
    styleUrls: ['./validacao-transicao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ValidacaoTransicaoWorkflowEditComponent implements OnInit, OnDestroy {

    routerState: any;
    validacao$: Observable<ValidacaoTransicaoWorkflow>;
    validacao: ValidacaoTransicaoWorkflow;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoValidacaoWorkflowList: TipoValidacaoWorkflow[];
    tipoValidacaoWorkflowList$: Observable<TipoValidacaoWorkflow[]>;
    action: string;
    componentUrl: string;
    tipoValidacaoControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _changeDetector
     */
    constructor(
        private _store: Store<fromStore.ValidacaoTransicaoWorkflowEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _changeDetector: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.validacao$ = this._store.pipe(select(fromStore.getValidacao));
        this.tipoValidacaoWorkflowList$ = this._store.pipe(select(fromStore.getTipoValidacaoWorkflowList));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.action = '';
            this.routerState = routerState.state;
            this.componentUrl = 'validacoes/editar/' + this.routerState.params.validacaoTransicaoWorkflowHandle;
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.validacao$.pipe(
            filter(validacao => !!validacao),
            takeUntil(this._unsubscribeAll)
        ).subscribe(validacao => this.validacao = validacao);

        this.tipoValidacaoWorkflowList$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tipoValidacaoWorkflowList => this.tipoValidacaoWorkflowList = tipoValidacaoWorkflowList);

        if (!this.validacao) {
            this.validacao = new ValidacaoTransicaoWorkflow();
        }
        this.tipoValidacaoControl.valueChanges.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((valor) => {
            this.selectValidacaoWorkflow(valor);
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

    goBack(): void {
        this._router.navigate([this.routerState.url.replace(this.componentUrl, 'validacoes/listar')]).then();
    }

    displayFn(): string {
        const tipoValidacao = this.tipoValidacaoWorkflowList.find(tipo => tipo.valor === this.tipoValidacaoControl.value);
        return tipoValidacao ? tipoValidacao.valor : '';
    }

    getCaminhoTipoValidacao(tipoValidacao: string): string {
        return this.routerState.url.split(this.componentUrl)[0] + this.componentUrl + '/' +
            tipoValidacao.replace(/ /g, '-').toLowerCase();
    }

    selectValidacaoWorkflow(tipoValidacaoWorkflow: string): void {
        this._router.navigate([
            this.getCaminhoTipoValidacao(tipoValidacaoWorkflow)
        ]).then();
    }

    onActivate(componentReference): void {
        if (componentReference.startup) {
            componentReference.startup.subscribe((valor: string) => {
                if (!this.tipoValidacaoControl.value || this.tipoValidacaoControl.value !== valor) {
                    this.tipoValidacaoControl.setValue(valor, {emitEvent: false});
                }
            });
        }
    }
}
