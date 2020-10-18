import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy} from "@angular/core";
import {LabourStatsService} from '../shared/services/labourStats.service'
import {FormControl, FormGroup} from '@angular/forms';
import {merge, Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from '@angular/material/sort';
import {Provider} from '../shared/interfaces/provider';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  columnDefinitions: any[];
  sortedData: Provider[];
  providers: Provider[];
  total: Provider;
  directContractors: Provider;
  getLabourStatsSub: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private labourStatsService: LabourStatsService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {

    this.getLabourStatsSub = this.labourStatsService.getLabourStats().subscribe(data => {
      this.providers = data[0].providers;
      this.total = data[0].total[0];
      this.directContractors = data[0].directContractors[0];
      this.providers.push(this.directContractors);
      this.dataSource = new MatTableDataSource(this.providers);
      this.sortedData = this.providers.slice();
      this.columnDefinitions = JSON.parse(localStorage.getItem('columnDefinitions')) ? JSON.parse(localStorage.getItem('columnDefinitions')) : [

        {def: 'name', label: 'Payroll Provider', hide: this.name.value},
        {def: 'workerCount', label: 'Worker', hide: this.workerCount.value},
        {def: 'complianceStats', label: 'Compliance Score', hide: this.complianceStats.value},
        {def: 'grossPayTotal', label: 'Gross Pay', hide: this.grossPayTotal.value},
        {def: 'payrollAdminTotal', label: 'Payroll Admin', hide: this.payrollAdminTotal.value},
        {def: 'labourCostTotal', label: 'Labour Cost', hide: this.labourCostTotal.value},
        {def: 'workForce', label: 'Work Force', hide: this.workForce.value},
      ]
      this.dataSource.sort = this.sort;
    })
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(false),
    workerCount: new FormControl(false),
    complianceStats: new FormControl(false),
    grossPayTotal: new FormControl(false),
    payrollAdminTotal: new FormControl(false),
    labourCostTotal: new FormControl(false),
    workForce: new FormControl(false),
  });

  name = this.form.get('name');
  workerCount = this.form.get('workerCount');
  complianceStats = this.form.get('complianceStats');
  grossPayTotal = this.form.get('grossPayTotal');
  payrollAdminTotal = this.form.get('payrollAdminTotal');
  labourCostTotal = this.form.get('labourCostTotal');
  workForce = this.form.get('workForce');

  getDisplayedColumns(): string[] {
    if (this.columnDefinitions && this.columnDefinitions.length) {
      return this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
    }
  }

  dataSource: MatTableDataSource<Provider>;

  ngAfterViewInit() {
    this.initiateColumns();
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  initiateColumns() {
    let o1: Observable<boolean> = this.name.valueChanges;
    let o2: Observable<boolean> = this.workerCount.valueChanges;
    let o3: Observable<boolean> = this.complianceStats.valueChanges;
    let o4: Observable<boolean> = this.grossPayTotal.valueChanges;
    let o5: Observable<boolean> = this.payrollAdminTotal.valueChanges;
    let o6: Observable<boolean> = this.labourCostTotal.valueChanges;
    let o7: Observable<boolean> = this.workForce.valueChanges;

    merge(o1, o2, o3, o4, o5, o6, o7).subscribe(v => {

      this.columnDefinitions.map((col, index) => {
        col.hide = this.form.get([col['def']]).value;
      });
      localStorage.setItem('columnDefinitions', JSON.stringify(this.columnDefinitions));
    });
  }


  sortData(sort: MatSort) {
    if (sort.active === "name") {
      const index = this.providers.findIndex(x => x.name === "Direct Contractors");
      if (index !== -1) {
        this.providers.splice(index, 1)
        this.providers.unshift(this.directContractors);
        this.dataSource = new MatTableDataSource(this.providers);
      }
    } else {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {
    if (this.getLabourStatsSub) {
      this.getLabourStatsSub.unsubscribe();
    }
  }
}
