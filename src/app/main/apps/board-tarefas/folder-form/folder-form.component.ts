import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {select, Store} from "@ngrx/store";
import * as fromStore from "../store";
import {Subject} from "rxjs";
import {distinctUntilChanged, filter, takeUntil} from "rxjs/operators";
import {Folder} from "@cdk/models";
import {LoginService} from "../../../auth/login/login.service";

@Component({
    selector     : 'folder-form',
    templateUrl  : './folder-form.component.html',
    styleUrls    : ['./folder-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FolderFormComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject();

    controls = {
        formActive: false,
        form: null,
        saving: false,
        errors: null
    }

    @ViewChild('inputNome', {static: false})
    inputNumeField;

    constructor(private _formBuilder: FormBuilder,
                private _store: Store<fromStore.BoardTarefasAppState>,
                private _loginService: LoginService,
                private _changeRef: ChangeDetectorRef)
    {
        this.controls.form = this._formBuilder.group({
            nome: ['']
        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void
    {
        this._store
            .pipe(
                takeUntil(this._unsubscribeAll),
                select(fromStore.getFolderIsSaving),
                filter(saving => saving !== undefined),
                distinctUntilChanged()
            )
            .subscribe(saving => this.controls.saving = saving);

        this._store
            .pipe(
                takeUntil(this._unsubscribeAll),
                select(fromStore.getFolderErrors),
                filter(errors => errors !== undefined),
                distinctUntilChanged()
            )
            .subscribe(errors => {
                this.controls.errors = '';
                if (errors && errors.status && (errors.status === 400 || errors.status === 422)) {
                    try {
                        const data = JSON.parse(errors.error.message);
                        const fields = Object.keys(data || {});
                        fields.forEach((field) => {
                            this.controls.errors += data[field].join(' - ');
                        });
                    } catch (e) {
                        this.controls.errors = errors.error.message;
                    }
                }

                this._changeRef.markForCheck();
            });

    }

    doOpenForm(): void
    {
        if (!this.controls.saving) {
            this.controls.formActive = true;
            this.focusInputField();
        }
    }

    doClose(): void
    {
        this.controls.formActive = false;
        this.controls.form.reset();
    }

    focusInputField(): void
    {
        setTimeout(() => {
            this.inputNumeField.nativeElement.focus();
        });
    }

    doSave(): void
    {
        if (this.controls.form.valid && this.controls.form.getRawValue()?.nome.length > 2) {
            const folder = new Folder();
            folder.nome = this.controls.form.getRawValue()?.nome;
            folder.descricao = folder.nome;
            folder.usuario = this._loginService.getUserProfile();

            this._store.dispatch(new fromStore.SaveFolder(folder));
            this.doClose();
        }
    }

}
