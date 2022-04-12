import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {ComponenteDigital} from '@cdk/models';
import {Back} from "../../../store";

@Component({
    selector: 'validacao-assinatura',
    templateUrl: './valicadao-assinatura.component.html',
    styleUrls: ['./validao-assinatura.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ValidacaoAssinaturaComponent implements OnInit {
    componenteDigital$: Observable<ComponenteDigital>;
    isLoading$: Observable<boolean>;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.ValidacaoAssinaturaAppState>
    ) {
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.isLoading$ = this._store.pipe(select(fromStore.getIsLoading));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.componenteDigital$.subscribe((c) => console.log('teste', c))
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
