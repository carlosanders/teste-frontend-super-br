import {InMemoryDbService, removeTrailingSlash} from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from 'app/fake-db/dashboard-project';
import { AnalyticsDashboardDb } from 'app/fake-db/dashboard-analytics';
import { CalendarFakeDb } from 'app/fake-db/calendar';
import { ECommerceFakeDb } from 'app/fake-db/e-commerce';
import { AcademyFakeDb } from 'app/fake-db/academy';
import { MailFakeDb } from 'app/fake-db/mail';
import { ChatFakeDb } from 'app/fake-db/chat';
import { FileManagerFakeDb } from 'app/fake-db/file-manager';
import { ContactsFakeDb } from 'app/fake-db/contacts';
import { TodoFakeDb } from 'app/fake-db/todo';
import { ScrumboardFakeDb } from 'app/fake-db/scrumboard';
import { InvoiceFakeDb } from 'app/fake-db/invoice';
import { ProfileFakeDb } from 'app/fake-db/profile';
import { SearchFakeDb } from 'app/fake-db/search';
import { FaqFakeDb } from 'app/fake-db/faq';
import { KnowledgeBaseFakeDb } from 'app/fake-db/knowledge-base';
import { IconsFakeDb } from 'app/fake-db/icons';
import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            /**
            'historico': {
                'entities': [
                    {
                        'processo': {
                            'novo': true,
                            'semValorEconomico': false,
                            'NUP': '99999000016201928',
                            'visibilidadeExterna': false,
                            'acessoNegado': false,
                            'dataHoraAbertura': '2019-08-19T14:38:15',
                            'titulo': 'NOTIFICA\u00c7\u00c3O ORIGINADA NO NUP 00400.000002/2019-12',
                            'chaveAcesso': '12345678',
                            'id': 6,
                            'uuid': '789fe94d-de48-4c50-9aee-ebe9ba944143',
                            'criadoEm': '2019-08-19T14:38:18'
                        },
                        'criadoPor': {
                            'username': 'john-colaborador',
                            'nome': 'JOHN DOE -colaborador',
                            'assinaturaHTML': 'John Doe',
                            'email': 'john.doe-colaborador@test.com',
                            'enabled': true,
                            'nivelAcesso': 1,
                            'vinculacoesRoles': [],
                            'id': 24,
                            'uuid': 'd251c724-32c3-44f9-bcef-a3c48c8e3ae9',
                            'criadoEm': '2019-08-16T18:11:04'
                        },
                        'criadoEm': '2019-08-27T17:00:44',
                        'id': 3,
                        'uuid': '45aa5e51-3ef3-44d8-9b1a-1128b703fadd',
                        'descricao': 'ATIVIDADE ID 3 CRIADA NA TAREFA ID 6 NO NUP 00400.000016/2019-28'
                    }
                ],
                'total': 1
            },*/
            
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // Calendar
            'calendar': CalendarFakeDb.data,

            // E-Commerce
            'e-commerce-products' : ECommerceFakeDb.products,
            'e-commerce-orders'   : ECommerceFakeDb.orders,

            // Academy
            'academy-categories': AcademyFakeDb.categories,
            'academy-courses'   : AcademyFakeDb.courses,
            'academy-course'    : AcademyFakeDb.course,

            // Mail
            'mail-mails'  : MailFakeDb.mails,
            'mail-folders': MailFakeDb.folders,
            'mail-filters': MailFakeDb.filters,
            'mail-labels' : MailFakeDb.labels,

            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats'   : ChatFakeDb.chats,
            'chat-user'    : ChatFakeDb.user,

            // File Manager
            'file-manager': FileManagerFakeDb.files,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Todo
            'todo-todos'  : TodoFakeDb.todos,
            'todo-filters': TodoFakeDb.filters,
            'todo-tags'   : TodoFakeDb.tags,

            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,

            // Invoice
            'invoice': InvoiceFakeDb.invoice,

            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,

            // Search
            'search': SearchFakeDb.search,

            // FAQ
            'faq': FaqFakeDb.data,

            // Knowledge base
            'knowledge-base': KnowledgeBaseFakeDb.data,

            // Icons
            'icons': IconsFakeDb.icons,

            // Chat Panel
            'chat-panel-contacts' : ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
