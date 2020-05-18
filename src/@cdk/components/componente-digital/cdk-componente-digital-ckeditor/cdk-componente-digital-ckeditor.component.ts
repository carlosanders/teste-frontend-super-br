import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ElementRef, EventEmitter, Input, OnChanges,
    OnDestroy,
    OnInit, Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@cdk/angular/material';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital} from '@cdk/models';
import {MatDialog} from '@cdk/angular/material';
import {CdkCampoPluginComponent} from './cdk-plugins/cdk-campo-plugin/cdk-campo-plugin.component';
import {filter} from 'rxjs/operators';
import {CdkRepositorioPluginComponent} from './cdk-plugins/cdk-respositorio-plugin/cdk-repositorio-plugin.component';
import {CdkVersaoPluginComponent} from './cdk-plugins/cdk-versao-plugin/cdk-versao-plugin.component';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-componente-digital-ckeditor',
    templateUrl: './cdk-componente-digital-ckeditor.component.html',
    styleUrls: ['./cdk-componente-digital-ckeditor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkComponenteDigitalCkeditorComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    loading = false;

    @Input()
    componenteDigital: ComponenteDigital;

    @Input()
    repositorio: string;

    @Input()
    pluginAssinar = true;

    @Output()
    clearRepositorio = new EventEmitter<any>();

    @Output()
    query = new EventEmitter<any>();

    @Input()
    showModeloButtons = false;

    editor: any;

    hashAntigo: string;

    @Input()
    errors: any;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    @Input()
    btVersoes = false;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    reverter = new EventEmitter<any>();

    @Output()
    visualizar = new EventEmitter<any>();

    @Output()
    comparar = new EventEmitter<any>();

    @Input()
    config = {
        extraPlugins: 'printsemzoom,fastimage,paragrafo,paragrafonumerado,citacao,titulo,subtitulo,texttransform,zoom,footnotes,' +
            'pastebase64,sourcearea,imageresizerowandcolumn',
        language: 'pt-br',
        disableNativeSpellChecker: false,
        scayt_autoStartup: false,
        contentsCss: '/assets/ckeditor/contents.css',
        justifyClasses: ['esquerda', 'centralizado', 'direita', ' '],
        resize_enabled: false,

        width: '100%',
        height: '100%',

        allowedContent: 'p(esquerda,centralizado,direita,numerado); p strong; p em; p u; p s; p sub; p sup; ul li; ol li; div[id]{page-break-after}; ' +
            'img[!src];p span{display,color,background-color}[data-service,data-method,data-options]; table[*]{*}; tbody; th[*](*); td[*](*){width}; ' +
            'tr[*](*);col[*](*){*}; hr; blockquote; h1; h2; h3; h4; section[*](*); header[*](*);li[*];a[*];cite(*)[*];sup(*)[*]{*};ol{*}[start]',
        startupShowBorders: false,
        pasteFromWordRemoveStyles: false,
        pasteFromWordRemoveFontStyles: false,

        htmlEncodeOutput: false,
        entities: false,
        basicEntities: false,

        toolbar:
            [
                {name: 'salvar', items: ['saveButton', 'assinarButton', 'pdfButton', 'versaoButton', 'PrintSemZoom']},
                {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo']},
                {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll']},
                {
                    name: 'basicstyles',
                    items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
                },
                {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                {name: 'styles', items: ['paragrafo', 'paragrafonumerado', 'citacao', 'titulo', 'subtitulo']},
                {name: 'colors', items: ['TextColor', 'BGColor']},
                {name: 'insert', items: ['Table', 'SpecialChar', 'PageBreak', 'HorizontalRule', 'Footnotes']},
                {
                    name: 'texttransform',
                    items: ['TransformTextToUppercase', 'TransformTextToLowercase', 'TransformTextCapitalize']
                },
                {name: 'zoom', items: ['Zoom', 'Maximize']},
                {name: 'modelo', items: ['campoButton', 'repositorioButton']}

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

    @Output()
    assinar = new EventEmitter<any>();

    @Output()
    pdf = new EventEmitter<any>();

    assinando = false;

    gerandoPdf = false;

    revertendo = false;

    src: any;

    /**
     * @param _changeDetectorRef
     * @param dialog
     * @param el
     * @param snackBar
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                public dialog: MatDialog,
                private el: ElementRef,
                private snackBar: MatSnackBar) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['repositorio']) {
            if (this.editor) {
                if (this.repositorio) {
                    const parent = this.editor.document.getBody();
                    parent.setStyle('cursor', 'progress');
                } else {
                    const parent = this.editor.document.getBody();
                    parent.setStyle('cursor', 'text');
                }
            }
        }

        if (changes['errors'] && this.errors && this.errors.status && this.errors.status === 422) {
            const error = this.errors.error.message || this.errors.statusText;
            this.snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        }

        if (changes['componenteDigital']) {
            if (changes['componenteDigital'].firstChange) {
                this.fetch();
            }

            if (this.revertendo) {
                this.fetch();
                this.revertendo = false;
                this.dialog.closeAll();
            }

            if (this.componenteDigital && this.componenteDigital.conteudo) {
                this.hashAntigo = this.componenteDigital.hash;
            } else {
                this.hashAntigo = null;
            }

            if (this.assinando) {
                this.assinar.emit();
                this.assinando = false;
            }

            if (this.gerandoPdf) {
                this.pdf.emit();
                this.gerandoPdf = false;
            }
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        window.addEventListener('resize', this.resizeFunction);
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
        return decodeURIComponent(atob(str).split('').map((c) => {
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
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

        return input.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) => {
            return nallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    private resizeFunction(): void {
        if (this.editor && this.el.nativeElement) {
            this.editor.resize(this.editor.container.getStyle('width'), (this.el.nativeElement.offsetHeight * 0.95), true);
        }
    }

    onReady(e): void {

        this.editor = e.editor;
        const me = this;

        if (!this.showModeloButtons) {
            const campoButton = document.getElementsByClassName('cke_button__campobutton')[0].parentNode as HTMLElement;
            const repositorioButton = document.getElementsByClassName('cke_button__repositoriobutton')[0].parentNode as HTMLElement;
            campoButton.style.visibility = 'hidden';
            repositorioButton.style.visibility = 'hidden';
        }

        if (!this.btVersoes) {
            const campoVersoes = document.getElementsByClassName('cke_button__versaoButton')[0].parentNode as HTMLElement;
            campoVersoes.style.visibility = 'hidden';
        }

        this.resizeFunction();

        window.addEventListener('resize', this.resizeFunction);

        e.editor.on('contentDom', () => {

            const editable = e.editor.editable();
            editable.attachListener(editable, 'click', () => {
                if (me.repositorio) {
                    e.editor.insertHtml(me.repositorio);
                    me.clearRepositorio.emit();
                }
            });

            e.editor.document.on('keyup', (event: any) => {
                if (event.data.getKey() === 13) {
                    let node = e.editor.getSelection().getStartElement();
                    const ready = false;

                    do {
                        if (node.getName() === 'p' || node.getName() === 'h1' || node.getName() === 'h2') {

                            let words = null;
                            let query = null;

                            // inteligencia
                            if (me.strip_tags(node.getPrevious().getHtml())) {
                                query = node.getPrevious().getText();
                                words = query.match(/\b\w+\b/g).length;
                                if (words && words >= 3) {
                                    me.query.emit(me.strip_tags(query));
                                }
                            }

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

                        node = node.getParent();

                    } while (!ready);
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

        setInterval(() => {
            me.doSave();
        }, 5 * 60 * 1000);
    }

    doSave(): void {
        if (this.hashAntigo) {
            this.getBase64(new Blob([this.src], {type: 'text/html'})).then(
                conteudo => {
                    this.save.emit({conteudo: conteudo, hashAntigo: this.hashAntigo});
                }
            );
        }
    }

    doAssinar(): void {
        this.assinando = true;
        this.doSave();
    }

    doPdf(): void {
        this.gerandoPdf = true;
        this.doSave();
    }

    doCampo(): void {
        const dialogRef = this.dialog.open(CdkCampoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            this.editor.insertHtml(result.html);
        });
    }

    doVersao(): void {
        const dialogRef = this.dialog.open(CdkVersaoPluginComponent, {
            width: '600px',
            data: {
                logEntryPagination: this.logEntryPagination
            }
        });

        dialogRef.componentInstance.reverter.subscribe((value) => {
            this.revertendo = true;
            this.reverter.emit(value);
        });

        dialogRef.componentInstance.visualizar.subscribe((value) => {
            this.visualizar.emit(value);
        });

        dialogRef.componentInstance.comparar.subscribe((value) => {
            this.comparar.emit(value);
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            this.editor.insertHtml(result.html);
        });
    }

    doRepositorio(): void {
        const dialogRef = this.dialog.open(CdkRepositorioPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe(result => {
            const html = '<span data-method="repositorio" data-options="' + result.id + '" data-service="App\Fields\Field\RepositorioField">*' + result.nome + '*</span>';
            this.editor.insertHtml(html);
        });
    }
}
