import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, Input, OnChanges,
    OnInit,
    Output, SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromStore from "../store";
import {LoginService} from "../../../../main/auth/login/login.service";
import {Chat, ChatParticipante, ComponenteDigital} from "@cdk/models";
import {ImageCropperComponent} from "ngx-image-cropper";

@Component({
    selector: 'chat-grupo-form',
    templateUrl: './chat-grupo-form.component.html',
    styleUrls: ['./chat-grupo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ChatGrupoFormComponent implements OnChanges, OnInit, AfterViewInit
{

    @Output()
    cancelFormHandler = new EventEmitter();

    @Output()
    imagemCapaCroppedHandler = new EventEmitter<ComponenteDigital>();

    @Output()
    saveHandler = new EventEmitter<Chat>();

    @Output()
    chatFormHandler = new EventEmitter<Chat>();

    @Output()
    chatParticipantesHandler = new EventEmitter<Chat>();

    @Output()
    removerParticipanteHandler = new EventEmitter<ChatParticipante>();

    @Output()
    excluirChatHandler = new EventEmitter<Chat>();

    @Input()
    chat: Chat = new Chat();

    @Input()
    capa: ComponenteDigital = new ComponenteDigital();

    @Input()
    errors: any = null;

    @Input()
    saving: boolean = false;

    @Input()
    activeCard: string = 'form';

    @ViewChild('imgCapaUpload')
    imgCapaUpload: ElementRef;

    @ViewChild('imgCapaCropComponent', {static: false})
    imgCapaCropComponent: ImageCropperComponent;

    chatGrupoForm: FormGroup;
    imagemCapaEvent: any = '';
    uploadImagesMimeTypes: string = 'image/pjpeg,image/jpeg';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.ChatAppState>,
        private _loginService: LoginService
    )
    {
        this.chatGrupoForm = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required]],
            descricao: [null],
            capa: [null],

        });
    }

    salvarChatGrupo(): void
    {
        if (!this.chatGrupoForm.invalid) {
            const chat = new Chat();
            Object.entries(this.chatGrupoForm.value).forEach(([key, value]) => {
                chat[key] = value;
            });
            chat.grupo = true;
            chat.ativo = true;
            this.saveHandler.emit(chat);
        }
    }

    cancelForm(): void
    {
        this.chatGrupoForm.reset();
        this.cancelFormHandler.emit();
    }


    uploadImagemCapa(): void
    {
        this.imgCapaUpload.nativeElement.click();
    }

    changeImgCapaUpload(event): void
    {
        this.errors = null;
        const uploadFileInput = this.imgCapaUpload.nativeElement;
        if (uploadFileInput.files.length) {
            const file = uploadFileInput.files[0];
            if (!this.uploadImagesMimeTypes.split(',').includes(file.type)) {

                this.chatGrupoForm.setErrors({
                    rulesError: 'Apenas extensões jpeg e jpg são permitidas para upload de imagem.'
                });

                this._changeDetectorRef.markForCheck();
                return;
            }
            this.imagemCapaEvent = event;
            this.activeCard = 'crop-imagem-capa';
        }
    }

    imagemCapaCropped(event: any): void
    {
        const componenteDigital = new ComponenteDigital();
        componenteDigital.conteudo = event.base64;
        componenteDigital.mimetype = event.base64.split(',')[0].split(':')[1].split(';')[0];
        componenteDigital.fileName = 'imagem_perfil.jpeg';
        componenteDigital.tamanho = event.base64.length;

        this.imagemCapaCroppedHandler.emit(componenteDigital);
    }

    cropImgCapa(): void
    {
        this.imgCapaCropComponent.crop();
        this.cancelCrop();
    }

    cancelCrop(): void
    {
        this.imagemCapaEvent = '';
        this.activeCard = 'form';
        this._changeDetectorRef.markForCheck();
    }

    chatParticipantes(chat: Chat): void
    {
        this.chatParticipantesHandler.emit(chat);
    }

    chatForm(chat: Chat): void
    {
        this.chatFormHandler.emit(chat);
    }

    removerParticipante(chatParticipante: ChatParticipante): void
    {
        this.removerParticipanteHandler.emit(chatParticipante);
    }

    excluirChat(chat: Chat): void
    {
        this.excluirChatHandler.emit(chat);
    }

    ngOnInit(): void
    {
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['capa']) {
            this.chatGrupoForm.get('capa').setValue(this.capa || null);
        }

        if (changes['chat'] && !this.chatGrupoForm.dirty) {
            this.chatGrupoForm.patchValue({
                id: this.chat?.id,
                nome: this.chat?.nome,
                descricao: this.chat?.descricao,
                capa: (this.capa || this.chat?.capa)
            });

            this.capa = this.capa || this.chat?.capa;
            this.chatGrupoForm.get('capa').setValue(this.capa || null);
        }

        if (changes['errors']) {
            if (this.errors && this.errors.status && this.errors.status === 422) {
                try {
                    const data = JSON.parse(this.errors.error.message);
                    const fields = Object.keys(data || {});
                    fields.forEach((field) => {
                        const control = this.chatGrupoForm.get(field);
                        control.setErrors({formError: data[field].join(' - ')});
                    });
                } catch (e) {
                    this.chatGrupoForm.setErrors({rulesError: this.errors.error.message});
                }
            }

            if (!this.errors) {
                Object.keys(this.chatGrupoForm.controls).forEach((key) => {
                    this.chatGrupoForm.get(key).setErrors(null);
                });

                this.chatGrupoForm.setErrors(null);
            }
        }

        this._changeDetectorRef.markForCheck();
    }

    ngAfterViewInit(): void {
        if (!this.chat?.id) {
            this.chatGrupoForm.reset();
        }
    }

}
