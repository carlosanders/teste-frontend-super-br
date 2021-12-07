import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnDestroy,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store'
import {getRouterState, RouterStateUrl} from '../../../../store';
import {Message} from '../models/message.model';
import {Folder} from '../models/folder.model';
import {ContaEmail} from '../../../../../@cdk/models';

@Component({
    selector: 'mail-list',
    templateUrl: './mail-list.component.html',
    styleUrls: ['./mail-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class MailListComponent implements OnInit, OnDestroy {

    @Input()
    selectedContaEmail: ContaEmail;

    @Input()
    selectedFolder: Folder;

    @Input()
    messageList: Message[] = [];

    @Input()
    messageListIsLoading: boolean = false;

    @Output()
    selectMessageHandler: EventEmitter<Message> = new EventEmitter<Message>();

    @Output()
    reloadEmailListHandler: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    scrollHandler: EventEmitter<void> = new EventEmitter<void>();

    private _unsubscribeAll: Subject<any> = new Subject();
    routerState: RouterStateUrl = null;

    /**
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(private _store: Store<fromStore.CaixaEmailAppState>,
                private _changeDetectorRef: ChangeDetectorRef,
                private _router: Router)
    {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll),
                filter(routerState => !!routerState)
            )
            .subscribe((routerState) => {
                this.routerState = routerState.state;
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void
    {
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    selectMessage(message: Message): void
    {
        this.selectMessageHandler.emit(message);
    }

    scroll(): void
    {
        this.scrollHandler.emit();
    }

    reloadEmailList(): void
    {
        this.reloadEmailListHandler.emit();
    }
}
