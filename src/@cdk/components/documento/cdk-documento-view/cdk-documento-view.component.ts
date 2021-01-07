import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-documento-view',
    templateUrl: './cdk-documento-view.component.html',
    styleUrls: ['./cdk-documento-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoViewComponent implements OnInit {

    loading: boolean;

    @Input()
    binary$: Observable<any>;

    src: any;

    routerState: any;

    constructor(
        private _location: Location,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.binary$.subscribe(
            binary => {
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

    back(): void {
        this._location.back();
    }

}
