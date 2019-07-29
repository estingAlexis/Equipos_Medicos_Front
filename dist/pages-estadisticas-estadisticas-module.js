(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-estadisticas-estadisticas-module"],{

/***/ "./src/app/pages/estadisticas/estadisticas.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pages/estadisticas/estadisticas.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row wrap\">\n    <div fxFlex=\"100\" class=\"flex-p\"> \n        <mat-card class=\"p-0 estadisticas\">\n            <mat-sidenav-container>\n                <mat-sidenav #sidenav [opened]=\"sidenavOpen\" [mode]=\"sidenavOpen ? 'side' : 'over'\" class=\"estadisticas-sidenav mat-elevation-z1\">\n                    <mat-toolbar color=\"primary\" class=\"p-0\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                        <input [(ngModel)]=\"searchText\" type=\"text\" placeholder=\"Search mail...\" class=\"search mat-elevation-z3\">\n                        <button mat-icon-button [matMenuTriggerFor]=\"filterMenu\" #filterMenuTrigger=\"matMenuTrigger\">\n                            <mat-icon>more_vert</mat-icon>\n                        </button>                                     \n                    </mat-toolbar>\n                    <mat-menu #filterMenu=\"matMenu\" xPosition=\"before\" overlapTrigger=\"true\">\n                        <span (mouseleave)=\"filterMenuTrigger.closeMenu()\">\n                            <button mat-menu-item (click)=\"type = 'all';getMails();\">All</button>\n                            <button mat-menu-item (click)=\"type = 'starred';getMails();\">Starred</button>\n                            <button mat-menu-item (click)=\"type = 'sent';getMails();\">Sent</button>\n                            <button mat-menu-item (click)=\"type = 'drafts';getMails();\">Drafts</button>\n                            <button mat-menu-item (click)=\"type = 'trash';getMails();\">Trash</button>\n                        </span>\n                    </mat-menu> \n                    <mat-nav-list class=\"p-0 estadisticas-sidenav-list\" perfectScrollbar>\n                        <div *ngFor=\"let mail of mails | MailSearch : searchText\" (click)=\"viewDetail(mail)\">\n                            <mat-list-item [ngClass]=\"{'unread': mail.unread, 'selected': mail.selected}\">\n                                <img *ngIf=\"mail.senderPhoto\" matListAvatar  [src]=\"mail.senderPhoto\">\n                                <img *ngIf=\"!mail.senderPhoto\" matListAvatar src=\"assets/img/users/default-user.jpg\">\n                                <div matLine fxLayout=\"row\" fxLayoutAlign=\"space-between space-between\">   \n                                    <h4 class=\"text-truncate sender\">{{mail.sender}}</h4> \n                                    <small>{{mail.date}}</small> \n                                </div>\n                                <p matLine class=\"text-truncate subject\">{{mail.subject}}</p>\n                            </mat-list-item>\n                            <mat-divider></mat-divider>\n                        </div>                        \n                    </mat-nav-list>\n                </mat-sidenav>              \n                <div>\n                    <mat-toolbar color=\"primary\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                        <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n                            <button mat-icon-button (click)=\"sidenav.toggle()\">\n                                <mat-icon>list</mat-icon>\n                            </button>\n                            <button *ngIf=\"mail && type !='trash'\" mat-icon-button matTooltip=\"Reply\" matTooltipPosition=\"above\">\n                                <mat-icon>reply</mat-icon>\n                            </button>\n                            <button *ngIf=\"newMail\" mat-icon-button (click)=\"newMail = false;\" matTooltip=\"Back\" matTooltipPosition=\"above\">\n                                <mat-icon>arrow_back</mat-icon>\n                            </button>\n                            <button *ngIf=\"mail && type !='trash'\" mat-icon-button (click)=\"changeStarStatus()\" matTooltip=\"Mark as inportant\" matTooltipPosition=\"above\" fxShow=\"false\" fxShow.gt-xs>\n                                <mat-icon *ngIf=\"mail.starred\">star</mat-icon>\n                                <mat-icon *ngIf=\"!mail.starred\">star_border</mat-icon>\n                            </button> \n                            <button *ngIf=\"mail && type=='trash'\" mat-icon-button (click)=\"restore()\" matTooltip=\"Restore\" matTooltipPosition=\"above\">\n                                <mat-icon>undo</mat-icon>\n                            </button> \n                            <button *ngIf=\"mail\" mat-icon-button matTooltip=\"Report spam\" matTooltipPosition=\"above\" fxShow=\"false\" fxShow.gt-xs>\n                                <mat-icon>error</mat-icon>\n                            </button> \n                            <button *ngIf=\"mail && type !='trash'\" mat-icon-button (click)=\"delete()\" matTooltip=\"Move to trash\" matTooltipPosition=\"above\">\n                                <mat-icon>delete</mat-icon>\n                            </button>\n                            <button mat-icon-button [matMenuTriggerFor]=\"moreMenu\" #moreMenuTrigger=\"matMenuTrigger\" [style.display]=\"(mail) ? 'block' : 'none'\">\n                                <mat-icon>more_vert</mat-icon>\n                            </button>\n                        </div>\n                        <button mat-raised-button color=\"warn\" (click)=\"compose()\">Compose</button>\n                    </mat-toolbar>\n                    <mat-menu #moreMenu=\"matMenu\" xPosition=\"before\" overlapTrigger=\"true\">\n                        <span (mouseleave)=\"moreMenuTrigger.closeMenu()\">\n                            <button mat-menu-item (click)=\"setAsRead()\">Mark as read</button>\n                            <button mat-menu-item (click)=\"setAsUnRead()\">Mark as unread</button>\n                            <button mat-menu-item (click)=\"delete()\">Delete</button>\n                        </span>\n                    </mat-menu> \n                    <div class=\"estadisticas-content\" perfectScrollbar>\n                        <div *ngIf=\"mail\">\n                            <mat-list class=\"p-0\">\n                                <mat-list-item class=\"h-100 py-1\">\n                                    <div matLine  fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                                        <h2 class=\"subject\">{{mail.subject}}</h2>\n                                        <mat-icon class=\"muted-text\">print</mat-icon>\n                                    </div>                                    \n                                </mat-list-item>\n                                <mat-divider></mat-divider> \n                                <mat-list-item class=\"h-100 py-1\">\n                                    <img *ngIf=\"mail.senderPhoto\" matListAvatar  [src]=\"mail.senderPhoto\">\n                                    <img *ngIf=\"!mail.senderPhoto\" matListAvatar src=\"assets/img/users/default-user.jpg\">\n                                    <h6 matLine fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                                        <span>\n                                            <strong class=\"text-truncate\">{{mail.sender}}</strong>\n                                            <span *ngIf=\"mail.senderMail\" class=\"email\">&lt;{{mail.senderMail}}&gt;</span>\n                                        </span>\n                                        <span>{{mail.date}}</span>\n                                    </h6>\n                                    <span matLine>to me</span>\n                                </mat-list-item>\n                                <mat-divider></mat-divider>\n                            </mat-list>\n                            <div class=\"mail-body\" [innerHTML]=\"mail.body\"></div>\n                            <div *ngIf=\"mail.attachments.length > 0\" class=\"mail-body\">\n                                <mat-divider></mat-divider>\n                                <p>\n                                    <strong>{{mail.attachments.length}} attachments</strong>\n                                    <button mat-icon-button matTooltip=\"Download all attachments\" matTooltipPosition=\"above\">\n                                        <mat-icon>file_download</mat-icon>\n                                    </button>\n                                    <button mat-icon-button matTooltip=\"View all Images\" matTooltipPosition=\"above\">\n                                        <mat-icon>pageview</mat-icon>\n                                    </button>\n                                </p>\n                                <div *ngFor=\"let attachment of mail.attachments; let i = index\">\n                                    <img [src]=\"attachment\" alt=\"attachment\">\n                                    <h3>image-{{i + 1}}.jpg</h3>\n                                    <p>\n                                        <span>457K</span>\n                                        <button mat-icon-button>\n                                            <mat-icon>file_download</mat-icon>\n                                        </button>\n                                        <button mat-icon-button>\n                                            <mat-icon>pageview</mat-icon>\n                                        </button>\n                                    </p>\n                                </div>\n                            </div>\n                        </div>\n                        <div *ngIf=\"!mail && !newMail\" fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"h-100 empty\">\n                            <mat-icon>mail_outline</mat-icon>            \n                            <p>Select a mail to read</p>\n                        </div> \n                        <form *ngIf=\"newMail\" [formGroup]=\"form\" (ngSubmit)=\"onSubmit(form.value)\" class=\"mail-body\"> \n                            <mat-form-field class=\"w-100\">\n                                <input matInput placeholder=\"To\" formControlName=\"to\">\n                            </mat-form-field> \n                            <mat-form-field class=\"w-100\">\n                                <input matInput placeholder=\"Cc/Bcc\" formControlName=\"cc\">\n                            </mat-form-field> \n                            <mat-form-field class=\"w-100\">\n                                <input matInput placeholder=\"Subject\" formControlName=\"subject\">\n                            </mat-form-field>                          \n                            <quill-editor formControlName=\"message\"></quill-editor>                            \n                            <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n                                <button mat-raised-button (click)=\"newMail = false;\" type=\"button\">Cancel</button>\n                                <button mat-raised-button color=\"primary\" type=\"submit\">Send</button>\n                            </div> \n                        </form> \n                    </div>\n                </div>            \n            </mat-sidenav-container>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/estadisticas/estadisticas.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/estadisticas/estadisticas.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".estadisticas .search {\n  margin: 0 14px;\n  width: 100%;\n  border: none;\n  border-radius: 2px;\n  padding: 6px;\n  outline: none; }\n\n.estadisticas .mail-body {\n  padding: 16px; }\n\n.estadisticas .empty mat-icon {\n  font-size: 220px;\n  height: 220px;\n  width: 220px;\n  opacity: 0.4; }\n\n.estadisticas .empty p {\n  font-size: 18px;\n  opacity: 0.8; }\n\n.estadisticas-sidenav {\n  width: 350px;\n  border-right: 1px solid transparent;\n  overflow: hidden; }\n\n.estadisticas-content {\n  height: calc(100vh - (56px + 8px*2 + 132px)); }\n\n.estadisticas-content .mat-line {\n    white-space: unset; }\n\n.estadisticas-content .subject {\n    font-weight: 500; }\n\n.estadisticas-sidenav-list {\n  height: calc(100vh - (56px + 8px*2 + 132px)); }\n\n.estadisticas-sidenav-list .sender {\n    font-weight: 400; }\n\n.estadisticas-sidenav-list .subject {\n    font-size: 13px; }\n\n.estadisticas-sidenav-list .unread .mat-line, .estadisticas-sidenav-list .unread .sender {\n    font-weight: bold; }\n\n.estadisticas-sidenav-list .selected {\n    background: rgba(0, 0, 0, 0.15); }\n\n@media (max-width: 575px) {\n  .estadisticas-sidenav {\n    width: 280px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2xhc3psby9Eb2N1bWVudG9zL0dpdEh1Yi9FcXVpcG9zX01lZGljb3NfRnJvbnQvc3JjL2FwcC9wYWdlcy9lc3RhZGlzdGljYXMvZXN0YWRpc3RpY2FzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBRVEsY0FBYztFQUNkLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixhQUFhLEVBQUE7O0FBUHJCO0VBVVEsYUFBYSxFQUFBOztBQVZyQjtFQWNZLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsWUFBWTtFQUNaLFlBQVksRUFBQTs7QUFqQnhCO0VBb0JZLGVBQWU7RUFDZixZQUFZLEVBQUE7O0FBSXhCO0VBQ0ksWUFBWTtFQUNaLG1DQUFtQztFQUNuQyxnQkFBZ0IsRUFBQTs7QUFFcEI7RUFDSSw0Q0FBd0YsRUFBQTs7QUFENUY7SUFHUSxrQkFBa0IsRUFBQTs7QUFIMUI7SUFNUSxnQkFBZ0IsRUFBQTs7QUFHeEI7RUFDSSw0Q0FBd0YsRUFBQTs7QUFENUY7SUFHUSxnQkFBZ0IsRUFBQTs7QUFIeEI7SUFNUSxlQUFlLEVBQUE7O0FBTnZCO0lBU1EsaUJBQWlCLEVBQUE7O0FBVHpCO0lBWVEsK0JBQTJCLEVBQUE7O0FBSW5DO0VBQ0k7SUFDSSxZQUFZLEVBQUEsRUFDZiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2VzdGFkaXN0aWNhcy9lc3RhZGlzdGljYXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vdGhlbWUvc3R5bGVzL3ZhcmlhYmxlc1wiO1xuXG4uZXN0YWRpc3RpY2FzeyBcbiAgICAuc2VhcmNoe1xuICAgICAgICBtYXJnaW46IDAgMTRweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBwYWRkaW5nOiA2cHg7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuICAgIC5tYWlsLWJvZHl7XG4gICAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgfSAgIFxuICAgIC5lbXB0eXtcbiAgICAgICAgbWF0LWljb257XG4gICAgICAgICAgICBmb250LXNpemU6IDIyMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyMjBweDtcbiAgICAgICAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgICAgfVxuICAgICAgICBwe1xuICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgICB9XG4gICAgfSAgICBcbn1cbi5lc3RhZGlzdGljYXMtc2lkZW5hdntcbiAgICB3aWR0aDogMzUwcHg7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi5lc3RhZGlzdGljYXMtY29udGVudHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAoI3skdG9vbGJhci1oZWlnaHR9ICsgI3skaW5uZXItc2lkZW5hdi1jb250ZW50LXBhZGRpbmd9KjIgKyAxMzJweCkpO1xuICAgIC5tYXQtbGluZXtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHVuc2V0O1xuICAgIH1cbiAgICAuc3ViamVjdHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG59XG4uZXN0YWRpc3RpY2FzLXNpZGVuYXYtbGlzdHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAoI3skdG9vbGJhci1oZWlnaHR9ICsgI3skaW5uZXItc2lkZW5hdi1jb250ZW50LXBhZGRpbmd9KjIgKyAxMzJweCkpO1xuICAgIC5zZW5kZXJ7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgfVxuICAgIC5zdWJqZWN0e1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgfVxuICAgIC51bnJlYWQgLm1hdC1saW5lLCAudW5yZWFkIC5zZW5kZXIge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG4gICAgLnNlbGVjdGVke1xuICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLC4xNSk7XG4gICAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNTc1cHgpIHsgXG4gICAgLmVzdGFkaXN0aWNhcy1zaWRlbmF2e1xuICAgICAgICB3aWR0aDogMjgwcHg7XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/estadisticas/estadisticas.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/estadisticas/estadisticas.component.ts ***!
  \**************************************************************/
/*! exports provided: EstadisticasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadisticasComponent", function() { return EstadisticasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _estadisticas_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./estadisticas.service */ "./src/app/pages/estadisticas/estadisticas.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EstadisticasComponent = /** @class */ (function () {
    function EstadisticasComponent(appSettings, formBuilder, snackBar, estadisticasService) {
        this.appSettings = appSettings;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.estadisticasService = estadisticasService;
        this.sidenavOpen = true;
        this.type = 'all';
        this.settings = this.appSettings.settings;
    }
    EstadisticasComponent.prototype.ngOnInit = function () {
        this.getMails();
        if (window.innerWidth <= 992) {
            this.sidenavOpen = false;
        }
        this.form = this.formBuilder.group({
            'to': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'cc': null,
            'subject': null,
            'message': null
        });
    };
    EstadisticasComponent.prototype.onWindowResize = function () {
        (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
    };
    EstadisticasComponent.prototype.getMails = function () {
        switch (this.type) {
            case 'all':
                this.mails = this.estadisticasService.getAllMails();
                break;
            case 'starred':
                this.mails = this.estadisticasService.getStarredMails();
                break;
            case 'sent':
                this.mails = this.estadisticasService.getSentMails();
                break;
            case 'drafts':
                this.mails = this.estadisticasService.getDraftMails();
                break;
            case 'trash':
                this.mails = this.estadisticasService.getTrashMails();
                break;
            default:
                this.mails = this.estadisticasService.getDraftMails();
        }
    };
    EstadisticasComponent.prototype.viewDetail = function (mail) {
        this.mail = this.estadisticasService.getMail(mail.id);
        this.mails.forEach(function (m) { return m.selected = false; });
        this.mail.selected = true;
        this.mail.unread = false;
        this.newMail = false;
        if (window.innerWidth <= 992) {
            this.sidenav.close();
        }
    };
    EstadisticasComponent.prototype.compose = function () {
        this.mail = null;
        this.newMail = true;
    };
    EstadisticasComponent.prototype.setAsRead = function () {
        this.mail.unread = false;
    };
    EstadisticasComponent.prototype.setAsUnRead = function () {
        this.mail.unread = true;
    };
    EstadisticasComponent.prototype.delete = function () {
        this.mail.trash = true;
        this.mail.sent = false;
        this.mail.draft = false;
        this.mail.starred = false;
        this.getMails();
        this.mail = null;
    };
    EstadisticasComponent.prototype.changeStarStatus = function () {
        this.mail.starred = !this.mail.starred;
        this.getMails();
    };
    EstadisticasComponent.prototype.restore = function () {
        this.mail.trash = false;
        this.type = 'all';
        this.getMails();
        this.mail = null;
    };
    EstadisticasComponent.prototype.onSubmit = function (mail) {
        console.log(mail);
        if (this.form.valid) {
            this.snackBar.open('Mail sent to ' + mail.to + ' successfully!', null, {
                duration: 2000,
            });
            this.form.reset();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav'),
        __metadata("design:type", Object)
    ], EstadisticasComponent.prototype, "sidenav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EstadisticasComponent.prototype, "onWindowResize", null);
    EstadisticasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-estadisticas',
            template: __webpack_require__(/*! ./estadisticas.component.html */ "./src/app/pages/estadisticas/estadisticas.component.html"),
            providers: [_estadisticas_service__WEBPACK_IMPORTED_MODULE_4__["EstadisticasService"]],
            styles: [__webpack_require__(/*! ./estadisticas.component.scss */ "./src/app/pages/estadisticas/estadisticas.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_3__["AppSettings"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _estadisticas_service__WEBPACK_IMPORTED_MODULE_4__["EstadisticasService"]])
    ], EstadisticasComponent);
    return EstadisticasComponent;
}());



/***/ }),

/***/ "./src/app/pages/estadisticas/estadisticas.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/estadisticas/estadisticas.module.ts ***!
  \***********************************************************/
/*! exports provided: routes, EstadisticasModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadisticasModule", function() { return EstadisticasModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm5/ngx-quill.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../theme/pipes/pipes.module */ "./src/app/theme/pipes/pipes.module.ts");
/* harmony import */ var _estadisticas_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./estadisticas.component */ "./src/app/pages/estadisticas/estadisticas.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: '', component: _estadisticas_component__WEBPACK_IMPORTED_MODULE_8__["EstadisticasComponent"], pathMatch: 'full' }
];
var EstadisticasModule = /** @class */ (function () {
    function EstadisticasModule() {
    }
    EstadisticasModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_4__["PerfectScrollbarModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_5__["QuillModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"]
            ],
            declarations: [
                _estadisticas_component__WEBPACK_IMPORTED_MODULE_8__["EstadisticasComponent"]
            ]
        })
    ], EstadisticasModule);
    return EstadisticasModule;
}());



/***/ }),

/***/ "./src/app/pages/estadisticas/estadisticas.service.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/estadisticas/estadisticas.service.ts ***!
  \************************************************************/
/*! exports provided: EstadisticasService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstadisticasService", function() { return EstadisticasService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _mail_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mail.model */ "./src/app/pages/estadisticas/mail.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var Mails = [
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](1, 'Envato Market', 'assets/img/app/envato.jpg', 'do-not-reply@market.envato.com', 'Your updated item has been approved', '4:08 PM', '<p>Congratulations! Your update to Azimuth - Angular 2 Admin Template on ThemeForest has been approved. ' +
        'You can view your item here: </p>' +
        '<p><a href="http://themeforest.net/item/azimuth-angular-2-admin-template/19182105" target="blank">http://themeforest.net/item/azimuth-angular-2-admin-template/19182105</a></p>' +
        '<p>Thanks for your submission!</p>' +
        '<p>Regards,<br> Envato Market Team</p>', false, [], true, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](2, 'Josiah Fromdahl', 'assets/img/profile/bruno.jpg', 'Reekie8647@gmail.com', 'Useful tool for those who are involved in SEO', '9:47 AM', '<p>Hi, I want to introduce the Website Reviewer is an incredibly useful tool for those who are involved in SEO and web designing. ' +
        'This particular tool will provide you with quick website review and SEO audit of the websites you’ve created so ' +
        'you will be able to determine if and where any changes should be made so you can make it as effective ' +
        'as possible when it comes to getting visitors and keeping them interested. ' +
        'Unlike many similar tools, website reviewer is completely free.</p>', true, ['assets/img/app/snow.jpg', 'assets/img/app/sample.jpg'], true, false, true, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](3, 'Google Cloud Platform', 'assets/img/app/google-platform.png', 'CloudPlatform-noreply@google.com', 'Lessons from the field: surviving success with Customer Reliability Engineering', 'Jan 5', '<h4>TRENDING</h4>' +
        '<p>For those who missed the early adoption of Infrastructure as a Service circa 2007,' +
        'this in-depth history stresses why businesses need to begin building around "serverless" architectures.</p>' +
        '<p>A stress test led by Pivotal’s Cloud Foundry team ran 250,000 real-life app containers on Google Compute Engine. ' +
        'GCP made it possible to stand the environment up in hours, and scaled it without pre-planning.</p>' +
        '<p>Dig in to a new site packed with open-source tools and resources that aims to make it easy for anyone to explore, develop, and share AI creations. ' +
        'Play an AI duet, or have your phone guess what you’re drawing.</p>', false, [], false, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](4, 'Microsoft Visual Studio', 'assets/img/app/vs.jpg', 'MVS@e-mail.microsoft.com', 'Welcome to Visual Studio Team Services', '24.12.2016', '<p>Whether your teams develop in Java, .NET, or in multiple languages, Visual Studio Team Services offers an open,' +
        'cloud-hosted development hub. Use your favorite IDE, develop in any language, and empower your teams to iterate ' +
        'rapidly.</p> <p>Rogue security software scams. Rogue security software, also known as "scareware," is software that ' +
        'appears to be beneficial from a security perspective but provides limited or no security, generates erroneous or ' +
        'misleading alerts, or attempts to lure you into participating in fraudulent transactions. These scams can appear ' +
        'in email, online advertisements, your social networking site, search engine results, or even in pop-up windows on ' +
        'your computer that might appear to be part of your operating system, but are not.</p>', false, [], true, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](5, 'Draft', '', '', 'no subject', '4:46 PM', '', false, [], false, false, false, true, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](6, 'Draft', '', '', 'Please confirm your email', 'Jan 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum interdum ex, sed aliquet nisl maximus imperdiet. Phasellus pharetra nunc eu dui hendrerit, quis ullamcorper tortor malesuada. Nullam ante mi, auctor eu nunc vitae, gravida molestie arcu.', false, [], false, false, false, true, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](7, 'MailChimp', 'assets/img/app/mailchimp.jpg', 'hello@mailchimp.com', 'Our 2016 annual report', '22.12.2016', '<p>For our 2016 annual report, we let our design team run wild with our most fun facts and proudest moments from the year. From GIFs in email campaigns to physical tons of infrastructure added to dollars raised for charity, it’s our year in numbers.</p>' +
        '<p>We’re proud of our new features, our customer support tickets solved, and our philanthropy in Atlanta. But we’re even more proud of you and the billions of emails you’ve sent to grow your businesses your way in 2016. Keep up the good work!</p>' +
        '<p>Cheers to the new year,</p>' +
        '<p>MailChimp</p>', false, [], false, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](8, 'Bluehost', 'assets/img/app/bluehost.jpg', 'no-reply@e.bluehost.com', 'Your domain privacy may be at risk', '20.12.2016', '<h4>New ICANN Rules Require Accurate Contact Information</h4>' +
        '<p>Your domain information may be at risk. However, you can protect your information with domain privacy.</p>' +
        '<p>Protect yourself with Domain Privacy.</p>' +
        '<p><small>Only $11.88 per year.**</small></p>' +
        '<p><a href="http://bluehost.com/" target="blank" class="btn btn-success">Get started</a></p>', false, [], false, false, true, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](9, 'Vimeo', 'assets/img/users/default-user.jpg', 'vimeo@email.vimeo.com', 'The year\'s best videos and milestones', '20.12.2016', '<h4>Now presenting: 2016\'s best videos</h4>' +
        '<p>Every day, the world\'s best creators upload their videos to Vimeo. And now, the most inventive, most striking, most all-around mind-blowing videos of 2016 are in. Enjoy, wondrous humans.</p>' +
        '<p><a href="https://vimeo.com/blog/post/The-Top-Videos-of-2016?utm_source=email&utm_medium=vimeo-decembernewsletter-201612&utm_campaign=30389" target="blank" class="btn btn-info">See the list</a></p>', false, [], false, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](10, 'Andy Dufresne', 'assets/img/profile/adam.jpg', 'andy.dufresne@gmail.com', 'The Shawshank Redemption', '18.11.2016', '<p>From Wikipedia, the free encyclopedia</p>' +
        '<p>The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont. and starring Tim Robbins and Morgan Freeman. Adapted from the Stephen King novella Rita Hayworth and Shawshank Redemption, the film tells the story of Andy Dufresne, ' +
        'a banker who is sentenced to life in Shawshank State Penitentiary for the murder of his wife and her lover, despite his claims of innocence. During his time at the prison, he befriends a fellow inmate, Ellis Boyd "Red" Redding, ' +
        'and finds himself protected by the guards after the warden begins using him in his money-laundering operation.</p>', false, [], false, true, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](11, 'The Envato Team', 'assets/img/app/envato.jpg', 'donotreply@envato.com', 'Author Driven Pricing on ThemeForest, CodeCanyon and 3DOcean', '05.09.2016', '<h5>Hey Envato Community Members!</h5>' +
        '<p>As many of you know, over the past 12 months we have been rolling out Author Driven Pricing (ADP) across a range of different categories on Envato Market. So far this has included GraphicRiver and a handful of categories within ThemeForest.</p>' +
        '<p>In a few weeks, we\'ll be moving on to the next stage of our Author Driven Pricing project. This will involve introducing ADP to three new areas of Envato Market. These areas are:</p>' +
        '<ul><li>All remaining ThemeForest categories (including WordPress). </li><li>All categories on CodeCanyon.</li><li>All categories on 3DOcean</li></ul>' +
        '<p>We strongly recommend reading the full announcement on our forums where you will find:</p>' +
        '<ul><li>More details about the change.</li><li>How ADP has impacted pricing on previous categories.</li><li>Technical details regarding how to set prices.</li> <li>Why we’ve made the change. </li></ul>' +
        '<p>You will also be able to ask any questions you might have.</p>' +
        '<p>We will send you another email to let you know when this feature goes live.</p>' +
        '<p>All the best,</p>' +
        '<p>The Envato Team</p>', false, [], false, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](12, 'Jonathan Cantu', 'assets/img/avatars/avatar-3.png', 'JCantu@billingsleyco.com', 'Ability to Customize', '02.09.2016', '<p>Hi,</p><p>Upon purchases, will I have the ability to modify color palette, font, etc. beyond your own design?</p><p>Thanks</p>', false, [], false, false, false, false, false, false),
    new _mail_model__WEBPACK_IMPORTED_MODULE_1__["Mail"](13, 'Jennifer Adam', 'assets/img/profile/julia.jpg', 'jenniferadam2009@gmail.com', 'Guest Post Request - 2016 !!!', '09.05.2016', '<p><b>Hello,</b></p>' +
        '<p>I\'m Jennifer, constant follower of your blog posts and I\'ve liked most of the blog posts written here. I could realize you\'ve already published some great guest posts from different authors with distinct styles ' +
        'and I\'d be privileged if I were provided with an opportunity to delight your blog followers with some informative blog posts.</p>' +
        '<p>I\'m a content expert and I\'ve contributed some sensible and informative articles to surplus niche-specific blogs. I realize the value of content and its part in helping out numerous people out there in the space. </p>', false, [], false, false, false, false, false, false)
];
var EstadisticasService = /** @class */ (function () {
    function EstadisticasService() {
    }
    EstadisticasService.prototype.getAllMails = function () {
        return Mails.filter(function (mail) { return mail.sent == false && mail.draft == false && mail.trash == false; });
    };
    EstadisticasService.prototype.getStarredMails = function () {
        return Mails.filter(function (mail) { return mail.starred == true; });
    };
    EstadisticasService.prototype.getSentMails = function () {
        return Mails.filter(function (mail) { return mail.sent == true; });
    };
    EstadisticasService.prototype.getDraftMails = function () {
        return Mails.filter(function (mail) { return mail.draft == true; });
    };
    EstadisticasService.prototype.getTrashMails = function () {
        return Mails.filter(function (mail) { return mail.trash == true; });
    };
    EstadisticasService.prototype.getMail = function (id) {
        return Mails.find(function (mail) { return mail.id === +id; });
    };
    EstadisticasService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], EstadisticasService);
    return EstadisticasService;
}());



/***/ }),

/***/ "./src/app/pages/estadisticas/mail.model.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/estadisticas/mail.model.ts ***!
  \**************************************************/
/*! exports provided: Mail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mail", function() { return Mail; });
var Mail = /** @class */ (function () {
    function Mail(id, sender, senderPhoto, senderMail, subject, date, body, attachment, attachments, unread, sent, starred, draft, trash, selected) {
        this.id = id;
        this.sender = sender;
        this.senderPhoto = senderPhoto;
        this.senderMail = senderMail;
        this.subject = subject;
        this.date = date;
        this.body = body;
        this.attachment = attachment;
        this.attachments = attachments;
        this.unread = unread;
        this.sent = sent;
        this.starred = starred;
        this.draft = draft;
        this.trash = trash;
        this.selected = selected;
    }
    return Mail;
}());



/***/ })

}]);
//# sourceMappingURL=pages-estadisticas-estadisticas-module.js.map