import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Etiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../store/selectors';
import {Back} from '../../../../../../store/actions';

@Component({
    selector: 'dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    modalidadeEtiquetaPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.EtiquetaEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.usuario = this._loginService.getUserProfile();

        this.modalidadeEtiquetaPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.etiqueta$.subscribe(
            etiqueta => this.etiqueta = etiqueta
        );

        if (!this.etiqueta) {
            this.etiqueta = new Etiqueta();
            this.etiqueta.ativo = true;
            this.etiqueta.corHexadecimal = '#D9E3F0';
        }
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

        const etiqueta = new Etiqueta();

        Object.entries(values).forEach(
            ([key, value]) => {
                etiqueta[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveEtiqueta(etiqueta));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
