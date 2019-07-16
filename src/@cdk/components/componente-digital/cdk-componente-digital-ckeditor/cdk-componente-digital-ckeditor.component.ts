import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {MatDialog} from '@angular/material';
import {CdkCampoPluginComponent} from './cdk-plugins/cdk-campo-plugin/cdk-campo-plugin.component';
import {filter} from 'rxjs/operators';

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

    editor: any;

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

        allowedContent: 'p(esquerda,centralizado,direita,numerado); p strong; p em; p u; p s; p sub; p sup; ul li; ol li; div[id]{page-break-after}; img[!src];p span{display,color,background-color}[data-service,data-method,data-options]; table[*]{*}; tbody; th[*](*); td[*](*){width}; tr[*](*);col[*](*){*}; hr; blockquote; h1; h2; h3; h4; section[*](*); header[*](*);li[*];a[*];cite(*)[*];sup(*)[*]{*};ol{*}[start]',
        startupShowBorders: false,
        pasteFromWordRemoveStyles: false,
        pasteFromWordRemoveFontStyles: false,

        htmlEncodeOutput: false,
        entities: false,
        basicEntities: false,

        toolbar:
            [
                {name: 'salvar', items: ['saveButton', 'camposButton', 'PrintSemZoom']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll']},
                {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
                {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
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
     * @param dialog
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog) {

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
            this.src = this.b64DecodeUnicode(this.componenteDigital.conteudo.split(';base64,')[1]);
        } else {
            this.src = null;
        }
        this._changeDetectorRef.markForCheck();
    }

    b64DecodeUnicode(str): any {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c): any {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    private getBase64(blob): any {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(blob);
        });
    }

    private strip_tags(input, allowed = null): any {
        const nallowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1): any {
            return nallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    onReady(e): void {

        this.editor = e.editor;

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

    doCampos(): void {
        const dialogRef = this.dialog.open(CdkCampoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            this.editor.insertHtml('<p>' + result.html + '</p>');
        });
    }
}
