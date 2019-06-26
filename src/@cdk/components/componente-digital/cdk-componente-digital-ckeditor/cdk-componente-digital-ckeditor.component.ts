import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';

@Component({
    selector: 'cdk-componente-digital-ckeditor',
    templateUrl: './cdk-componente-digital-ckeditor.component.html',
    styleUrls: ['./cdk-componente-digital-ckeditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkComponenteDigitalCkeditorComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    loading = false;

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    config = {
        extraPlugins: 'printsemzoom,salvar,fastimage,assinar,paragrafo,paragrafonumerado,citacao,titulo,subtitulo,texttransform,zoom,placeholder,campos,repositorios,footnotes,sourcearea,salvarpdf',
        language: 'pt-br',
        disableNativeSpellChecker: false,
        scayt_autoStartup: false,
        contentsCss: 'http://127.0.0.1:4200/assets/ckeditor/contents.css',
        allowedContent: 'p(esquerda,centralizado,direita,numerado), p strong, p em, p u, p s, p sub, p sup, ul li, ol li, div[id]{page-break-after}, img[!src],p span{display,color,background-color,font-size}[data-service,data-method,data-options],table[*]{*}, tbody, th, td[*](*){width}, tr[*](*), hr, blockquote, h1, h2, h3, h4, section[*](*),header[*](*),li[*],a[*],cite(*)[*],sup(*)[*]{*},ol{*}[start]',
        justifyClasses: ['esquerda', 'centralizado', 'direita', ' '],
        removePlugins: 'elementspath, scayt, divarea',
        resize_enabled: false,

        width: '100%',
        height: '100%',

        extraAllowedContent: 'table(*),td{*}(*)[*],col[*](*){*}',
        startupShowBorders: false,
        pasteFromWordRemoveStyles: false,
        pasteFromWordRemoveFontStyles: false,

        toolbar:
            [
                {name: 'salvar', items: ['salvar', '-', 'PrintSemZoom']},
                {name: 'assinar', items: ['assinar']},
                {name: 'salvarpdf', items: ['salvarpdf']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll']},
                '/',
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                {name: 'formatacao', items: ['fastimage']},
                {name: 'styles', items: ['paragrafo', 'paragrafonumerado', 'citacao', 'titulo', 'subtitulo']},
                {name: 'colors', items: ['TextColor', 'BGColor']},
                {name: 'insert', items: ['Table', 'SpecialChar', 'PageBreak', 'HorizontalRule', 'Footnotes']},
                {name: 'texttransform', items: ['TransformTextToUppercase', 'TransformTextToLowercase', 'TransformTextCapitalize']},
                {name: 'zoom', items: ['Zoom', 'Maximize']},
                {name: 'templates', items: ['campos', 'repositorios']},

            ],

        keystrokes:
            [
                [4456448 + 80, 'paragrafo'], // ALT + P
                [2228224 + 4456448 + 80, 'paragrafonumerado'], // SHIFT + ALT + P

                [4456448 + 67, 'citacao'], // ALT + C

                [4456448 + 84, 'titulo'], // ALT + T
                [2228224 + 4456448 + 84, 'subtitulo'] // SHIFT + ALT + T

            ],
    };

    @Output()
    save = new EventEmitter<any>();

    src: any;

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
