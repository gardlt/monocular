/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Shared
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { ChartsService } from '../shared/services/charts.service';

// Components
import { ChartDetailsComponent } from './chart-details.component';
import { ChartItemComponent } from '../chart-item/chart-item.component';
import { PanelComponent } from '../panel/panel.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { LoaderComponent } from '../loader/loader.component';
import { ChartDetailsVersionsComponent } from './chart-details-versions/chart-details-versions.component';
import { ChartDetailsInfoComponent } from './chart-details-info/chart-details-info.component';
import { ChartDetailsReadmeComponent } from './chart-details-readme/chart-details-readme.component';
import { ChartDetailsUsageComponent } from './chart-details-usage/chart-details-usage.component';

// Stub
const chartsServiceStub = {
  getChart: {
    "data": {
      "attributes": {
        "description": "Testing the chart",
        "home": "helm.sh",
        "keywords": [
          "artifactory"
        ],
        "maintainers": [
          {
            "email": "test@example.com",
            "name": "Test"
          }
        ],
        "name": "test",
        "repo": "incubator",
        "sources": [
          "https://github.com/"
        ]
      },
      "id": "incubator/test",
      "relationships": {
        "latestChartVersion": {
          "data": {
            "created": "2017-02-13T04:33:57.218083521Z",
            "digest": "eba0c51d4bc5b88d84f83d8b2ba0c5e5a3aad8bc19875598198bdbb0b675f683",
            "icons": [
              {
                "name": "160x160-fit",
                "path": "/assets/incubator/test/4.16.0/logo-160x160-fit.png"
              }
            ],
            "readme": "/assets/incubator/test/4.16.0/README.md",
            "urls": [
              "https://kubernetes-charts-incubator.storage.googleapis.com/test-4.16.0.tgz"
            ],
            "version": "4.16.0"
          },
          "links": {
            "self": "/v1/charts/incubator/test/versions/4.16.0"
          }
        }
      },
      "type": "chart"
    }
  }
};

describe('ChartDetailsComponent', () => {
  let component: ChartDetailsComponent;
  let fixture: ComponentFixture<ChartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MaterialModule.forRoot() ],
      declarations: [
        ChartDetailsComponent,
        ChartDetailsVersionsComponent,
        ChartDetailsInfoComponent,
        ChartDetailsReadmeComponent,
        ChartDetailsUsageComponent,
        LoaderComponent,
        PanelComponent,
        HeaderBarComponent,
        ChartItemComponent,
        TruncatePipe
      ],
      providers: [
        { provide: ChartsService, useValue: chartsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
