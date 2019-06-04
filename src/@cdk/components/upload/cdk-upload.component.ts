import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ChangeDetectionStrategy,
    ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';
import {
    HttpClient, HttpRequest,
    HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {of} from 'rxjs/observable/of';
import {catchError, last, map, tap} from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {fuseAnimations} from '@fuse/animations';
import {environment} from 'environments/environment';
import {classToPlain} from 'class-transformer';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {Processo} from '@cdk/models/processo.model';
import {Tarefa} from '@cdk/models/tarefa.model';

@Component({
    selector: 'cdk-upload',
    templateUrl: './cdk-upload.component.html',
    styleUrls: ['./cdk-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class CdkUploadComponent implements OnInit {

    /** Link text */
    @Input()
    text = 'Upload';

    @Input()
    processoOrigem: Processo;

    @Input()
    tarefaOrigem: Tarefa;

    /** Name used in form which will be sent in HTTP request. */
    @Input()
    param = 'file';

    /** Target URL for file uploading. */
    @Input()
    target = `${environment.api_url}componente_digital` + environment.xdebug;

    @Input()
    showButton = true;

    /** File extension that accepted, same as 'accept' of <input type="file" />.
     By the default, it's set to 'image/*'. */
    @Input()
    accept = 'application/pdf';

    /** Allow you to add handler after its completion. Bubble up response text from remote. */
    @Output()
    complete = new EventEmitter<number>();

    @ViewChild(MatPaginator)
    filesPaginator: MatPaginator;

    @ViewChild(MatSort)
    filesSort: MatSort;

    filesDisplayedColumns: string[] = ['fileName', 'fileSize', 'status', 'actions'];

    filesDataSource: MatTableDataSource<FileUploadModel>;

    private files: Array<FileUploadModel> = [];

    constructor(
        private _http: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.filesDataSource = new MatTableDataSource(this.files);
    }

    ngOnInit(): void {
        this.filesDataSource.paginator = this.filesPaginator;
        this.filesDataSource.sort = this.filesSort;

        this.filesDataSource.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.filesDataSource.paginator._intl.nextPageLabel = 'Seguinte';
        this.filesDataSource.paginator._intl.previousPageLabel = 'Anterior';
    }

    onClick(): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({
                    data: file, state: 'in',
                    inProgress: false,
                    complete: false,
                    progress: 0,
                    canRetry: false,
                    canCancel: true
                });
                this.filesDataSource._updateChangeSubscription();
                this._changeDetectorRef.markForCheck();
            }
            this.uploadFiles();
        };
        fileUpload.click();
    }

    cancelFile(file: FileUploadModel): void {
        file.sub.unsubscribe();
        file.inProgress = false;
        file.canRetry = true;
        file.canCancel = false;
        // this.removeFileFromArray(file);
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

        /**
         multipart formdata
         const params = new FormData();
         fd.append('conteudo', file.data);
         */

        file.canCancel = true;

        this.getBase64(file.data).then(
            conteudo => {
                const componenteDigital = new ComponenteDigital();
                componenteDigital.conteudo = conteudo;
                componenteDigital.mimetype = 'application/pdf';
                componenteDigital.fileName = file.data.name;
                componenteDigital.tamanho = file.data.size;
                componenteDigital.processoOrigem = this.processoOrigem;
                componenteDigital.tarefaOrigem = this.tarefaOrigem;

                const params = classToPlain(componenteDigital);

                const req = new HttpRequest('POST', this.target, params, {
                    reportProgress: true
                });

                file.inProgress = true;
                file.sub = this._http.request(req).pipe(
                    map(event => {
                        switch (event.type) {
                            case HttpEventType.UploadProgress:
                                file.progress = Math.round(event.loaded * 100 / event.total);
                                this.filesDataSource._updateChangeSubscription();
                                this._changeDetectorRef.markForCheck();
                                break;
                            case HttpEventType.Response:
                                this.filesDataSource._updateChangeSubscription();
                                this._changeDetectorRef.markForCheck();
                                return event;
                        }
                    }),
                    tap(() => {
                    }),
                    last(),
                    catchError((error: HttpErrorResponse) => {
                        file.inProgress = false;
                        file.canRetry = true;
                        this.filesDataSource._updateChangeSubscription();
                        return of(`${file.data.name} upload falhou.`);
                    })
                ).subscribe(
                    (event: any) => {
                        if (typeof (event) === 'object') {
                            file.complete = true;
                            file.inProgress = false;
                            setTimeout(() => {
                                this.removeFileFromArray(file);
                                this._changeDetectorRef.markForCheck();
                                this.complete.emit(this.files.length);
                            }, 1000);
                        }
                    }
                );
            }
        );


    }

    private uploadFiles(): void {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.value = '';

        this.files.forEach(file => {
            this.uploadFile(file);
        });
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
