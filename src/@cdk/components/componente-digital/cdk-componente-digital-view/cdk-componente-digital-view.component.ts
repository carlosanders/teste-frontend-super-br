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
            fetch(this.componenteDigital.conteudo)
                .then(res => res.blob())
                .then(content => {
                    const blob = new Blob([content], {type: this.componenteDigital.mimetype}),
                        URL = window.URL,
                        downloadUrl = URL.createObjectURL(blob);
                    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(downloadUrl);
                    this._changeDetectorRef.markForCheck();
                });
        } else {
            this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
        }
    }
}
