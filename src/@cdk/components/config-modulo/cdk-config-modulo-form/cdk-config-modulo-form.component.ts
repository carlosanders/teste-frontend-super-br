import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges, OnInit,
    Output,
    SimpleChange, ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {cdkAnimations} from '@cdk/animations';
import {ConfigModulo, Modulo} from '../../../models';
import {
    MonacoEditorComponent,
    MonacoEditorConstructionOptions,
    MonacoEditorLoaderService, MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import {filter, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';
import draft07Schema from '../../../../assets/draft-07.schema';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-config-modulo-form',
    templateUrl: './cdk-config-modulo-form.component.html',
    styleUrls: ['./cdk-config-modulo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                display: {
                    dateInput: 'L LT',
                    datetimeInput: 'L LT'
                }
            }
        }
    ]
})
export class CdkConfigModuloFormComponent implements OnChanges, OnInit{
    @ViewChild(MonacoEditorComponent, { static: false })
    monacoComponent: MonacoEditorComponent;

    @Input()
    configModule: ConfigModulo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    form: FormGroup;

    @Input()
    isCreate: boolean;

    @Input()
    mode = '';

    @Input()
    roles = [];

    @Input()
    moduloPagination: Pagination;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    aborting = new EventEmitter<any>();

    activeCard = 'form';

    dataTypes = ['bool', 'string', 'datetime', 'float', 'int', 'json'];

    editorOptions: MonacoEditorConstructionOptions = {
        theme: 'iPlastic',
        // language: 'json',
        roundedSelection: true,
        automaticLayout: true,
        autoIndent: 'full',
        scrollbar: {
            // Subtle shadows to the left & top. Defaults to true.
            useShadows: false,

            // Render vertical arrows. Defaults to false.
            verticalHasArrows: true,
            // Render horizontal arrows. Defaults to false.
            horizontalHasArrows: true,

            // Render vertical scrollbar.
            // Accepted values: 'auto', 'visible', 'hidden'.
            // Defaults to 'auto'
            vertical: 'visible',
            // Render horizontal scrollbar.
            // Accepted values: 'auto', 'visible', 'hidden'.
            // Defaults to 'auto'
            horizontal: 'visible',

            verticalScrollbarSize: 17,
            horizontalScrollbarSize: 17,
            arrowSize: 30
        }
    };

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    inheritable = false;
    configModulePagination: Pagination;
    dataSchemaEdit: string = "{}";

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private monacoLoaderService: MonacoEditorLoaderService,
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
        this.configModulePagination = new Pagination();
        this.configModulePagination.filter = {
            paradigma: 'isNull',
            dataType: 'eq:json',
            dataSchema: 'isNotNull',
        };
    }

    ngOnInit(): void {
        // if (!this.configModule.id) {
        //     this.form.get('modulo').valueChanges.pipe(
        //         filter(value => !!value),
        //     ).subscribe(modulo => {
        //         this.configModulePagination.filter = {
        //             ...this.configModulePagination.filter,
        //             'modulo.id': `eq:${modulo.id}`
        //         };
        //     });
        // } else {
        //     this.configModulePagination.filter = {
        //         ...this.configModulePagination.filter,
        //         'modulo.id': `eq:${this.configModule.modulo.id}`
        //     };
        // }

        if (this.mode === 'edit') {
            this.form.get('nome').disable();
            this.form.get('descricao').disable();
            this.form.get('sigla').disable();
            this.form.get('modulo').disable();
            this.dataSchemaEdit = this.configModule.paradigma ? this.configModule.paradigma.dataSchema : this.configModule.dataSchema;
        } else {
            this.form.get('nome').enable();
            this.form.get('descricao').enable();
            this.form.get('sigla').enable();
            this.form.get('modulo').enable();
            this.inheritable = !!this.configModule.paradigma;
            this.form.get('paradigma').setValue(this.configModule.paradigma);
            this.dataSchemaEdit = draft07Schema;
        }

        this.monacoLoaderService.isMonacoLoaded$
            .pipe(
                filter(isLoaded => !!isLoaded),
                take(1)
            )
            .subscribe(() => {
                this.registerMonacoJsonSchemaValidator();
                this.registerMonacoCustomTheme();
            });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['configModule'] && this.configModule &&
            (
                (!this.configModule.id && !this.form.dirty) ||
                (this.configModule.id !== this.form.get('id').value)
            )
        ) {
           this.form.patchValue({...this.configModule});
        }

        if (this.errors?.status === 422) {
            this.snackBar.open(this.errors.error.message || 'Erro desconhecido', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar'],
                duration: 30000
            });
            this.errors = {};
        }

        if (this.errors && this.errors.status) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    mergeOptions(partialOptions): any {
        return {
            ...this.editorOptions,
            ...partialOptions
        };
    }

    editorInit(editor: MonacoStandaloneCodeEditor): void {
        setTimeout(() => {
            editor.getAction('editor.action.formatDocument').run().then();
        }, 500);
    }

    editorReadOnlyInit(editor: MonacoStandaloneCodeEditor): void {
        setTimeout(() => {
            editor.getAction('editor.action.formatDocument').run().then();
        }, 500);
        setTimeout(() => {
            editor.updateOptions({readOnly: true});
        }, 1000);
    }

    registerMonacoCustomTheme(): void {
        monaco.editor.defineTheme('iPlastic', {
            'base': 'vs',
            'inherit': true,
            'rules': [
                {
                    'background': 'EEEEEEEB',
                    'token': ''
                },
                {
                    'foreground': '009933',
                    'token': 'string'
                },
                {
                    'foreground': '0066ff',
                    'token': 'constant.numeric'
                },
                {
                    'foreground': 'ff0080',
                    'token': 'string.regexp'
                },
                {
                    'foreground': '0000ff',
                    'token': 'keyword'
                },
                {
                    'foreground': '9700cc',
                    'token': 'constant.language'
                },
                {
                    'foreground': '990000',
                    'token': 'support.class.exception'
                },
                {
                    'foreground': 'ff8000',
                    'token': 'entity.name.function'
                },
                {
                    'fontStyle': 'bold underline',
                    'token': 'entity.name.type'
                },
                {
                    'fontStyle': 'italic',
                    'token': 'variable.parameter'
                },
                {
                    'foreground': '0066ff',
                    'fontStyle': 'italic',
                    'token': 'comment'
                },
                {
                    'foreground': 'ff0000',
                    'background': 'e71a114d',
                    'token': 'invalid'
                },
                {
                    'background': 'e71a1100',
                    'token': 'invalid.deprecated.trailing-whitespace'
                },
                {
                    'foreground': '000000',
                    'background': 'fafafafc',
                    'token': 'text source'
                },
                {
                    'foreground': '0033cc',
                    'token': 'meta.tag'
                },
                {
                    'foreground': '0033cc',
                    'token': 'declaration.tag'
                },
                {
                    'foreground': '6782d3',
                    'token': 'constant'
                },
                {
                    'foreground': '6782d3',
                    'token': 'support.constant'
                },
                {
                    'foreground': '3333ff',
                    'fontStyle': 'bold',
                    'token': 'support'
                },
                {
                    'fontStyle': 'bold',
                    'token': 'storage'
                },
                {
                    'fontStyle': 'bold underline',
                    'token': 'entity.name.section'
                },
                {
                    'foreground': '000000',
                    'fontStyle': 'bold',
                    'token': 'entity.name.function.frame'
                },
                {
                    'foreground': '333333',
                    'token': 'meta.tag.preprocessor.xml'
                },
                {
                    'foreground': '3366cc',
                    'fontStyle': 'italic',
                    'token': 'entity.other.attribute-name'
                },
                {
                    'fontStyle': 'bold',
                    'token': 'entity.name.tag'
                }
            ],
            'colors': {
                'editor.foreground': '#000000',
                'editor.background': '#EEEEEEEB',
                'editor.selectionBackground': '#BAD6FD',
                'editor.lineHighlightBackground': '#0000001A',
                'editorCursor.foreground': '#000000',
                'editorWhitespace.foreground': '#B3B3B3F4'
            }
        });
    }

    registerMonacoJsonSchemaValidator(): void {
        const baseURI = environment.api_url;
        const schemaURI = `${baseURI}administrativo/config_module/schema/`;
        const name = this.mode === 'edit' ? this.configModule.nome : 'novo.schema.json';
        const schemaPath = `${schemaURI}${name}`;

        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    uri: schemaPath,
                    fileMatch: ['*'],
                    schema: JSON.parse(this.dataSchemaEdit)
                }
            ]
        });
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.aborting.emit();
    }

    submit(): void {
        if (this.form.valid && this.form['controls']?.dataSchema?.valid) {
            if (this.form.get('dataValue').value && this.form.get('dataType').value === 'datetime') {
                this.form.get('dataValue').setValue(this.form.get('dataValue').value.format('YYYY-MM-DDTHH:mm:ss'));
            }
            this.save.emit(this.form.getRawValue());
        }
    }

    isInheritable(matSlideToggle: MatSlideToggleChange) {
        this.inheritable = matSlideToggle.checked;
        if (this.inheritable) {
            this.form.get('dataSchema').setValue(null);
        }
    }

    checkParadigma(): void {
        const value = this.form.get('paradigma').value;
        if (!value || typeof value !== 'object') {
            this.form.get('paradigma').setValue(null);
        }
    }

    selectParadigma(paradigma: ConfigModulo): void {
        if (paradigma) {
            this.form.get('paradigma').setValue(paradigma);
        }
        this.activeCard = 'form';
    }

    showParadigmaGrid(): void {
        this.activeCard = 'config-modulo-gridsearch';
    }

    checkModulo(): void {
        const value = this.form.get('modulo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modulo').setValue(null);
        }
    }

    selectModulo(modulo: Modulo): void {
        if (modulo) {
            this.form.get('modulo').setValue(modulo);
        }
        this.activeCard = 'form';
    }

    showModuloGrid(): void {
        this.activeCard = 'modulo-gridsearch';
    }
}
