import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../../../store';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '../../../../../../@cdk/animations';
import {Back, getRouterState} from '../../../../../store';

@Component({
    selector: 'transicao-workflow',
    templateUrl: './transicao-workflow.component.html',
    styleUrls: ['./transicao-workflow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoWorkflowComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    action = '';
    routerState: any;

    constructor(
        private _store: Store<fromStore.State>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}