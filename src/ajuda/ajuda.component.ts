import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {topicosConfig} from './topicos-config';
import {Topico} from './topico';
import {CdkUtils} from '@cdk/utils';
import {DynamicService} from '../modules/dynamic.service';
import {NavigationEnd, Router} from '@angular/router';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import { ShepherdService } from 'angular-shepherd';
import { steps as defaultSteps, defaultStepOptions} from './tour/data';
import {CdkConfigService} from '@cdk/services/config.service';
import {modulesConfig} from '../modules/modules-config';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'ajuda',
    templateUrl: './ajuda.component.html',
    styleUrls: ['./ajuda.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AjudaComponent implements OnInit {
    @ViewChild('container', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

    form: FormGroup;

    topicos: Topico[] = [];
    resultado: Topico[] = [];
    botoesModulos: any[] = [];

    card = 'form';
    titulo = '';
    categoria= '';

    isSubmited = false;

    context: any;
    iniciatour: string;
    tourInicio: boolean;
    aberto: boolean;

    /**
     * Constructor
     */
    constructor(
        public _cdkConfigService: CdkConfigService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dynamicService: DynamicService,
        private _router: Router,
        public _cdkSidebarService: CdkSidebarService,
      public shepherdService: ShepherdService,
    ) {
        this.form = this._formBuilder.group({
            pesquisa: [null, [Validators.required, Validators.maxLength(255)]],
        });

        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(
            (next) => {
                this.context = next;
                if (this.context.url){
                    this.resultado = this.topicos.filter(topico => topico.path && this.context.urlAfterRedirects.match(topico.path));
                    if (!this.resultado.length) {
                        if(CdkUtils.filterArrayByString(this.topicos, this.context.url.split('/', 3)[2])){
                            this.resultado = CdkUtils.filterArrayByString(this.topicos, this.context.url.split('/', 3)[2]);
                        }
                    }
                }
            }
        );

        modulesConfig.forEach((module: any) => {
            if (module.ajuda.length) {
                this.botoesModulos.push(
                    {
                        'label': module?.label ?? module.name,
                        'name': module.name,
                        'icon': module?.icon ?? 'input'
                    }
                );
            }
        });
    }

    ngOnInit(): void {
        this.topicos = topicosConfig;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    pesquisar(): void {
        this.back();
        this.isSubmited = true;
        this.resultado = CdkUtils.filterArrayByString(this.topicos, this.form.get('pesquisa').value);
    }

    pesquisarCat(cat): void {
        this.categoria = cat;
        this.back();
        this.isSubmited = true;
        this.resultado = CdkUtils.filterArrayByString(this.topicos, this.categoria);
    }

    carregar(topico: Topico): void {
        this.card = 'modulo';
        this.titulo = topico.titulo;
        this._dynamicService.loadComponent(topico.module)
            .then(componentFactory => this.container.createComponent(componentFactory));
    }

    back(): void {
        this.card = 'form';
        this.container.clear();
    }

    tour(tour: string): void {
        if(this._cdkSidebarService.getSidebar('navbar').folded){
            this._cdkSidebarService.getSidebar('navbar').toggleFold();
            this.aberto = true;
        }
        this._cdkSidebarService.getSidebar('ajudaPanel').toggleOpen();

        this.iniciatour = tour;

        this.tourInicio = true;
        this.shepherdService.defaultStepOptions = defaultStepOptions;
        this.shepherdService.modal = true;
        this.shepherdService.isActive=true;
        this.shepherdService.confirmCancel = false;
        this.shepherdService.addSteps(defaultSteps);
        this.shepherdService.start();
    }

}
