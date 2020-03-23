import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LembreteService} from '../../../../../@cdk/services/lembrete.service';
import {Observable} from 'rxjs';
import {Lembrete, Processo} from '../../../../../@cdk/models';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as fromStoreProcesso from '../../processo/store';

@Component({
    selector: 'app-lembretes-form',
    templateUrl: './lembretes.component.html',
    styleUrls: ['./lembretes.component.scss']
})
export class LembretesComponent implements OnInit {

    loading: boolean;
    lembretes$: Observable<Lembrete>;
    lembretes: Lembrete;
    processo$: Observable<Processo>;
    processo: Processo;
    total = 0;
    processoId: number;

    private routerState: RouterStateUrl;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _lembreteService: LembreteService,
        private _store: Store<fromStore.LembreteAppState>
    ) {
        this.loading = false;
        this.initObservales();
        this.initRouteState();
        this.setProcessoId();
    }

    ngOnInit(): void {
    }

    initObservales(): void{
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(fromStoreProcesso.getProcesso));
        this.lembretes$ = this._store.pipe(select(fromStore.getLembreteList));
    }

    initRouteState(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    setProcessoId(): void{
        this.processoId = this.routerState.params.processoHandle;
    }

    submit(values): void {
        const lembrete = new Lembrete();

        Object.entries(values).forEach(
            ([key, value]) => {
                lembrete[key] = value;
            }
        );
        this._store.dispatch(new fromStore.SaveLembrete(lembrete));

    }

}
