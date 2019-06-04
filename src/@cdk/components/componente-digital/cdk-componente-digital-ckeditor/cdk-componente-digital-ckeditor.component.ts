import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
    selector: 'cdk-componente-digital-ckeditor',
    templateUrl: './cdk-componente-digital-ckeditor.component.html',
    styleUrls: ['./cdk-componente-digital-ckeditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkComponenteDigitalCkeditorComponent implements OnInit, OnDestroy, OnChanges {

    public Editor = DocumentEditor;

    @Input()
    loading = false;

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    config = {
        language: 'pt-br'
    };

    @Output()
    save = new EventEmitter<any>();

    src: any;

    public onReady(editor): void {

        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    public onChange({editor}: ChangeEvent): void {
        this.src = editor.getData();
    }

    /**
     *
     * @param _changeDetectorRef
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.fetch();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    fetch(): void {
        if (this.componenteDigital && this.componenteDigital.conteudo) {
            fetch(this.componenteDigital.conteudo)
                .then(res => res.blob())
                .then(content => {
                    const blob = new Blob([content], {type: this.componenteDigital.mimetype});
                    this.getInnerTextContent(blob).then(conteudo => {
                        this.src = conteudo;
                        this._changeDetectorRef.markForCheck();
                    });
                });
        } else {
            this.src = null;
        }
    }

    private getInnerTextContent(blob): any {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = (e): void => {
                const target = <FileReader>e.target;
                const el = document.createElement('html');
                el.innerHTML = <string>target.result;
                const body = el.getElementsByTagName('body');
                resolve(body[0].innerText);
            };
            reader.onerror = error => reject(error);
            reader.readAsBinaryString(blob);
        });
    }

    private getBase64(blob): any {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(blob);
        });
    }

    doSave(): void {
        this.getBase64(new Blob([this.src], {type: 'text/html'})).then(
            conteudo => {
                this.save.emit(conteudo);
            }
        );
    }
}
