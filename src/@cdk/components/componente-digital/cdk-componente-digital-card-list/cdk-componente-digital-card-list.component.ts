import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital, Documento, DocumentoAvulso, Processo, Tarefa, Visibilidade} from '@cdk/models';
import {classToPlain, plainToClass} from 'class-transformer';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpParams, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {environment} from 'environments/environment';
import {CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import {CdkUtils} from '../../../utils';

@Component({
    selector: 'cdk-componente-digital-card-list',
    templateUrl: './cdk-componente-digital-card-list.component.html',
    styleUrls: ['./cdk-componente-digital-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalCardListComponent {

    @ViewChild('file', {static: false}) file: ElementRef<HTMLInputElement>;

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

    @Input()
    mode: string = 'tarefa';

    @Input()
    uploadMode: string = 'concorrente';

    @Output()
    cancel = new EventEmitter<number>();

    @Output()
    clicked = new EventEmitter<number>();

    @Output()
    changedSelectedIds = new EventEmitter<number[]>();

    @Output()
    erroUpload = new EventEmitter<string>();

    /** Target URL for file uploading. */
    @Input()
    target = `${environment.api_url}administrativo/componente_digital` + environment.xdebug;

    @Input()
    showButton = true;

    /** File extension that accepted, same as 'accept' of <input type="file" />.
     By the default, it's set to 'image/*'. */
    @Input()
    accept = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];

    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output()
    completed = new EventEmitter<ComponenteDigital>();

    /**
     * Disparado quando o upload de todos os componentes digitais for concluído, ou quando restarem apenas uploads com erro na fila
     */
    @Output()
    completedAll = new EventEmitter<any>();

    /**
     * Disparado quando o upload for iniciado
     */
    @Output()
    startedUpload = new EventEmitter<any>();

    selectedIds: number[] = [];

    hasSelected = false;

    isIndeterminate = false;

    uploading: boolean = false;

    pending: Array<FileUploadModel> = [];

    lastOrder = 0;

    hasErrors: Array<any> = [];

    private files: Array<FileUploadModel> = [];

    private currentFile: FileUploadModel = null;

    private arquivoSubscription: Subscription;

    /**
     * @param _http
     * @param _changeDetectorRef
     */
    constructor(
        private _http: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

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
        this.cancelFile(componenteDigital);
        this.cancel.emit(componenteDigital);
    }

    onClick(componenteDigital): void {
        this.clicked.emit(componenteDigital);
    }

    onRetry(componenteDigital: ComponenteDigital): void {
        this.hasErrors = this.hasErrors.filter(fileError => fileError !== componenteDigital.file);
        this.componentesDigitais = this.componentesDigitais.filter(el => el.file !== componenteDigital.file);
        componenteDigital.canRetry = false;
        componenteDigital.errorMsg = null;
        this._changeDetectorRef.markForCheck();
        componenteDigital.file.sub.unsubscribe();
        const file = componenteDigital.file;
        file.canCancel = false;
        file.progress = 0;
        file.canRetry = false;
        file.retrying = true;
        this.componentesDigitais.push(componenteDigital);
        this._changeDetectorRef.markForCheck();
        if (this.uploadMode !== 'linear') {
            this.uploadFile(componenteDigital.file);
        } else {
            this.files.push(file);
            if (!this.currentFile) {
                this.uploadNext();
            }
        }
    }

    upload(): void {
        // const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        this.file.nativeElement.onchange = () => {
            for (let index = 0; index < this.file.nativeElement.files.length; index++) {
                this.lastOrder++;
                const tmpFile = this.file.nativeElement.files[index];
                const file = {
                    data: tmpFile,
                    state: 'in',
                    inProgress: false,
                    complete: false,
                    progress: 0,
                    canRetry: false,
                    canCancel: true,
                    retrying: false,
                    chave: this.lastOrder
                };
                this.files.push(file);
                this.pending.push(file);
                const componenteDigital = new ComponenteDigital();
                componenteDigital.file = file;
                componenteDigital.mimetype = file.data.type;
                componenteDigital.fileName = file.data.name;
                componenteDigital.tamanho = file.data.size;
                componenteDigital.processoOrigem = this.processoOrigem;
                componenteDigital.tarefaOrigem = this.tarefaOrigem;
                componenteDigital.tarefaOrigemBloco = this.tarefaOrigemBloco;
                componenteDigital.documentoAvulsoOrigem = this.documentoAvulsoOrigem;
                componenteDigital.documentoAvulsoOrigemBloco = this.documentoAvulsoOrigemBloco;
                componenteDigital.documentoOrigem = this.documentoOrigem;
                componenteDigital.documento = this.documento;
                componenteDigital.canRetry = false;
                componenteDigital.errorMsg = null;
                componenteDigital.inProgress = false;

                this.componentesDigitais.push(componenteDigital);
                this._changeDetectorRef.markForCheck();
            }
            this.file.nativeElement.value = '';

            if (this.uploadMode === 'linear') {
                // Ordenar os arquivos em ordem alfabética
                this.files.sort((a, b) => a.data.name.localeCompare(b.data.name));
                this.pending.sort((a, b) => a.data.name.localeCompare(b.data.name));
                this.componentesDigitais.sort((a, b) => a.fileName.localeCompare(b.fileName));
                this._changeDetectorRef.markForCheck();
            }
            if (this.uploadMode !== 'linear') {
                this.start();
            }
        };
        this.file.nativeElement.click();
    }

    start(): void {
        this.startedUpload.emit(true);
        this.uploading = true;
        if (this.uploadMode !== 'linear') {
            this.files.forEach((file) => {
                this.uploadFile(file);
            });
        } else {
            this.uploadNext();
        }
    }

    uploadNext(): void {
        this.pending = this.files.filter(file => (!file.canRetry && !file.retrying));
        if (this.files.length > 0) {
            this.currentFile = this.files.shift();
            this.uploadFile(this.currentFile);
        } else {
            this.currentFile = null;
            this.uploading = false;
            if (!this.hasErrors.length) {
                this.completedAll.emit(true);
            }
        }
    }

    cancelFile(componenteDigital: ComponenteDigital): void {
        // @ts-ignore
        this.componentesDigitais = this.componentesDigitais.filter(el => el.file !== componenteDigital.file);
        this.removeFileFromArray(componenteDigital.file);
        if (!this.hasErrors.length && !this.uploading) {
            this.completedAll.emit(true);
        }
        this._changeDetectorRef.markForCheck();
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
            (conteudo) => {
                const componenteDigital = this.componentesDigitais.find(cd => cd.file === file);
                componenteDigital.conteudo = conteudo;
                this._changeDetectorRef.markForCheck();

                const body = classToPlain(componenteDigital);
                const params = {};
                params['populate'] = JSON.stringify([
                    'documento',
                    'documento.tipoDocumento'
                ]);

                const req = new HttpRequest('POST', this.target, body, {
                    reportProgress: true,
                    params: new HttpParams({fromObject: params})
                });

                componenteDigital.inProgress = true;
                this.arquivoSubscription = file.sub = this._http.request(req).pipe(
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
                        this.hasErrors.push(file);
                        componenteDigital.inProgress = false;
                        componenteDigital.canRetry = true;
                        componenteDigital.errorMsg = CdkUtils.errorsToString(error);
                        file.inProgress = false;
                        file.canRetry = true;
                        file.retrying = false;
                        this.currentFile = null;
                        if (this.uploadMode !== 'linear') {
                            this.removeFileFromArray(file);
                            if (!this.files.length && !this.hasErrors.length) {
                                this.completedAll.emit(true);
                            }
                        }
                        this._changeDetectorRef.markForCheck();
                        this.erroUpload.emit('Ocorreu um erro ao realizar o upload, clique no menu do arquivo e em seguida em repetir para tentar novamente!');
                        if (this.uploadMode === 'linear') {
                            this.uploadNext();
                        }
                        return of(`${file.data.name} upload falhou.`);
                    })
                ).subscribe(
                    (event: any) => {
                        if (typeof (event) === 'object') {
                            componenteDigital.id = event.body.id;
                            componenteDigital.complete = true;
                            componenteDigital.inProgress = false;
                            componenteDigital.documento = plainToClass(Documento, event.body.documento);
                            delete componenteDigital.documento.tarefaOrigem;
                            this.currentFile = null;
                            this._changeDetectorRef.markForCheck();
                            setTimeout(() => {
                                if (this.uploadMode !== 'linear') {
                                    this.removeFileFromArray(file);
                                    if (!this.files.length && !this.hasErrors.length) {
                                        this.completedAll.emit(true);
                                    }
                                }

                                this.componentesDigitais = this.componentesDigitais.filter(cd => cd !== componenteDigital);
                                this._changeDetectorRef.markForCheck();
                                this.completed.emit(componenteDigital);
                                if (this.uploadMode === 'linear') {
                                    this.uploadNext();
                                }
                            }, 1000);
                        }
                    }
                );
            }
        );

    }

    drop(event: CdkDragEnter<any>): void {
        moveItemInArray(this.componentesDigitais, event.item.data, event.container.data);
        //moveItemInArray(this.componentesDigitais, event.previousIndex, event.currentIndex);
        const tmpFiles: FileUploadModel[] = [];
        this.componentesDigitais.forEach((componente) => {
            tmpFiles.push(componente.file);
        });
        this.files = [...tmpFiles];
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
    retrying: boolean;
    canCancel: boolean;
    chave: number;
    sub?: Subscription;
}
