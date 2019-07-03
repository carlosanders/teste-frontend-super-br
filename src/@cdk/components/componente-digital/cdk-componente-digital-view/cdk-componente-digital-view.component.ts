import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation, Input, OnChanges
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'cdk-componente-digital-view',
    templateUrl: './cdk-componente-digital-view.component.html',
    styleUrls: ['./cdk-componente-digital-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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
            const blob = new Blob([byteArray], {type: this.componenteDigital.mimetype}),
                URL = window.URL;
            this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
        } else {
            this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        }
        this._changeDetectorRef.markForCheck();
    }
}
