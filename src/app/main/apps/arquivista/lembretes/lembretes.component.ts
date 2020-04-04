import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LembreteService} from '../../../../../@cdk/services/lembrete.service';
import {Observable, Subject} from 'rxjs';
import {Lembrete, Processo} from '../../../../../@cdk/models';
import {getRouterState, RouterStateUrl} from '../../../../store/reducers';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-lembretes-form',
    templateUrl: './lembretes.component.html',
    styleUrls: ['./lembretes.component.scss']
})
export class LembretesComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();
    loading: boolean;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    lembretes$: Observable<Lembrete>;
    lembretes: Lembrete;
    total = 0;
    processoId: number;
    processos: Processo[] = [];
    processos$: Observable<Processo[]>;

    private routerState: RouterStateUrl;

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
        this.processos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processos => !!processos)
        ).subscribe(processos => {
            this.processos = processos;
        });
    }

    initObservales(): void{
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
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
