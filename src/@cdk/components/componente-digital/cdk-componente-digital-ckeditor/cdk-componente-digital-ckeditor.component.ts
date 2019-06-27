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
        extraPlugins: 'printsemzoom,fastimage,paragrafo,paragrafonumerado,citacao,titulo,subtitulo,texttransform,zoom,footnotes,pastebase64,sourcearea,imageresizerowandcolumn',
        language: 'pt-br',
        disableNativeSpellChecker: false,
        scayt_autoStartup: false,
        contentsCss: '/assets/ckeditor/contents.css',
        justifyClasses: ['esquerda', 'centralizado', 'direita', ' '],
        resize_enabled: false,

        width: '100%',
        height: '100%',

        extraAllowedContent: 'p(esquerda,centralizado,direita,numerado), p strong, p em, p u, p s, p sub, p sup, ul li, ol li, div[id]{page-break-after}, img[!src],p span{display,color,background-color,font-size}[data-service,data-method,data-options],table[*]{*}, tbody, th, td[*](*){width}, tr[*](*), hr, blockquote, h1, h2, h3, h4, section[*](*),header[*](*),li[*],a[*],cite(*)[*],sup(*)[*]{*},ol{*}[start] table(*),td{*}(*)[*],col[*](*){*}',
        startupShowBorders: false,
        pasteFromWordRemoveStyles: false,
        pasteFromWordRemoveFontStyles: false,

        toolbar:
            [
                {name: 'salvar', items: ['saveButton', 'PrintSemZoom']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll']},
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
                {
                    name: 'paragraph', items: ['NumberedList', 'BulletedList',
                        '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                {name: 'styles', items: ['paragrafo', 'paragrafonumerado', 'citacao', 'titulo', 'subtitulo']},
                {name: 'colors', items: ['TextColor', 'BGColor']},
                {name: 'insert', items: ['Table', 'SpecialChar', 'PageBreak', 'HorizontalRule', 'Footnotes']},
                {name: 'texttransform', items: ['TransformTextToUppercase', 'TransformTextToLowercase', 'TransformTextCapitalize']},
                {name: 'zoom', items: ['Zoom', 'Maximize']},

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

    strip_tags(input, allowed = null): any {
        const nallowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1): any {
            return nallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    onReady(e): void {

        const me = this;

        e.editor.on('contentDom', function (dom): any {

            e.editor.document.on('keyup', function (event) {
                if (event.data.getKey() === 13) {
                    let node = e.editor.getSelection().getStartElement();

                    do {
                        if (node.getName() === 'p' || node.getName() === 'h1' || node.getName() === 'h2') {
                            const words = '',
                                query = '';

                            // renumeracao
                            if (!me.strip_tags(node.getPrevious().getHtml()) &&
                                node.getPrevious().getAttribute('class') &&
                                (node.getPrevious().getAttribute('class').indexOf('numerado') >= 0)) {
                                node.getPrevious().setAttribute(
                                    'class',
                                    node.getPrevious().getAttribute('class').replace('numerado', '')
                                );
                            }

                            break;
                        }

                        if (node.getName() === 'body') {
                            break;
                        }

                    } while (node = node.getParent());
                }
            });

        });

        e.editor.dataProcessor.writer.setRules('p', {
            indent: false,
            breakBeforeOpen: false,
            breakAfterOpen: false,
            breakBeforeClose: false,
            breakAfterClose: false
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
