import {
  Component,
  OnInit,
  QueryList,
  ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {SideMenuModel, SideMenuService} from "../../services/side-menu/side-menu.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ]
})
export class SideMenuComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('detailRows', { read: ViewContainerRef })
  detailRowHosts: QueryList<ViewContainerRef>;

  columnsToDisplay = ['label'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;
  tabs: SideMenuModel[] = [];

  constructor(private sideMenuService: SideMenuService) {}

  ngOnInit() {
    this.tabs = this.sideMenuService.getSideMenuTabs();
    console.log(this.tabs)
  }

  loadComponent(element: any, index: number): void {
    const target = this.detailRowHosts.toArray()[index];
    target.clear();
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  getChildRowsForParentRow(element: any) {
    console.log('element', element);
  }

  getLabel(element: any) {
    console.log('element', element);
  }


}
