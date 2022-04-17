import { Component, OnInit } from '@angular/core';
import  Chart  from 'chart.js/auto';
import { ChartData } from 'src/app/_models/apiResponseModels/chart-data';
import { OverView } from 'src/app/_models/apiResponseModels/overview-data';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
import { UtilsService } from 'src/app/_services/_utils_service/utils.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  chartData:ChartData ;
  overviewData:OverView;
  date:Date;
  constructor(private utilService: UtilsService, private articleService:ArticleService) {

  }

  ngOnInit(): void {
    this.getOverviewData();
    this.getChartData();
    }
  getChartData(){
    this.date = new Date();
    this.articleService.getChartData(this.date.getFullYear()).subscribe(
      (data:any)=>{
        this.chartData = new ChartData();
        this.chartData.apr = data.Data.apr;
        this.chartData.aug= data.Data.aug;
        this.chartData.dec= data.Data.dec;
        this.chartData.feb= data.Data.feb;
        this.chartData.jan= data.Data.jan;
        this.chartData.jul= data.Data.jul;
        this.chartData.jun= data.Data.jun;
        this.chartData.mar= data.Data.mar;
        this.chartData.may= data.Data.may;
        this.chartData.nov= data.Data.nov;
        this.chartData.oct= data.Data.oct;
        this.chartData.sep= data.Data.sep;
        this.createChart();
      })

  }
  getOverviewData(){
    this.utilService.getOverviewData().subscribe(
      (data:any)=>{
        this.overviewData = new OverView()
        this.overviewData.ApprovedContributions =data.Data.ApprovedContributions;
        this.overviewData.DeactivationRequest =data.Data.DeactivationRequest;
        this.overviewData.PendingContributions=data.Data.PendingContributions;
        this.overviewData.TotalArticles=data.Data.TotalArticles;
        this.overviewData.TotalContributions=data.Data.TotalContributions;
        this.overviewData.TotalUsers=data.Data.TotalUsers;
        this.overviewData.ApprovedContributionsIncrease = data.Data.ApprovedContributionsIncrease
        this.overviewData.ContributionsIncrease = data.Data.ContributionsIncrease
        this.overviewData.PendingContributionsIncrease = data.Data.PendingContributionsIncrease
        this.overviewData.ArticleIncrease = data.Data.ArticleIncrease
        this.overviewData.UserIncrease = data.Data.UserIncrease
      }
    )
  }

  createChart(){
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
          datasets: [{
              label: 'Articles Published',
              data: [0, this.chartData.feb, this.chartData.mar, this.chartData.apr, this.chartData.may, this.chartData.jun,this.chartData.jul, this.chartData.aug, this.chartData.sep, this.chartData.oct, this.chartData.nov, this.chartData.dec],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255,1)',
                  'rgba(255, 159, 64, 1)',

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }

}
