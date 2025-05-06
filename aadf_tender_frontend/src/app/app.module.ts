import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


// Components
import { AppComponent } from './app.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { NewTenderComponent } from "./demo/components/new-tender/new-tender.component";
import { ActiveTendersComponent } from "./demo/components/active-tenders/active-tenders.component";
import { CompletedTendersComponent } from "./demo/components/completed-tenders/completed-tenders.component";
import { PendingReviewsComponent } from "./demo/components/pending-reviews/pending-reviews.component";
import { EvaluationDashboardComponent } from "./demo/components/evaluation-dashboard/evaluation-dashboard.component";
import { GenerateReportsComponent } from "./demo/components/generate-reports/generate-reports.component";
import { VendorDirectoryComponent } from "./demo/components/vendor-directory/vendor-directory.component";
import { SubmissionsComponent } from "./demo/components/submissions/submissions.component";
import { MyOffersComponent } from "./demo/components/my-offers/my-offers.component";
import { SubmittedOffersComponent } from "./demo/components/submitted-offers/submitted-offers.component";

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { FullCalendarModule } from "@fullcalendar/angular";

// PrimeNG Modules
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ListboxModule } from "primeng/listbox";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { ProgressBarModule } from "primeng/progressbar";
import { RippleModule } from "primeng/ripple";
import { SliderModule } from "primeng/slider";
import { StepsModule } from "primeng/steps";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";


// Services
import { HttpInterceptorService } from "./demo/service/http-interceptor.service";
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import {UsersComponent} from "./demo/components/users/users.component";
import {UserDialogComponent} from "./demo/components/users/user-dialog/user-dialog.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {DividerModule} from "primeng/divider";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ChatComponent} from "./demo/components/chat/chat.component";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {AvatarModule} from "primeng/avatar";
import {ChatbotComponent} from "./demo/components/chatbot/chatbot.component";
import {SidebarModule} from "primeng/sidebar";
import {AiService} from "./demo/service/ai.service";
import {environment} from "../environments/environment";
import {MockChatServiceService} from "./demo/service/mock-chat-service.service";

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        NewTenderComponent,
        ActiveTendersComponent,
        CompletedTendersComponent,
        PendingReviewsComponent,
        EvaluationDashboardComponent,
        GenerateReportsComponent,
        VendorDirectoryComponent,
        SubmissionsComponent,
        MyOffersComponent,
        SubmittedOffersComponent,
        UsersComponent,
        UserDialogComponent,
        ChatComponent,
        ChatbotComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        FullCalendarModule,
        ChipModule,
        ListboxModule,
        ChipsModule,
        StepsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputNumberModule,
        CalendarModule,
        CommonModule,
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        FullCalendarModule,
        // PrimeNG Modules
        AccordionModule,
        AutoCompleteModule,
        BadgeModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        ChartModule,
        ChipModule,
        ChipsModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        InputTextareaModule,
        ListboxModule,
        PaginatorModule,
        PanelModule,
        ProgressBarModule,
        RippleModule,
        SliderModule,
        StepsModule,
        TableModule,
        TabViewModule,
        TagModule,
        TimelineModule,
        ToastModule,
        TooltipModule,
        InputSwitchModule,
        DividerModule,
        TooltipModule,
        CommonModule,
        ScrollPanelModule,
        AvatarModule,
        SidebarModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
        {
            provide: AiService,
            useClass: environment.useMockAiService ? MockChatServiceService : AiService
        },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        DialogService,
        ConfirmationService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

