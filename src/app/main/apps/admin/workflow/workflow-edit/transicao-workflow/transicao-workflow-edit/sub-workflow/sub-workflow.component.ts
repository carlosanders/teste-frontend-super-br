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
import {State} from 'app/store/reducers';
import {getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'sub-workflow',
    templateUrl: './sub-workflow.component.html',
    styleUrls: ['./sub-workflow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SubWorkflowComponent implements OnInit, OnDestroy {

    routerState: any;

    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private _store: Store<State>,
                private _changeDetectorRef: ChangeDetectorRef,
                private _router: Router)
    {
    }

    ngOnInit(): void
    {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
