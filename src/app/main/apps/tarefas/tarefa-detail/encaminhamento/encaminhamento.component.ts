import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Component({
    selector: 'encaminhamento',
    templateUrl: './encaminhamento.component.html',
    styleUrls: ['./encaminhamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EncaminhamentoComponent implements OnInit, OnDestroy {

    form: FormGroup;
    routerState: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _store: Store<State>,
        private _router: Router
    ) {

        this.form = this._formBuilder.group({
            options: ['criar_tarefa']
        });

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.get('options').value === 'criar_tarefa') {
            this._router.navigate(['apps/tarefas/entrada/criar']).then();

        }
        if (this.form.get('options').value === 'arquivar') {

        }
        if (this.form.get('options').value === 'remeter') {

        }
    }

    cancel(): void {
        this._router.navigate(['apps/tarefas/entrada']).then();
    }
}
