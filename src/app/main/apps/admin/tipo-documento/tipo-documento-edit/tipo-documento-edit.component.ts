import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '../../../../../../@cdk/animations';
import {Observable} from 'rxjs';
import {Pagination, TipoDocumento} from '../../../../../../@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'tipo-documento-edit',
    templateUrl: './tipo-documento-edit.component.html',
    styleUrls: ['./tipo-documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoDocumentoEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoDocumento: TipoDocumento;
    tipoDocumento$: Observable<TipoDocumento>;
    formTipoDocumento: FormGroup;
    especieDocumentoPagination: Pagination;

    constructor(
        private _store: Store<fromStore.TipoDocumentoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tipoDocumento$ = this._store.pipe(select(fromStore.getTipoDocumento));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
        this.especieDocumentoPagination = new Pagination();
        this.loadForm();
    }

    ngOnInit(): void {
    }

    loadForm(): void {
        this.formTipoDocumento = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            sigla: [null, [Validators.required, Validators.minLength(3)]],
            especieDocumento: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submitTipoDocumento(values): void {
        const tipoDocumento = new TipoDocumento();
        Object.entries(values).forEach(
            ([key, value]) => {
                tipoDocumento[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveTipoDocumento(tipoDocumento));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
