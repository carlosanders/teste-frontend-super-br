import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {
    MatDialog,
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@cdk/angular/material';

import {cdkAnimations} from '@cdk/animations';
import {ComponenteDigital, Pagination} from '@cdk/models';
import {CdkCampoPluginComponent} from './cdk-plugins/cdk-campo-plugin/cdk-campo-plugin.component';
import {filter, take, takeUntil} from 'rxjs/operators';
import {CdkRepositorioPluginComponent} from './cdk-plugins/cdk-respositorio-plugin/cdk-repositorio-plugin.component';
import {CdkAssinaturaEletronicaPluginComponent} from './cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {ComponenteDigitalService} from '../../../services/componente-digital.service';
import {Subject} from 'rxjs';
import * as moment from 'moment';
import {LoginService} from 'app/main/auth/login/login.service';
import {environment} from 'environments/environment';

declare var CKEDITOR: any;

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
    mode = 'documento';

    @Input()
    errors: any;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    reverter = new EventEmitter<any>();

    @Output()
    visualizar = new EventEmitter<any>();

    @Output()
    comparar = new EventEmitter<any>();

    @Output()
    backupComponenteDigital: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    config = {
        extraPlugins: 'printsemzoom,fastimage,paragrafo,paragrafonumerado,placeholder,citacao,titulo,subtitulo,texttransform,zoom,footnotes,' +
            'sourcearea',
        language: 'pt-br',
        disableNativeSpellChecker: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        scayt_autoStartup: false,
        contentsCss: `${environment.base_url}contentCss`,
        justifyClasses: ['esquerda', 'centralizado', 'direita', ' '],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        resize_enabled: false,
        removePlugins: 'elementspath',

        width: '100%',
        height: '100%',

        allowedContent: 'p(esquerda,centralizado,direita,numerado); p strong; p em; p u; p s; p sub; p sup; ul li; ol li; div[id]{page-break-after}; ' +
            'img[!src];p span{display,color,background-color}[data-service,data-method,data-options]; table[*]{*}; tbody; th[*](*); td[*](*){width}; ' +
            'tr[*](*);col[*](*){*}; hr; blockquote; h1; h2; h3; h4; section[*](*); header[*](*);li[*];a[*];cite(*)[*];sup(*)[*]{*};ol{*}[start]',
        startupShowBorders: false,
        pasteFromWordRemoveStyles: false,
        pasteFromWordRemoveFontStyles: false,

        extraAllowedContent: 'table(*);td{*}(*)[*];col[*](*){*}',

        toolbar:
            [
                {name: 'salvar', items: ['saveButton']},
                {name: 'assinar', items: ['assinarButton']},
                {name: 'ferramentas', items: ['pdfButton', 'PrintSemZoom']},
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
                {name: 'formatacao', items: ['fastimage']},
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
    assinarDigitalmente = new EventEmitter<any>();

    @Output()
    assinarEletronicamente = new EventEmitter<any>();

    @Output()
    pdf = new EventEmitter<any>();

    editor: any;

    hashAntigo: string;

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    salvando: any = false;

    assinando: any = false;

    gerandoPdf = false;

    revertendo = false;

    alterandoModelo = false;

    trocandoDocumento = false;

    src: any;

    dragstart_inside = false;

    autoSave: any;
    id: string;

    private _unsubscribeAll: Subject<any> = new Subject();
    private _firstChange: boolean = true;
    private _lastContent: string;

    /**
     *
     * @param _changeDetectorRef
     * @param dialog
     * @param el
     * @param _componenteDigitalService
     * @param snackBar
     * @param _loginService
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef,
                public dialog: MatDialog,
                private el: ElementRef,
                private _componenteDigitalService: ComponenteDigitalService,
                private snackBar: MatSnackBar,
                private _loginService: LoginService) {

        this._componenteDigitalService.doEditorSave.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (value) => {
                this.salvando = value;
                this.doSave();
            }
        );

        this._componenteDigitalService.revertendo.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (value) => {
                this.revertendo = value;
            }
        );

        this._componenteDigitalService.alterandoModelo.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (value) => {
                this.alterandoModelo = value;
            }
        );

        this._componenteDigitalService.trocandoDocumento.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (value) => {
                this.trocandoDocumento = value;
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.config['contentsCss'] = `${environment.base_url}contentCss/` + this.componenteDigital.id;
        if (this.mode === 'modelo' || this.mode === 'repositorio' || this.mode === 'template') {
            this.config['contentsCss'] = `${environment.base_url}contentCss/` + this.componenteDigital.id + '?mode=campos';
        }
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (this.mode === 'documento') {
            this.config['contentsCss'] = `${environment.base_url}contentCss/`  + this.componenteDigital.id;
        } else {
            this.config['contentsCss'] = `${environment.base_url}contentCss/` + this.componenteDigital.id + '?mode=campos';
        }

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

        if (changes['errors'] && this.errors) {
            const error = 'Erro! ' + (this.errors.error.message || this.errors.statusText);
            this.snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
        }

        if (changes['componenteDigital']) {
            if (changes['componenteDigital'].firstChange) {
                this._firstChange = true;
                this.fetch();
            } else {
                this._firstChange = false;
            }

            this.editor?.getCommand('saveCmd').enable();
            this.editor?.getCommand('assinarCmd').enable();
            this.editor?.getCommand('pdfCmd').enable();

            if (this.salvando) {
                this._componenteDigitalService.completedEditorSave.next(this.salvando);
                this._componenteDigitalService.saving.next(false);
                this.salvando = false;
            }

            if (this.revertendo) {
                this.fetch();
                this._componenteDigitalService.revertendo.next(false);
                this.dialog.closeAll();
            }

            if (this.alterandoModelo) {
                this.fetch();
                this._componenteDigitalService.alterandoModelo.next(false);
            }

            if (this.trocandoDocumento && this.componenteDigital && this.componenteDigital.conteudo && this.componenteDigital.editavel && !this.componenteDigital.assinado) {
                if (!this._firstChange) {
                    this.fetch();
                }
                this._componenteDigitalService.trocandoDocumento.next(false);
            }

            if (this.componenteDigital && this.componenteDigital.conteudo) {
                this.hashAntigo = this.componenteDigital.hash;
            } else {
                this.hashAntigo = null;
            }

            if (this.assinando) {
                if (this.assinando.certificadoDigital) {
                    this.assinarDigitalmente.emit();
                } else {
                    this.assinarEletronicamente.emit(this.assinando.plainPassword);
                }
                this.assinando = false;
            }

            if (this.gerandoPdf) {
                this.pdf.emit();
                this.gerandoPdf = false;
            }

            this._changeDetectorRef.detectChanges();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        window.addEventListener('resize', this.resizeFunction);
        if (this.autoSave) {
            clearInterval(this.autoSave);
        }
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    fetch(): void {
        if (this.componenteDigital && this.componenteDigital.conteudo) {
            this.src = this.b64DecodeUnicode(this.componenteDigital.conteudo.split(';base64,')[1]);
            const editor = window['CKEDITOR'];
            if (editor && editor.instances) {
                for (const editorInstance in editor.instances) {
                    if (editor.instances.hasOwnProperty(editorInstance) && editor.instances[editorInstance]) {
                        if (editor.instances[editorInstance].checkDirty()) {
                            editor.instances[editorInstance].resetDirty();
                        }
                    }
                }
            }
            if (this.autoSave) {
                clearInterval(this.autoSave);
            }
            const me = this;
            this.autoSave = setInterval(() => {
                me.doSave(true);
            }, 180 * 1000);
        } else {
            this._lastContent = null;
            this.src = null;
            if (this.autoSave) {
                clearInterval(this.autoSave);
            }
        }
        this._changeDetectorRef.detectChanges();
    }

    b64DecodeUnicode(str): any {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
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

        return input.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) => nallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '');
    }

    private resizeFunction(): void {
        if (this.editor && this.el.nativeElement) {
            this.editor.resize(this.editor.container.getStyle('width'), (this.el.nativeElement.offsetHeight * 0.95), true);
        }
    }

    onReady(e): void {

        this.editor = e.editor;
        const me = this;

        this.editor?.getCommand('saveCmd').enable();
        this.editor?.getCommand('assinarCmd').enable();
        this.editor?.getCommand('pdfCmd').enable();

        this.editor.getCommand('campoCmd').enable();
        this.editor.getCommand('repositorioCmd').enable();
        this.editor.getCommand('assinarCmd').enable();

        if (this.mode === 'documento') {
            this.editor.getCommand('campoCmd').disable();
            this.editor.getCommand('repositorioCmd').disable();
        }

        if (this.mode === 'modelo' || this.mode === 'template' || this.mode === 'repositorio') {
            this.editor.getCommand('assinarCmd').disable();
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
                                words = query.match(/\b\w+\b/g)?.length;
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

            e.editor.document.on('dragstart', function () {
                me.dragstart_inside = true;
            });

            e.editor.document.on('drop', function (ev) {
                if (!me.dragstart_inside) {
                    alert('Erro! Somente é possível arrastar e soltar dentro do editor!');
                    ev.data.$.preventDefault();
                }
                me.dragstart_inside = false;
            });

        });

        e.editor.dataProcessor.writer.setRules('p', {
            indent: false,
            breakBeforeOpen: false,
            breakAfterOpen: false,
            breakBeforeClose: false,
            breakAfterClose: false
        });

        e.editor.on("paste", function (ev) {
            const filter = new CKEDITOR.filter( 'p(esquerda,centralizado,direita,numerado); p strong; p em; p u; p s; p sub; p sup; ul li; ol li; div[id]{page-break-after}; img[!src];p span{display,color,background-color}[data-service,data-method,data-options];table[*]{*}; tbody; th; td[*](*){width}; tr[*](*); hr; blockquote; h1; h2; h3; h4; section[*](*);header[*](*);li[*];a[*];cite(*)[*];sup(*)[*]{*};ol{*}[start]' ),
                fragment = CKEDITOR.htmlParser.fragment.fromHtml(ev.data.dataValue),
                writer = new CKEDITOR.htmlParser.basicWriter();
            fragment.forEach((node): void => {
                if ((node.name === 'table') && (parseInt(node.attributes.width) > 793)) {
                    alert('Erro! Não foi possível colar! A tabela excede o tamanho máximo permitido!');
                    node.remove();
                }
            });
            filter.applyTo(fragment);
            fragment.writeHtml(writer);
            ev.data.dataValue = writer.getHtml()?.replaceAll('<span style="color:transparent">', '<span>');
        });
        if (this.autoSave) {
            clearInterval(this.autoSave);
        }
        this.autoSave = setInterval(() => {
            me.doSave(true);
        }, 180 * 1000);
    }

    doSave(auto: boolean = false): void {
        if (!this.salvando) {
            this.salvando = true;
        }
        this._componenteDigitalService.saving.next(true);
        this.doBackupLocalstorage();
        this.editor.getCommand('saveCmd').disable();
        this.editor.getCommand('assinarCmd').disable();
        this.editor.getCommand('pdfCmd').disable();
        if (this.hashAntigo) {
            try {
                if (!this.src) {
                    // eslint-disable-next-line max-len
                    alert('Um documento em branco não pode ser salvo. Se houver texto, temos uma inconsistência grave, favor favor salvar o trabalho manualmente em outro local e recarregar o editor!');
                }
                this.getBase64(new Blob([this.src], {type: 'text/html'})).then(
                    (conteudo) => {
                        if (!conteudo) {
                            console.log('editor sem conteudo!');
                            alert('Inconsistência grave detectada, favor salvar o trabalho manualmente em outro local e recarregar o editor!');
                        }
                        this.save.emit({conteudo: conteudo, hashAntigo: this.hashAntigo, auto: auto});
                        this.editor.resetDirty();
                    }
                );
            } catch (err) {
                console.log(err);
                alert('Inconsistência grave detectada, favor salvar o trabalho manualmente em outro local e recarregar o editor!');
            }
        } else {
            console.log('sem hash antigo!');
            alert('Inconsistência grave detectada, favor salvar o trabalho manualmente em outro local e recarregar o editor!');
        }
    }

    doBackupLocalstorage(): void {
        if (this.src) {
            this.getBase64(new Blob([this.src], {type: 'text/html'})).then(
                (conteudo) => {
                    if (this.src !== this._lastContent) {
                        this.backupComponenteDigital.emit({
                            id: this.componenteDigital.id,
                            fileName: this.componenteDigital.fileName,
                            mimetype: this.componenteDigital.mimetype,
                            hash: this.componenteDigital.hash,
                            atualizadoEm: +moment(this.componenteDigital.atualizadoEm).add(1, 's'),
                            usuario: this._loginService.getUserProfile()?.nome,
                            conteudo: conteudo
                        });
                    }
                    this._lastContent = this.src;
                }
            );
        }
    }

    onChangeContent(content: any): void {
        if (this._firstChange) {
            this._lastContent = content;
            this._firstChange = false;
        }
    }

    doAssinar(): void {
        const dialogRef = this.dialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });

        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            this.assinando = result;
            this.doSave();
            assinaSub.unsubscribe();
        });
    }

    doPdf(): void {
        this.gerandoPdf = true;
        this.doSave();
    }

    doCampo(): void {
        const dialogRef = this.dialog.open(CdkCampoPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result), takeUntil(this._unsubscribeAll)).subscribe((result) => {
            this.editor.insertHtml(result.html);
        });
    }

    doRepositorio(): void {
        const dialogRef = this.dialog.open(CdkRepositorioPluginComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().pipe(filter(result => !!result), takeUntil(this._unsubscribeAll)).subscribe((result) => {
            const html = '<span data-method="repositorio" data-options="' + result.id + '" data-service="App\Fields\Field\RepositorioField">*' + result.nome + '*</span>';
            this.editor.insertHtml(html);
        });
    }
}
