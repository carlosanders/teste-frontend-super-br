import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {classToPlain} from 'class-transformer';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {environment} from 'environments/environment';
import {Documento} from '@cdk/models/documento.model';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Processo} from '../../../models';

@Component({
    selector: 'cdk-componente-digital-documento-avulso-card-list',
    templateUrl: './cdk-componente-digital-documento-avulso-card-list.component.html',
    styleUrls: ['./cdk-componente-digital-documento-avulso-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalDocumentoAvulsoCardListComponent implements OnInit {

    @Input()
    componentesDigitais: ComponenteDigital[] = [];

    @Input()
    documentoAvulsoOrigem: DocumentoAvulso;

    @Input()
    documentoOrigem: Documento;

    @Input()
    processoOrigem: Processo;

    @Input()
    action: string;

    @Output()
    cancel = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    @Input()
    showButton = true;

    /**
     * File extension that accepted, same as 'accept' of <input type="file" />.
     * By the default, it's set to 'image/*'.
     */
    @Input()
    accept = 'application/pdf';

    /**
     * Allow you to add handler after its completion.
     * Bubble up response text from remote.
     */
    @Output()
    completed = new EventEmitter<ComponenteDigital>();


    private files: Array<FileUploadModel> = [];
    selectedIds: number[] = [];
    documentoAvulso: DocumentoAvulso;
    hasSelected = false;
    isIndeterminate = false;
    target: string;

    /**
     * @param _http
     * @param _changeDetectorRef
     */
    constructor(
        private _http: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
    }

    initTarget(): string {
        return `${environment.api_url}administrativo/componente_digital` + environment.xdebug;
    }

    toggleInSelected(componenteDigitalId): void {
        const selectedComponentesDigitaisId = [...this.selectedIds];

        if (selectedComponentesDigitaisId.find(id => id === componenteDigitalId) !== undefined) {
            this.selectedIds = selectedComponentesDigitaisId.filter(id => id !== componenteDigitalId);
        } else {
            this.selectedIds = [...selectedComponentesDigitaisId, componenteDigitalId];
        }

        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.componentesDigitais.length && this.selectedIds.length > 0);
        this.changedSelectedIds.emit(this.selectedIds);
    }

    onCancel(componenteDigital): void {
        this.cancelFile(componenteDigital.file);
        this.cancel.emit(componenteDigital);
    }

    onClick(componenteDigital): void {
        this.clicked.emit(componenteDigital);
    }

    onRetry(componenteDigital): void {
        this.retryFile(componenteDigital.file);
    }

    /**
     * Upload
     */

    upload(): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({
                    data: file,
                    state: 'in',
                    inProgress: false,
                    complete: false,
                    progress: 0,
                    canRetry: false,
                    canCancel: true,
                });
            }
            fileUpload.value = '';
            this.files.forEach((file) => {
                this.uploadFile(file);
            });
        };
        fileUpload.click();
    }

    cancelFile(file: FileUploadModel): void {
        file.sub.unsubscribe();
        file.inProgress = false;
        file.canRetry = true;
        file.canCancel = false;
    }

    retryFile(file: FileUploadModel): void {
        this.uploadFile(file);
        file.canRetry = false;
    }

    private getBase64(file): any {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    private uploadFile(file: FileUploadModel): void {

        file.canCancel = true;

        this.getBase64(file.data).then(
            (conteudo) => {
                const componenteDigital = new ComponenteDigital();
                this.target = this.initTarget();
                componenteDigital.conteudo = conteudo;
                componenteDigital.mimetype = 'application/pdf';
                componenteDigital.fileName = file.data.name;
                componenteDigital.tamanho = file.data.size;
                componenteDigital.documentoOrigem = this.documentoOrigem;
                componenteDigital.documentoAvulsoOrigem = this.documentoAvulsoOrigem;
                componenteDigital.processoOrigem = this.processoOrigem;

                this.componentesDigitais.push(componenteDigital);
                this._changeDetectorRef.markForCheck();

                const params = classToPlain(componenteDigital);

                const req = new HttpRequest('POST', this.target, params, {
                    reportProgress: true
                });

                componenteDigital.inProgress = true;
                file.sub = this._http.request(req).pipe(
                    map((event) => {
                        switch (event.type) {
                            case HttpEventType.UploadProgress:
                                componenteDigital.progress = Math.round(event.loaded * 100 / event.total);
                                this._changeDetectorRef.markForCheck();
                                break;
                            case HttpEventType.Response:
                                this._changeDetectorRef.markForCheck();
                                return event;
                        }
                    }),
                    tap(() => {
                    }),
                    last(),
                    catchError((error: HttpErrorResponse) => {
                        componenteDigital.inProgress = false;
                        componenteDigital.canRetry = true;
                        componenteDigital.failUpload = false;
                        componenteDigital.complete = true; // Tirar, somente para teste
                        this._changeDetectorRef.markForCheck();
                        return of(`${file.data.name} upload falhou.`);
                    })
                ).subscribe(
                    (event: any) => {
                        if (typeof (event) === 'object') {
                            componenteDigital.id = event.body.id;
                            componenteDigital.complete = true;
                            componenteDigital.inProgress = false;
                            this._changeDetectorRef.markForCheck();
                            setTimeout(() => {
                                this.removeFileFromArray(file);
                                this.componentesDigitais = this.componentesDigitais.filter(cd => cd !== componenteDigital);
                                this._changeDetectorRef.markForCheck();
                                this.completed.emit(componenteDigital);
                            }, 1000);
                        }
                    }
                );
            }
        );
    }

    private removeFileFromArray(file: FileUploadModel): void {
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
        }
    }
}

export class FileUploadModel {
    data: File;
    state: string;
    complete: boolean;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
}
