import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from '../../auth/login/login.service';
import {CalendarEventModel} from './event.model';

@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;

    /**
     * @param _httpClient
     * @param _tarefaService
     * @param _loginService
     */
    constructor(
        private _httpClient: HttpClient,
        private _tarefaService: TarefaService,
        private _loginService: LoginService
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     * @returns
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve(null);
                },
                reject
            );
        });
    }

    /**
     * Get events
     *
     * @returns
     */
    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._tarefaService.query(
                JSON.stringify( {
                    'usuarioResponsavel.id': 'eq:' + this._loginService.getUserProfile().id,
                    'dataHoraConclusaoPrazo': 'isNull',
                    'especieTarefa.evento': 'eq:true'
                }),
                100,
                0,
                '{}',
                '["populateAll", "especieTarefa.generoTarefa", "vinculacoesEtiquetas", "vinculacoesEtiquetas.etiqueta"]').subscribe((response: any) => {
                this.events = response['entities'].map((tarefa) => {
                    const data = {
                        start    : tarefa.dataHoraInicioPrazo.toDate(),
                        end      : tarefa.dataHoraFinalPrazo.toDate(),
                        title    : tarefa.especieTarefa.nome,
                        allDay   : false,
                        color    : {
                            primary  : tarefa.especieTarefa.corHexadecimalPrimaria ?? '#F44336',
                            secondary: tarefa.especieTarefa.corHexadecimalSecundaria ?? '#FFCDD2'
                        },
                        resizable: {
                            beforeStart: true,
                            afterEnd   : true
                        },
                        draggable: true,
                        meta     : {
                            location: tarefa.localEvento,
                            notes   : tarefa.observacao,
                            tarefa: tarefa
                        }
                    };
                    return new CalendarEventModel(data);
                });
                this.onEventsUpdated.next(this.events);
                resolve(this.events);
            }, reject);

        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns
     */
    updateEvents(events): Promise<any>
    {


        return this.getEvents();
    }

}
