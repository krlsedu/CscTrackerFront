import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashBoardComponent} from "./components/dash-board/dash-board.component";
import {GanttComponent} from "./components/gantt/gantt.component";

const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'gantt', component: GanttComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
