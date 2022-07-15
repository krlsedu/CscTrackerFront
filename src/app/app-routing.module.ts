import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashBoardComponent} from "./components/dash-board/dash-board.component";
import {GanttComponent} from "./components/gantt/gantt.component";
import {NotificationComponent} from "./components/notification/notification.component";

const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'gantt', component: GanttComponent },
  { path: 'notifications', component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
