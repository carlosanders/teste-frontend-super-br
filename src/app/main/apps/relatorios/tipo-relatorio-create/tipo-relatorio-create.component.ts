import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';
import {Pagination} from '@cdk/models/pagination';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../auth/login/login.service';
import {getRouterState} from '../../../../store/reducers';
import {Back} from '../../../../store/actions';

@Component({
    selector: 'tipo-relatorio-create',
    templateUrl: './tipo-relatorio-create.component.html',
    styleUrls: ['./tipo-relatorio-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoRelatorioCreateComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoRelatorio: TipoRelatorio;
    tipoRelatorio$: Observable<TipoRelatorio>;
    formTipoRelatorio: FormGroup;
    especieRelatorioPagination: Pagination;

    constructor(
        private _store: Store<fromStore.TipoRelatorioCreateAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tipoRelatorio$ = this._store.pipe(select(fromStore.getTipoRelatorio));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.especieRelatorioPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formTipoRelatorio = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            sigla: [null, [Validators.required, Validators.minLength(3)]],
            especieRelatorio: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitTipoRelatorio(values): void {
        const tipoRelatorio = new TipoRelatorio();
        Object.entries(values).forEach(
            ([key, value]) => {
                tipoRelatorio[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveTipoRelatorio(tipoRelatorio));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
