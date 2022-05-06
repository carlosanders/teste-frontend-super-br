import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SecurityContext,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {ComponenteDigital} from '@cdk/models';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfJsViewerComponent} from 'ng2-pdfjs-viewer';

@Component({
    selector: 'cdk-componente-digital-view',
    templateUrl: './cdk-componente-digital-view.component.html',
    styleUrls: ['./cdk-componente-digital-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalViewComponent implements OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    componenteDigital: ComponenteDigital;

    @ViewChild('pdfViewerDocumentoEdit', {static: false}) set content(content: PdfJsViewerComponent) {
        if (content) {
            this.pdfViewer = content;
            if (!this.pdfViewer.pdfSrc && this.componenteDigital && this.componenteDigital.mimetype === 'application/pdf' && this.src) {
                this.pdfViewer.pdfSrc = this.src;
                this.src = null;
                this.pdfViewer.refresh();
            }
            this._changeDetectorRef.detectChanges();
        }
    }

    @Input()
    config = {
        language: 'pt-br'
    };

    src: any;

    downloadUrl = null;
    unsafe = false;
    fileName = '';
    zoom: number = 0;

    private pdfViewer: PdfJsViewerComponent;

    /**
     * @param _changeDetectorRef
     * @param _sanitizer
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.fetch();
    }

    isHtml(filename): boolean {
        const name = filename.split('.');
        return ('HTML' === [...name].pop()) || ('html' === [...name].pop());
    }

    zoomIn(): void {
        if (this.zoom < 10) {
            this.zoom++;
        }
    }

    zoomOut(): void {
        if (this.zoom > 0) {
            this.zoom--;
        }
    }

    getZoomClass(filename): string {
        return this.isHtml(filename) ? `zoom-${this.zoom}x` : '';
    }

    getLayoutClass(filename): string {
        if (!this.isHtml(filename)) {
            return;
        }

        return 'compact-panel';
    }

    fetch(): void {
        if (this.componenteDigital && this.componenteDigital.conteudo) {
            const byteCharacters = atob(this.componenteDigital.conteudo.split(';base64,')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: this.componenteDigital.mimetype});
            const URL = window.URL;

            switch (this.componenteDigital.mimetype) {
                case 'text/html':
                    this.downloadUrl = null;
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                    break;
                case 'application/pdf':
                    this.downloadUrl = null;
                    if (this.pdfViewer) {
                        this.pdfViewer.pdfSrc = blob;
                        this.pdfViewer.refresh();
                    } else {
                        this.src = blob;
                    }
                    break;
                default:
                    this.src = null;
                    this.downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            }

            if (this.componenteDigital.unsafe) {
                this.unsafe = true;
                this.fileName = this.componenteDigital.fileName + ' - Exibido em PDF por Segurança!';
            } else {
                this.fileName = this.componenteDigital.fileName;
                this.unsafe = false;
            }
        } else {
            this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        }
        this._changeDetectorRef.markForCheck();
    }

    doDownload(): void {
        const downloadLink = document.createElement('a');
        const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.downloadUrl);
        downloadLink.target = '_blank';
        downloadLink.href = sanitizedUrl;
        downloadLink.download = this.fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(sanitizedUrl);
        }, 100);
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        setTimeout(() => {
            const element: HTMLIFrameElement = document.getElementById('iframe-juntadas') as HTMLIFrameElement;
            const iframe = element?.contentWindow?.document;
            if (iframe !== null) {
                iframe.open();
                // eslint-disable-next-line max-len
                iframe.write('<html><head><title></title><style>html, body, .center-container { height: 100%; overflow: hidden } .center-container { display: flex; align-items: center; justify-content: center; }</style></head><body><div class="center-container">Download Realizado!</div></body></html>');
                iframe.close();
            }
        });
        this.downloadUrl = null;
    }

    print(): void {
        window.frames['documento-html'].focus();
        window.frames['documento-html'].print();
    }
}
