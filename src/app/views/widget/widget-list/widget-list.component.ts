import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {WidgetService} from '../../../services/widget.service.client';


@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgets = [];

  constructor(private widgetService: WidgetService, private route: ActivatedRoute, private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
      }
    );
    // this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
    // console.log(this.widgets);

    this.widgetService.findWidgetsByPageId(this.pageId)
      .subscribe(
        (data: any) => {
          this.widgets = data;
        }
      );
  }

  safe(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  profile() {
    this.router.navigate(['/user', this.userId]);
  }

  editWidget(id: string) {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', id]);
  }

  widgetList() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  }

  newWidget() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', 'new']);
  }

  returnToPageList() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
  }

  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        (data) => console.log(data)
      );
  }

}
