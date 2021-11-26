import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef, EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit, Output, SimpleChanges, ViewChild,
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
import {Attachment} from '../models/attachment.model';
import {Address} from '../models/address.model';
import {DomSanitizer} from "@angular/platform-browser";

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
    messageDownloadingAttachments: string[] = [];

    @Input()
    messageIsLoading: boolean = false;

    @Output()
    downloadAttachmentHandler: EventEmitter<Attachment> = new EventEmitter<Attachment>();

    @Output()
    voltarHandler: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    processoFormHandler: EventEmitter<void> = new EventEmitter<void>();

    // @ViewChild('iframe', {static: false})
    // iframe: ElementRef;

    private _unsubscribeAll: Subject<any> = new Subject();
    routerState: RouterStateUrl = null;
    showDetails: boolean = false;

    /**
     * @param _store
     * @param _changeDetectorRef
     * @param sanitizer
     * @param _router
     */
    constructor(private _store: Store<fromStore.CaixaEmailAppState>,
                private _changeDetectorRef: ChangeDetectorRef,
                private sanitizer: DomSanitizer,
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    downloadAttachment(attachment: Attachment): void
    {
        if (!this.messageDownloadingAttachments.length) {
            this.downloadAttachmentHandler.emit(attachment);
        }
    }

    voltar(): void
    {
        this.voltarHandler.emit();
    }

    processoForm(): void
    {
        this.processoFormHandler.emit();
    }

    formatAddress(addresses: Address[]): string
    {
        return addresses.map(address => address.name || address.full).join(', ');
    }

    isAttachmentLoading(attachment: Attachment): boolean
    {
        return this.messageDownloadingAttachments.includes(attachment.uuid);
    }

    // onLoadIframe(): void
    // {
    //     let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    //     doc.body.insertAdjacentHTML('beforeend',this.message.htmlBody);
    // }
}
