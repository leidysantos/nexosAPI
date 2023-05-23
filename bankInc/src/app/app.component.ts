import {Component, OnInit} from '@angular/core';
import {MarketplaceService} from './services/marketplace.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bank Inc';
  /**
   * @author Leidy Caterine Santos Alavrez - <leidysantos103@gmail.com>
   * @generalDescription Se declara un arreglo de objetos de tipo producto, con nombre, precio y descripción
   * @date 23/08/2023
   */
  productos = [
    { nombre: 'Producto 1', precio: 25.000, descripcion: 'Descripción 1' },
    { nombre: 'Producto 2', precio: 48.000, descripcion: 'Descripción 2' },
    { nombre: 'Producto 3', precio: 50.000, descripcion: 'Descripción 3' },
  ];
  constructor(
    private service: MarketplaceService,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.listarProductos();
    this.listarDocs();
  }

  /**
   * @method Listar productos
   * @author Leidy Caterine Santos Alavrez - <leidysantos103@gmail.com>
   * @generalDescription Se consume la API para listar los productos
   * @date 23/08/2023
   */
  listarProductos(){
    this.service.productos().subscribe((resp: any) => {
      console.log(resp);
    });
  }

  /**
   * @method Listar docs
   * @author Leidy Caterine Santos Alavrez - <leidysantos103@gmail.com>
   * @generalDescription Se consume la API para listar los docs
   * @date 23/08/2023
   */
  listarDocs(){
    this.service.docs().subscribe((resp: any) => {
      console.log(resp);
    });
  }



}
