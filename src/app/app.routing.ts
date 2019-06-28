import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'home', loadChildren: './pages/home/home.module#HomeModule', data: { breadcrumb: 'Home' } },
            { path: 'seguridad', loadChildren: './pages/seguridad/seguridad.module#SeguridadModule', data: { breadcrumb: 'Seguridad' } },
            { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', data: { breadcrumb: 'Administracion' } },
            { path: 'procesos', loadChildren: './pages/procesos/procesos.module#ProcesosModule', data: { breadcrumb: 'Procesos' } },
            { path: 'estadisticas', loadChildren: './pages/estadisticas/estadisticas.module#EstadisticasModule', data: { breadcrumb: 'Estadisticas' } },
            { path: 'users', loadChildren: './pages/users/users.module#UsersModule', data: { breadcrumb: 'Users' } },
            { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: './pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
        ]
    },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});