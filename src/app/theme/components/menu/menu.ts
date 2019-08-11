import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Dashboard', '/', null, 'dashboard', null, false, 0),
    new Menu (100, 'Home', null, null, 'home', null, true, 0),
    new Menu (101, 'Perfil', '/home/perfil', null, 'account_circle', null, false, 100),
    new Menu (110, 'Seguridad', null, null, 'security', null, true, 0),
    new Menu (111, 'Usuarios', '/seguridad/usuarios', null, 'people', null, false, 110),
    new Menu (112, 'Perfiles', '/seguridad/perfiles', null, 'wc', null, false, 110),
    new Menu (113, 'Menu', '/seguridad/menu', null, 'menu', null, false, 110),
    new Menu (120, 'Administracion', null, null, 'business_center', null, true, 0),
    new Menu (121, 'Actividades', '/admin/actividades', null, 'apps', null, false, 120),
    new Menu (122, 'Protocolos', '/admin/protocolos', null, 'ballot', null, false, 120),
    new Menu (123, 'Instrumentos', '/admin/instrumentos', null, 'group_work', null, false, 120),
    new Menu (124, 'Equipos', '/admin/equipos', null, 'build', null, false, 120),
    new Menu (125, 'Clientes', '/admin/clientes', null, 'people', null, false, 120),
    new Menu (126, 'Tecnicos', '/admin/tecnicos', null, 'next_week', null, false, 120),
    new Menu (130, 'Procesos', null, null, 'insert_chart', null, true, 0),
    new Menu (131, 'Cotizaciones', '/procesos/cotizaciones', null, 'attach_money', null, false, 130),
    new Menu (132, 'Ordenes de Trabajo', '/procesos/order-trabajo', null, 'gavel', null, false, 130),
    new Menu (140, 'Estadisticas', '/estadisticas', null, 'show_chart', null, false, 0),
    new Menu (2, 'Tecnicos', '/tecnicos', null, 'supervisor_account', null, false, 0), 
    new Menu (96, 'Usuarios', '/usuarios', null, 'supervisor_account', null, false, 0), 
    new Menu (16, 'Mailbox', '/mailbox', null, 'email', null, false, 0),
    new Menu (17, 'Chat', '/chat', null, 'chat', null, false, 0),
    new Menu (46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu (47, 'Error', '/error', null, 'warning', null, false, 40),
]

export const horizontalMenuItems = [ 
   
]