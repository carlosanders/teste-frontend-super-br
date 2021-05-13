import {
    Component,
    OnInit,
    ViewEncapsulation,
    EventEmitter, Output, Input, ChangeDetectorRef
} from '@angular/core';
import {Chat, ChatParticipante, Pagination, Usuario} from "../../../../../@cdk/models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromStore from "../store";
import {OpenChat} from "../store";
import {LoginService} from "../../../../main/auth/login/login.service";

@Component({
    selector: 'chat-header',
    templateUrl: './chat-header.component.html',
    styleUrls: ['./chat-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatHeaderComponent implements OnInit
{

    @Output()
    novaConversaHandler = new EventEmitter();

    @Output()
    pesquisaChatHandler = new EventEmitter<string>();

    activeCard: string = 'chat-list';
    usuarioFormPagination: Pagination;
    usuarioForm: FormGroup;
    pesquisaForm: FormGroup;

    /**
     *
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.ChatAppState>,
        private _loginService: LoginService
    )
    {
        this.usuarioForm = this._formBuilder.group({
            usuario: [null, [Validators.required]]
        });
        this.pesquisaForm = this._formBuilder.group({
            pesquisa: [null]
        });

        this.usuarioFormPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.usuarioFormPagination.filter = {'id': 'neq:'+this._loginService.getUserProfile().id};
        this.activeCard = 'chat-list';
    }

    novaConversa() : void
    {
        this.activeCard = 'chat-individual-form';
    }

    checkUsuario(): void
    {
        const value = this.usuarioForm.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.usuarioForm.get('usuario').setValue(null);
        }
    }

    iniciarChat(): void
    {
        this.checkUsuario();

        if (this.usuarioForm.invalid) {
            return;
        }
        this._store.dispatch(new fromStore.CriarOuRetornar({
            usuario: this.usuarioForm.get('usuario').value,
            populate: ['participantes.usuario', 'ultimaMensagem.usuario', 'populateAll']
        }));
        this.cancelUsuarioForm();
    }

    cancelUsuarioForm(): void
    {
        this.activeCard = 'chat-list';
        this.usuarioForm.reset();
    }

    pesquisar(): void
    {
        this.pesquisaChatHandler.emit(this.pesquisaForm.get('pesquisa').value ?? '');
    }
}
