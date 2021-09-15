import {Injectable, SecurityContext} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, mergeMap, switchMap, tap} from 'rxjs/operators';
import {State} from 'app/store/reducers';
import * as fromStore from '../index';
import {EmailClientService} from "../../services/email-client.service";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class MessageEffects {

    constructor(private _actions: Actions,
                private _store: Store<State>,
                private _sanitizer: DomSanitizer,
                private _emailClientService: EmailClientService)
    {
    }

    getMessages: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<fromStore.GetMessages>(fromStore.GET_MESSAGES),
                concatMap(
                    action => this._emailClientService
                        .getMessages(
                            action.payload.contaEmail.id,
                            JSON.stringify(action.payload.pagination.filter),
                            action.payload.pagination.limit,
                            action.payload.pagination.offset,
                        )
                        .pipe(
                            concatMap(response => [
                                new fromStore.GetMessagesSuccess({
                                    messages: response['entities'],
                                    total: response['total'],
                                    folder: action.payload.folder,
                                    contaEmailId: action.payload.contaEmail.id
                                })
                            ]),
                            catchError((err) => {
                                return of(new fromStore.GetMessagesFailed(err));
                            })
                        )
                )
            );
    });

    getMessage: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<fromStore.GetMessage>(fromStore.GET_MESSAGE),
                concatMap(
                    action => this._emailClientService
                        .getMessage(
                            action.payload.contaEmail.id,
                            action.payload.folder.uuid,
                            action.payload.message.id
                        )
                        .pipe(
                            concatMap(response => [
                                new fromStore.GetMessageSuccess(response)
                            ]),
                            catchError((err) => {
                                return of(new fromStore.GetMessageFailed(err));
                            })
                        )
                )
            );
    });

    downloadAttachment: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<fromStore.DownloadAttachment>(fromStore.DOWNLOAD_ATTACHMENT),
                switchMap((action) => this._emailClientService.getMessageAttachment(
                    action.payload.contaEmail,
                    action.payload.folder,
                    action.payload.message,
                    action.payload.attachment,
                )),
                tap((response: any) => {





                    // if (response && response.content) {
                    //     const byteCharacters = atob(response.content.split(';base64,')[1]);
                    //     const byteArray = new Uint8Array(byteCharacters.length);
                    //     for (let i = 0; i < byteCharacters.length; i++) {
                    //         byteArray[i] = byteCharacters.charCodeAt(i);
                    //     }
                    //
                    //     const blob = new Blob([byteArray], {type: response.mimetype});
                    //     const URL = window.URL;
                    //
                    //     if (response.mimetype === 'application/pdf' || response.mimetype === 'text/html') {
                    //         const data = URL.createObjectURL(blob);
                    //         window.open(data, '_blank');
                    //         setTimeout( () => {
                    //             // For Firefox it is necessary to delay revoking the ObjectURL
                    //             URL.revokeObjectURL(data);
                    //         }, 100);
                    //     } else {
                    //         // const downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                    //         const downloadUrl = URL.createObjectURL(blob);
                    //         const downloadLink = document.createElement('a');
                    //         const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, downloadUrl);
                    //         downloadLink.target = '_blank';
                    //         // downloadLink.href = sanitizedUrl;
                    //         downloadLink.href = downloadUrl;
                    //         downloadLink.download = response.fileName;
                    //         // document.body.appendChild(downloadLink);
                    //         downloadLink.click();
                    //         // document.body.removeChild(downloadLink);
                    //         setTimeout( () => {
                    //             // For Firefox it is necessary to delay revoking the ObjectURL
                    //             // URL.revokeObjectURL(sanitizedUrl);
                    //             URL.revokeObjectURL(downloadUrl);
                    //         }, 100);
                    //     }
                    // }
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new fromStore.DownloadAttachmentFailed(err));
                    return caught;
                })
            );
    });

}
