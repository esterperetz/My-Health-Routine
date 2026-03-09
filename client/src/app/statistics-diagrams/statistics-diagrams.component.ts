import { Component, OnInit } from '@angular/core';
import colorLib from '@kurkle/color';
import { ngxCsv } from 'ngx-csv';
import { CartService } from '../cart.service';
import { Chart, ChartDataset, registerables, ChartData } from 'chart.js';
import { Product, ProductsService } from '../products.service';
@Component({
  selector: 'app-statistics-diagrams',
  templateUrl: './statistics-diagrams.component.html',
  styleUrls: ['./statistics-diagrams.component.css'],
})
export class StatisticsDiagramsComponent implements OnInit {
  public data: Object[];
  public xAxis: Object;
  public yAxis: Object;
  chartTotalSales: any;
  chartMostSalesProduct: any;
  chartByCategory: any;
  chartByAge: any;
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    Chart.defaults.font.size = 20;
    this.getStatistics();
    this.chartTotalSales = document.getElementById('Total saled');
    this.chartMostSalesProduct = document.getElementById('Most saled product');
    this.chartByCategory = document.getElementById('category');
    this.chartByAge = document.getElementById('age');
    Chart.register(...registerables);
  }
  myMapMostSales = new Map();
  myMapBestSellingItem = new Map();
  myMapCategory = new Map();
  quantity: any[] = [];
  getStatistics() {
    this.productService.getStatistics().subscribe({
      next: (v) => {
        let counter = 0;

        for (let i = 0; i < v.length; i++) {
          counter = 0;
          for (let j = 0; j < v[i].timeArr.length; j++) {
            counter += v[i].timeArr[j].quantity;
            const date = new Date(v[i].timeArr[j].date);
            const dateFormat = `${date.getDate()}-${
              date.getUTCMonth() + 1
            }-${date.getFullYear()}`;
            if (this.myMapMostSales.has(dateFormat)) {
              this.myMapMostSales.set(
                dateFormat,
                this.myMapMostSales.get(dateFormat) + v[i].timeArr[j].quantity
              );
            } else {
              this.myMapMostSales.set(dateFormat, v[i].timeArr[j].quantity);
            }
          }
          this.myMapBestSellingItem.set(v[i].product.name, counter);
          if (this.myMapCategory.has(v[i].product.category)) {
            this.myMapCategory.set(
              v[i].product.category,
              this.myMapCategory.get(v[i].product.category) + counter
            );
          } else {
            this.myMapCategory.set(v[i].product.category, counter);
          }
        }
        console.log(v);
        this.loadChartByCategory();
        this.loadChart();
        this.loadChartMostSalesProduct();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  loadChart(): void {
    new Chart(this.chartTotalSales, {
      type: 'line',
      data: {
        datasets: [
          {
            data: Array.from(this.myMapMostSales.values()),
            label: 'Product name',
            backgroundColor: '#007bff',
            borderColor: '#007bff',
          },
        ],
        labels: [...this.myMapMostSales.keys()],
      },
      options: {
        scales: {
          x: {
            grid: {
              offset: true,
            },
          },
        },
      },
    });
  }

  loadChartMostSalesProduct(): void {
    new Chart(this.chartMostSalesProduct, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: Array.from(this.myMapBestSellingItem.values()),
            label: 'Product name',
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#8e5ea2',
            ],
            borderColor: '#007bff',
          },
        ],
        labels: [...this.myMapBestSellingItem.keys()],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 24,
              },
            },
          },
        },
      },
    });
  }
  loadChartByCategory(): void {
    new Chart(this.chartByCategory, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: Array.from(this.myMapCategory.values()),
            label: 'Product name',
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              '#8e5ea2',
            ],
            borderColor: '#007bff',
          },
        ],
        labels: [...this.myMapCategory.keys()],
      },
      options: {},
    });
  }
}
