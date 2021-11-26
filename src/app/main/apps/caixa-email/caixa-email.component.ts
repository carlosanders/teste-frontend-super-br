import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Subject} from 'rxjs';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {LoginService} from '../../auth/login/login.service';
import {FormControl} from '@angular/forms';
import {filter, takeUntil} from 'rxjs/operators';
import {ContaEmail} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store'
import {Folder} from './models/folder.model';
import {getRouterState} from '../../../store';
import {Message} from './models/message.model';
import {Attachment} from './models/attachment.model';
import {DomSanitizer} from '@angular/platform-browser';
import {EmailProcessoForm} from './models/email-processo-form.model';

@Component({
    selector: 'caixa-email',
    templateUrl: './caixa-email.component.html',
    styleUrls: ['./caixa-email.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CaixaEmailComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    searchInput: FormControl = new FormControl('');
    routerState: any;
    selectedContaEmail: ContaEmail;
    selectedFolder: Folder;
    selectedMessage: Message;
    contaEmailList: ContaEmail[] = [];
    folderList: Folder[] = [];
    messageList: Message[] = [];
    messageDownloadingAttachments: string[] = [];
    messageListPagination: any = {};
    messageListIsLoading: boolean = false;
    messageListIsLoaded: any = false;
    folderIsLoaded: any = false;
    messageIsLoading: any = false;
    emailProcessoFormIsSaving: any = false;
    folderIsLoading: boolean = false;
    emailProcessoFormError: any;
    activeCard: string = 'mail-list';

    /**
     * @param _store
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _router
     * @param _sanitizer
     * @param _loginService
     */
    constructor(private _store: Store<fromStore.CaixaEmailAppState>,
                private _changeDetectorRef: ChangeDetectorRef,
                private _cdkSidebarService: CdkSidebarService,
                private _router: Router,
                private _sanitizer: DomSanitizer,
                private _loginService: LoginService)
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

        this._store
            .pipe(
                select(fromStore.getActiveCard),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe(activeCard => this.activeCard = activeCard);

        this._store
            .pipe(
                select(fromStore.getSelectedContaEmail),
                takeUntil(this._unsubscribeAll),
            )
            .subscribe(selectedContaEmail => this.selectedContaEmail = selectedContaEmail);

        this._store
            .pipe(
                select(fromStore.getContaEmailList),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(contaEmailList => this.contaEmailList = contaEmailList);

        this._store
            .pipe(
                select(fromStore.getFolderList),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((folderList) => {
                this.folderList = folderList;
                this._changeDetectorRef.markForCheck();
            });

        this._store
            .pipe(
                select(fromStore.getSelectedFolder),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((selectedFolder) => {
                this.selectedFolder = selectedFolder;

                if (!this.selectedFolder) {
                    this._store.dispatch(new fromStore.UnloadMessage());
                    this._store.dispatch(new fromStore.SetActiveCard('mail-list'));
                } else {
                    this._store.dispatch(new fromStore.GetMessages({
                        contaEmail: this.selectedContaEmail,
                        folder: this.selectedFolder,
                        pagination: {
                            ...this.messageListPagination,
                            limit: 10,
                            offset: 0,
                            filter: {
                                'folder': this.selectedFolder.uuid
                            }
                        }
                    }));
                }
                this._store.dispatch(new fromStore.SetActiveCard('mail-list'));
            });

        this._store
            .pipe(
                select(fromStore.getFolderIsLoading),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(folderIsLoading => this.folderIsLoading = folderIsLoading);

        this._store
            .pipe(
                select(fromStore.getMessageList),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((messageList) => {
                this.messageList = messageList;
                this._changeDetectorRef.markForCheck();
            });

        this._store
            .pipe(
                select(fromStore.getSelectedMessage),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(selectedMessage => this.selectedMessage = selectedMessage);

        this._store
            .pipe(
                select(fromStore.getMessageIsLoading),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(messageIsLoading => this.messageIsLoading = messageIsLoading);

        this._store
            .pipe(
                select(fromStore.getContaEmailIsSavingProcessoForm),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((emailProcessoFormIsSaving) => {
                this.emailProcessoFormIsSaving = emailProcessoFormIsSaving;
                this._changeDetectorRef.markForCheck();
            });

        this._store
            .pipe(
                select(fromStore.getContaEmailProcessoFormError),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(error => this.emailProcessoFormError = error);

        this._store
            .pipe(
                select(fromStore.getMessageListIsLoading),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(messageListIsLoading => this.messageListIsLoading = messageListIsLoading);

        this._store
            .pipe(
                select(fromStore.getMessageListIsLoaded),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(messageListIsLoaded => this.messageListIsLoaded = messageListIsLoaded);

        this._store
            .pipe(
                select(fromStore.getFolderIsLoaded),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(folderIsLoaded => this.folderIsLoaded = folderIsLoaded);

        this._store
            .pipe(
                select(fromStore.getMessagePagination),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(messageListPagination => this.messageListPagination = messageListPagination);

        this._store
            .pipe(
                select(fromStore.getMessageDownloadingAttachments),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((messageDownloadingAttachments) => {
                this.messageDownloadingAttachments = messageDownloadingAttachments;
                this._changeDetectorRef.markForCheck();
            });
    }

    pesquisar(): void
    {
        if (!this.messageListIsLoading) {
            let filter = {...this.messageListPagination.filter};

            if (this.searchInput.value.trim() !== (filter?.text || '')) {

                if (!!this.searchInput.value?.trim()) {
                    filter = {
                        ...filter,
                        'text': this.searchInput.value.trim()
                    };
                } else if (filter.hasOwnProperty('text')){
                    delete filter['text'];
                }

                const params = {
                    pagination: {
                        ...this.messageListPagination,
                        limit: 10,
                        offset: 0,
                        filter: filter,
                    },
                    contaEmail: this.selectedContaEmail,
                    folder: this.selectedFolder
                };

                this._store.dispatch(new fromStore.GetMessages(params));
            }
        }
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

    reloadFolders(): void
    {

    }

    changeContaEmail(contaEmail: ContaEmail): void
    {
        this.changeState('mail-list');
        this._router.navigate([`/apps/caixa-email/${contaEmail.id}/default`]).then();
    }

    clickFolder(folder: Folder): void
    {
        this.changeState('mail-list');
        this._router.navigate([`/apps/caixa-email/${this.selectedContaEmail.id}/${folder.uuid}`]).then()
    }

    toggleSidebar(name): void
    {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    selectMessage(message: Message): void
    {
        if (message.htmlBody) {
            this._store.dispatch(new fromStore.SetMessage(message));
        } else {
            this._store.dispatch(new fromStore.GetMessage({
                message: message,
                contaEmail: this.selectedContaEmail,
                folder: this.selectedFolder,
            }));
        }

        this._store.dispatch(new fromStore.SetActiveCard('mail-details'));
    }

    loadEmails(): void
    {
        if (this.messageList.length >= this.messageListPagination?.total || this.messageListIsLoading) {
            return;
        }

        const params = {
            pagination: {
                ...this.messageListPagination,
                limit: 10,
                offset: this.messageList.length,
            },
            increment: true,
            contaEmail: this.selectedContaEmail,
            folder: this.selectedFolder
        };

        this._store.dispatch(new fromStore.GetMessages(params));
    }

    reloadEmailList(): void
    {
        const params = {
            pagination: {
                ...this.messageListPagination,
                limit: 10,
                offset: 0,
            },
            contaEmail: this.selectedContaEmail,
            folder: this.selectedFolder
        };

        this._store.dispatch(new fromStore.GetMessages(params));
    }

    unselectMessage(): void
    {
        this._store.dispatch(new fromStore.SetMessage(null));
        this.changeState('mail-list');
    }

    downloadAttachment(attachment: Attachment): void
    {
        this._store.dispatch(new fromStore.DownloadAttachment({
            contaEmail: this.selectedContaEmail.id,
            folder: this.selectedFolder.uuid,
            message: this.selectedMessage.uuid,
            attachment: attachment.uuid
        }));
    }

    changeState(state: string): void
    {
        this._store.dispatch(new fromStore.SetActiveCard(state));
    }

    enviarParaProcesso(values: any): void
    {
        console.log('enviar processo', values)
        const emailProcessoForm = new EmailProcessoForm();
        emailProcessoForm.contaEmail = this.selectedContaEmail;
        emailProcessoForm.folderIdentifier = this.selectedFolder.uuid;
        emailProcessoForm.messageIdentifier = this.selectedMessage.uuid;

        Object.entries(values).forEach(
            ([key, value]) => {
                emailProcessoForm[key] = value;
            }
        );

        console.log('entidade/dispatch', emailProcessoForm, this.selectedContaEmail);

        this._store.dispatch(new fromStore.SaveEmailProcessoForm({
            contaEmail: this.selectedContaEmail,
            emailProcessoForm: emailProcessoForm
        }));
    }
}
