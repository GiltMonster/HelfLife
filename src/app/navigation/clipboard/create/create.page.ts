import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CreateFormComponent } from "../../../components/clipboard/create-form/create-form.component";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CreateFormComponent]
})
export class CreatePage implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    // Com o roteamento no Ionic, o hook de ciclo de vida OnInit
    // pode não ser chamado consistentemente.
    console.log("CreatePage - OnInit");
  }

  ngOnDestroy() {
    // Da mesma forma, este método pode não ser disparado consistentemente
    // quando você navega para fora do componente.
    console.log("CreatePage - OnDestroy");
  }

  // No entanto, o Ionic fornece hooks de ciclo de vida próprios que
  // serão disparados consistentemente durante a navegação de rotas.

  ionViewWillEnter() {
    // Este método será chamado toda vez que o componente for navegado para.
    // Na inicialização, tanto ngOnInit quanto este método serão chamados.
    console.log("CreatePage - ViewWillEnter");
  }

  ionViewWillLeave() {
    // Este método será chamado toda vez que o componente for navegado para fora.
    // Seria um bom método para chamar código de limpeza, como cancelar inscrições de observáveis.
    console.log("CreatePage - ViewWillLeave");
  }

}
