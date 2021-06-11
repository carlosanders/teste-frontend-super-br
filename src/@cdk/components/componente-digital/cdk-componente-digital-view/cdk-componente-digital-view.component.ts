import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SecurityContext,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

import {ComponenteDigital} from '@cdk/models';
import {DomSanitizer} from '@angular/platform-browser';

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

    src: any;

    @Input()
    config = {
        language: 'pt-br'
    };

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
            if (this.componenteDigital.mimetype === 'application/pdf' || this.componenteDigital.mimetype === 'text/html') {
                this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            } else {
                const downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                    const downloadLink = document.createElement('a');
                const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, downloadUrl);
                downloadLink.target = '_blank';
                downloadLink.href = sanitizedUrl;
                downloadLink.download = this.componenteDigital.fileName;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                setTimeout( () => {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(sanitizedUrl);
                }, 100);
                this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
            }
        } else {
            this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        }
        this._changeDetectorRef.markForCheck();
    }
}
