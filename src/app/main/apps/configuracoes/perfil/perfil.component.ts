import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getImgChancela, getImgPerfil, UploadImagemPerfil} from './store';
import {LoginService} from '../../../auth/login/login.service';
import {ComponenteDigital, Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {Back} from '../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {ComponenteDigitalService} from '../../../../../@cdk/services/componente-digital.service';
import {ImageCropperComponent} from 'ngx-image-cropper';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PerfilComponent implements OnInit, OnDestroy {

    @ViewChild('imgPerfilUpload')
    imgPerfilUpload: ElementRef;
    @ViewChild('imgChancelaUpload')
    imgChancelaUpload: ElementRef;
    @ViewChild('imgPerfilCropComponent', {static: false})
    imgPerfilCropComponent: ImageCropperComponent;
    @ViewChild('imgChancelaCropComponent', {static: false})
    imgChancelaCropComponent: ImageCropperComponent;

    routerState: any;
    isSaving$: Observable<boolean>;
    errors: any;
    usuario: Usuario;
    activeCard: string = 'form';
    imagemPerfilEvent: any = '';
    imagemChancelaEvent: any = '';
    uploadImagesMimeTypes: string = 'image/pjpeg,image/jpeg';

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _router
     * @param _loginService
     * @param _componenteDigitalService
     */
    constructor(
        private _store: Store<fromStore.ProfileAppState>,
        private _router: Router,
        public _loginService: LoginService,
        private _componenteDigitalService: ComponenteDigitalService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this._store.pipe(select(fromStore.getErrors)).subscribe(errors => this.errors = errors);
        this.usuario = this._loginService.getUserProfile();
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this._store.pipe(
            select(getImgPerfil),
            filter(val => !!val),
            takeUntil(this._unsubscribeAll)
        ).subscribe(imgPerfil => this.usuario.imgPerfil = imgPerfil);

        this._store.pipe(
            select(getImgChancela),
            filter(val => !!val),
            takeUntil(this._unsubscribeAll)
        ).subscribe((imgChancela) => {
            this.usuario.imgChancela = imgChancela;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const usuario = new Usuario();
        usuario.id = this.usuario.id;
        values['imgPerfil'] = this.usuario?.imgPerfil?.id;
        values['imgChancela'] = this.usuario?.imgChancela?.id;
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveProfile({
            usuario: usuario,
            changes: values,
            operacaoId: operacaoId,
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    doUploadImagemPerfil(): void {
        this.imgPerfilUpload.nativeElement.click();
    }

    doUploadImagemChancela(): void {
        this.imgChancelaUpload.nativeElement.click();
    }

    doChangeImgPerfilUpload(event): void {
        this.errors = null;
        const uploadFileInput = this.imgPerfilUpload.nativeElement;
        if (uploadFileInput.files.length) {
            const file = uploadFileInput.files[0];
            if (!this.uploadImagesMimeTypes.split(',').includes(file.type)) {
                this.errors = {
                    status: 422,
                    error: {
                        message: 'Apenas extensões jpeg e jpg são permitidas para upload de imagem.'
                    }
                };
                return;
            }
            this.imagemPerfilEvent = event;
            this.activeCard = 'crop-imagem-perfil';
        }
    }

    doChangeImgChancelaUpload(event): void {
        this.errors = null;
        const uploadFileInput = this.imgChancelaUpload.nativeElement;
        if (uploadFileInput.files.length) {
            const file = uploadFileInput.files[0];
            if (!this.uploadImagesMimeTypes.split(',').includes(file.type)) {
                this.errors = {
                    status: 422,
                    error: {
                        message: 'Apenas extensões jpeg e jpg são permitidas para upload de imagem.'
                    }
                };
                return;
            }
            this.imagemChancelaEvent = event;
            this.activeCard = 'crop-imagem-chancela';
        }
    }

    imagemPerfilCropped(event: any): void {
        const componenteDigital = new ComponenteDigital();
        componenteDigital.conteudo = event.base64;
        componenteDigital.mimetype = event.base64.split(',')[0].split(':')[1].split(';')[0];
        componenteDigital.fileName = 'imagem_perfil.jpeg';
        componenteDigital.tamanho = event.base64.length;

        this._store.dispatch(new UploadImagemPerfil(componenteDigital));
    }

    imagemChancelaCropped(event: any): void {
        const componenteDigital = new ComponenteDigital();
        componenteDigital.conteudo = event.base64;
        componenteDigital.mimetype = event.base64.split(',')[0].split(':')[1].split(';')[0];
        componenteDigital.fileName = 'imagem_chancela.jpeg';
        componenteDigital.tamanho = event.base64.length;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.UploadImagemChancela({
            componenteDigital: componenteDigital,
            operacaoId: operacaoId
        }));
    }

    cropImgPerfil(): void {
        this.imgPerfilCropComponent.crop();
        this.cancelCrop();
    }

    cropImgChancela(): void {
        this.imgChancelaCropComponent.crop();
        this.cancelCrop();
    }

    cancelCrop(): void {
        this.errors = null;
        this.imagemPerfilEvent = '';
        this.imagemChancelaEvent = '';
        this.activeCard = 'form';
    }
}
