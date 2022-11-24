import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {cdkAnimations} from '../../../animations';
import {Documento} from '../../../models';

@Component({
    selector: 'cdk-documento-view',
    templateUrl: './cdk-documento-view.component.html',
    styleUrls: ['./cdk-documento-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoViewComponent implements OnInit, DoCheck {

    loading: boolean;

    @Input()
    binary$: Observable<any>;

    @Input()
    documentos: Documento[] = [];

    @Input()
    componenteDigitalAtualId: any;

    src: any;

    routerState: any;

    @Output()
    next = new EventEmitter<any>();

    @Output()
    back = new EventEmitter<any>();

    @Output()
    previous = new EventEmitter<any>();

    controlDirection: any;

    nextDocumento: Documento;
    previousDocumento: Documento;

    isLast: boolean;
    isFirst: boolean;

    constructor(
        private _location: Location,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.binary$.subscribe(
            (binary) => {
                if (binary?.src?.conteudo) {
                    const byteCharacters = atob(binary.src.conteudo.split(';base64,')[1]);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {type: binary.src.mimetype});
                    const URL = window.URL;
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                } else {
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
                }
                this.loading = binary.loading;
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    doBack(): void {
        this.back.emit();
    }

    doNext(): void {
        this.next.emit(this.nextDocumento);
    }

    doPrevious(): void {
        this.previous.emit(this.previousDocumento);
    }

    ngDoCheck(): void {
        this.documentos.forEach((documento, key) => {
            if (documento.componentesDigitais[0].id === this.componenteDigitalAtualId) {
                this.nextDocumento =  key === this.documentos.length - 1 ? this.documentos[key] : this.documentos[key + 1];
                this.isLast = key === this.documentos.length - 1;
                this.previousDocumento = key === 0 ? this.documentos[key] : this.documentos[key - 1];
                this.isFirst = key === 0;
            }
        });
    }

}
