import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models';
import {classToPlain} from 'class-transformer';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {environment} from 'environments/environment';
import {Processo} from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {Documento} from '@cdk/models';
import {DocumentoAvulso} from '@cdk/models';
import {ObjectAssignBuiltinFn} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/builtin';

@Component({
    selector: 'cdk-componente-digital-card-list',
    templateUrl: './cdk-componente-digital-card-list.component.html',
    styleUrls: ['./cdk-componente-digital-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalCardListComponent {

    @Input()
    componentesDigitais: ComponenteDigital[] = [];

    @Input()
    processoOrigem: Processo;

    @Input()
    tarefaOrigem: Tarefa;

    @Input()
    tarefaOrigemBloco: Tarefa[];

    @Input()
    documentoAvulsoOrigem: DocumentoAvulso;

    @Input()
    documentoAvulsoOrigemBloco: DocumentoAvulso[];

    @Input()
    documentoOrigem: Documento;

    @Input()
    documento: Documento;

    @Input()
    deletingId: number[];

    @Output()
    cancel = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    @Output()
    erroUpload = new EventEmitter<string>();


    selectedIds: number[] = [];

    hasSelected = false;

    isIndeterminate = false;

    /** Target URL for file uploading. */
    @Input()
    target = `${environment.api_url}administrativo/componente_digital` + environment.xdebug;

    @Input()
    showButton = true;

    /** File extension that accepted, same as 'accept' of <input type="file" />.
     By the default, it's set to 'image/*'. */
    @Input()
    accept = 'application/pdf';

    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output()
    completed = new EventEmitter<ComponenteDigital>();

    private files: Array<FileUploadModel> = [];

    private arquivoSubscription: Subscription;

    /**
     * @param _http
     * @param _changeDetectorRef
     */
    constructor(
        private _http: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
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
        const file = new FileUploadModel();
        this.componentesDigitais = this.componentesDigitais.filter(el => el.fileName != componenteDigital.fileName);
        componenteDigital.file.sub.unsubscribe();
        this.uploadFile(componenteDigital.file);
    }

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
                    canCancel: true
                });
            }
            fileUpload.value = '';
            this.files.forEach(file => {
                this.uploadFile(file);
            });
        };
        fileUpload.click();
    }

    cancelFile(componenteDigital: ComponenteDigital): void {
        // @ts-ignore
        this.componentesDigitais = this.componentesDigitais.filter(el => el.fileName !== componenteDigital.data.name);
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
        /**
         * multipart formdata
         * const params = new FormData();
         * fd.append('conteudo', file.data);
         */
        file.canCancel = true;

        this.getBase64(file.data).then(
            conteudo => {
                const componenteDigital = new ComponenteDigital();
                componenteDigital.file = file;
                componenteDigital.conteudo = conteudo;
                componenteDigital.mimetype = 'application/pdf';
                componenteDigital.fileName = file.data.name;
                componenteDigital.tamanho = file.data.size;
                componenteDigital.processoOrigem = this.processoOrigem;
                componenteDigital.tarefaOrigem = this.tarefaOrigem;
                componenteDigital.tarefaOrigemBloco = this.tarefaOrigemBloco;
                componenteDigital.documentoAvulsoOrigem = this.documentoAvulsoOrigem;
                componenteDigital.documentoAvulsoOrigemBloco = this.documentoAvulsoOrigemBloco;
                componenteDigital.documentoOrigem = this.documentoOrigem;
                componenteDigital.documento = this.documento;

                this.componentesDigitais.push(componenteDigital);
                this._changeDetectorRef.markForCheck();

                const params = classToPlain(componenteDigital);

                const req = new HttpRequest('POST', this.target, params, {
                    reportProgress: true
                });

                componenteDigital.inProgress = true;
                this.arquivoSubscription = file.sub = this._http.request(req).pipe(
                    map(event => {
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
                        this.removeFileFromArray(file);
                        this._changeDetectorRef.markForCheck();
                        this.erroUpload.emit("Ocorreu um erro ao realizar o upload, clique no menu do arquivo e em seguida em repetir para tentar novamente!")
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