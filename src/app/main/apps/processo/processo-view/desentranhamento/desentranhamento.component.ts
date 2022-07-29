import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Desentranhamento, Juntada, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {distinctUntilKeyChanged, filter} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {CdkConfirmDialogComponent} from '../../../../../../@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SetCurrentStep} from '../store';
import * as ProcessoViewActions from "../store/actions/processo-view.actions";

@Component({
    selector: 'desentranhamento',
    templateUrl: './desentranhamento.component.html',
    styleUrls: ['./desentranhamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DesentranhamentoComponent implements OnInit, OnDestroy {

    desentranhamento: Desentranhamento;

    juntada$: Observable<Juntada>;
    juntada: Juntada;
    selecionadas: any[] = [];

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processoDestinoPagination: Pagination;

    routerState: any;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;

    juntadasBloco: Juntada[] = [];

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param dialog
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.ProcessoViewDesentranhamentoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));

        this.processoDestinoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.juntada$.pipe(
            filter(juntada => !!juntada),
            distinctUntilKeyChanged('id')
        ).subscribe((juntada) => {
            this.juntada = juntada;
            this.selecionadas = [juntada];
            this.juntadasBloco = this.selecionadas;
            this.desentranhamento = new Desentranhamento();
            this.desentranhamento.juntada = this.juntada;

            this.processoDestinoPagination.filter = {
                'id': 'neq:' + this.juntada.volume.processo.id
            };
            this._changeDetectorRef.detectChanges();
        });
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.replace(('desentranhar/' + this.routerState.params.juntadaHandle), '')])
            .then(() => {
                if (this.routerState.params['stepHandle'] !== 'latest' && this.routerState.params['stepHandle'] !== 'capa') {
                    const stepHandle = this.routerState.params['stepHandle'].split('-');
                    const currentStep = {
                        step: parseInt(stepHandle[0], 10),
                        subStep: parseInt(stepHandle[1], 10)
                    };
                    this._store.dispatch(new SetCurrentStep(currentStep));
                } else if (this.routerState.params['stepHandle'] === 'capa') {
                    this._store.dispatch(new ProcessoViewActions.GetCapaProcesso());
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const desentranhamento = new Desentranhamento();

        Object.entries(values).forEach(
            ([key, value]) => {
                desentranhamento[key] = value;
            }
        );

        desentranhamento.juntada = this.juntada;
        desentranhamento.juntadasBloco = this.juntadasBloco;

        this.confirmDialogRef = this.dialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'Este procedimento é irreversível. Deseja realmente desentranhar a juntada?'
            },
            disableClose: false
        });
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.SaveDesentranhamento({
                    desentranhamento: desentranhamento,
                    operacaoId: operacaoId
                }));
            }
            this.confirmDialogRef = null;
        });
    }
}
