import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/interface/produto';
import { AlertasService } from 'src/app/services/alertas.service';
import { ProdutosFirestoreService } from 'src/app/services/produtos-firestore.service';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.scss']
})
export class ListagemProdutosComponent implements OnInit {

  produtos: IProduto[] = [];

  constructor(
    private produtoService: ProdutosService, 
    // private produtoFirestore: ProdutosFirestoreService,
    private alertaService: AlertasService
  ) { }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listar().subscribe(
      dados => {this.produtos = dados; console.log(dados);
    });
  }

  // DELETAR NO FIRESTORE
  // deletar(produto: IProduto) {
  //   this.produtoService.apagar(produto.id).subscribe( removido => {
  //     this.alertaService.alertaSucesso('Produto removido com sucesso');
  //     const indxProduto = this.produtos.findIndex( c => c.id === produto.id);
      
  //     if (indxProduto > -1) {
  //       this.produtos.splice(indxProduto, 1);
  //     } 
  //   })
  // }

  deletar(produto: IProduto) {
    const id = produto.id;
    this.produtoService.excluirProduto(id).subscribe(() => {
      this.alertaService.alertaSucesso('Produto removido com sucesso');
      this.ngOnInit();
    });
  }
}
