import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import {Back} from 'app/store';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {Observable} from 'rxjs';
import {Documento} from '@cdk/models/documento.model';

@Component({
    selector: 'anexar-copia',
    templateUrl: './anexar-copia.component.html',
    styleUrls: ['./anexar-copia.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnexarCopiaComponent implements OnInit, OnDestroy {

    componenteDigital: ComponenteDigital;
    documento$: Observable<Documento>;
    documento: Documento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    /**
     * @param _store
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getComponenteDigitalIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getComponenteDigitalErrors));

        this.documento$.subscribe(documento => {
            this.documento = documento;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    back(): void {
        this._store.dispatch(new Back());
    }

    anexarCopia(): void {
        const componenteDigital = new ComponenteDigital();

        componenteDigital.documentoOrigem = this.documento;

        componenteDigital.fileName = this.componenteDigital.fileName;
        componenteDigital.hash = this.componenteDigital.hash;
        componenteDigital.tamanho = this.componenteDigital.tamanho;
        componenteDigital.mimetype = this.componenteDigital.mimetype;
        componenteDigital.extensao = this.componenteDigital.extensao;

        this._store.dispatch(new fromStore.SaveComponenteDigital(componenteDigital));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.subscribe((componenteDigital: ComponenteDigital) => {
                this.componenteDigital = componenteDigital;
            });
        }
    }

    onDeactivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }
}
