import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit, Output, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {filter, takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import * as fromStore from "../store"
import {getRouterState, RouterStateUrl} from "../../../../store";
import {Message} from "../models/message.model";
import {Attachment} from "../models/attachment.model";
import {Address} from "../models/address.model";

@Component({
    selector: 'mail-details',
    templateUrl: './mail-details.component.html',
    styleUrls: ['./mail-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class MailDetailsComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    message: Message = null;

    @Input()
    messageIsLoading: boolean = false;

    @Output()
    downloadAttachmentHandler: EventEmitter<Attachment> = new EventEmitter<Attachment>();

    private _unsubscribeAll: Subject<any> = new Subject();
    routerState: RouterStateUrl = null;
    showDetails: boolean = false;

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

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['message']) {
            this.showDetails = false;
        }
    }


    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    downloadAttachment(attachment: Attachment): void
    {
        this.downloadAttachmentHandler.emit(attachment);
    }

    formatAddress(addresses: Address[]): string
    {
        return addresses.map(address => address.name || address.full).join(', ');
    }
}
