import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelezionaprogettoPage} from "../selezionaprogetto/selezionaprogetto";
import {Headers, Http, RequestOptions} from "@angular/http";
import { Chart } from 'chart.js';
import {WelcomePage} from "../welcome/welcome";


/**
 * Generated class for the HomeProgettoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-progetto',
  templateUrl: 'home-progetto.html',
})
export class HomeProgettoPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('doughnut1Canvas') doughnut1Canvas;

  private progetto: { costo: string, ricavo: string, giorni: string};
  private ricavoTask: { task: string, ricavo: string}[];
  private relazioneTask: { assegnati: string, completati: string}[];

  nomeProgetto: string;
  codiceProgetto: string;
  userPm: string;
  arr: number[]=[];
  labelTask: string[]=[];
  arrTask: number[]=[];
  arrRelTask: number[]=[];

  barChart: any;
  doughnutChart: any;
  doughnut1Chart: any;
  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: Http) {

      this.storage.get('username').then((name) => {
         this.userPm = name;
      });

    this.storage.get('progetto').then((progetto) => {
      this.nomeProgetto = progetto;
    });

    this.storage.get('codProgetto').then((codice) => {
      this.codiceProgetto = codice;
      this.chiamataPost();
      this.chiamataPostTask();
      this.chiamataPostRelTask();
    });


    this.nomeProgetto = navParams.get("nome");
    this.codiceProgetto = navParams.get("codice");

    setTimeout(this.checkProgettoSelezionato(), 1000);

  }

    chiamataPost(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            codice: this.codiceProgetto
        }

        this.http.post("http://waspunisa.altervista.org/apiSpeseERicaviGiornalieri.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.progetto = data;
                this.arr.push(parseInt(this.progetto.costo));
                this.arr.push(parseInt(this.progetto.ricavo));
                this.doughnutChart.update();
                //console.log("Giorni: " + this.progetto.giorni);
                //console.log(this.doughnutChart.data);
                //console.log(this.progetto);
            }, error => {
                console.log(error);// Error getting the data
            });
    }

    chiamataPostTask(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            codice: this.codiceProgetto
        }

        this.http.post("http://waspunisa.altervista.org/apiRicavoDaiTask.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.ricavoTask = data;
                for (var i in this.ricavoTask) {
                    this.arrTask.push(parseInt(this.ricavoTask[i].ricavo));
                    this.labelTask.push(this.ricavoTask[i].task);
                }
                this.barChart.update();
                //console.log(this.barChart.data);
            }, error => {
                console.log(error);// Error getting the data
            });
    }

    chiamataPostRelTask(){
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        let options = new RequestOptions({ headers:headers});

        let postParams = {
            codice: this.codiceProgetto
        }

        this.http.post("http://waspunisa.altervista.org/apiRelazioneTaskCompletatiAssegnati.php", postParams, options).map(res => res.json())
            .subscribe(data => {
                this.relazioneTask = data;
                for (var i in this.relazioneTask) {
                    this.arrRelTask.push(parseInt(this.relazioneTask[i].assegnati));
                    this.arrRelTask.push(parseInt(this.relazioneTask[i].completati));
                    //console.log("ass: " + this.relazioneTask[i].assegnati);
                    //console.log("com: " + this.relazioneTask[i].completati);
                }
                this.doughnut1Chart.update();
                //console.log(this.doughnut1Chart.data);
            }, error => {
                console.log(error);// Error getting the data
            });
    }


    ionViewDidEnter(){


    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.labelTask,
        datasets: [{
          label: 'Ricavo',
          data: this.arrTask,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }

    });


    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Spese", "Ricavi"],
        datasets: [{
          label: 'Spese/Ricavi',
          data: this.arr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
          ]
        }]
      }

    });

        this.doughnut1Chart = new Chart(this.doughnut1Canvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Attivi", "Completati"],
                datasets: [{
                    label: 'Attivi/Completati',
                    data: this.arrRelTask,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                    ]
                }]
            }

        });



   /* this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        datasets: [
          {
            label: "Spese",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255,0,0,0.4)",
            borderColor: "rgba(255,0,0,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255,0,0,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,0,0,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1500, 1700, 1800, 1300, 2000, 1230, 1500, 1550, 1600, 1340, 1500, 2300],
            spanGaps: false,
          },
          {




            label: "Ricavi",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1700, 1800, 1850, 1500, 1700, 1300, 1600, 1600, 1500, 1400, 1700, 1800],
            spanGaps: false,
          }
        ]
      }

    });*/


  }


  checkProgettoSelezionato(){
    this.storage.get('progetto').then((progetto) => {
      if (progetto == null && this.nomeProgetto == null) {
        console.log("NON HAI SCELTO");
        this.navCtrl.setRoot(SelezionaprogettoPage);
      } else {
        this.nomeProgetto = progetto;
        console.log("Progetto aperto: "+progetto);
      }
    });
  }


}
