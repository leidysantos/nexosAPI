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
    { id: 1, nombre: 'Producto 1', precio: '$250.000', descripcion: 'Descripción 1', url: '/assets/images/img1.png'},
    { id: 2,nombre: 'Producto 2', precio: '$480.000', descripcion: 'Descripción 2', url: '/assets/images/img2.png'},
    { id: 3,nombre: 'Producto 3', precio: '$500.000', descripcion: 'Descripción 3', url: '/assets/images/img3.png'},
  ];
  listaCarrito: any[] = [];
  constructor(
    private service: MarketplaceService,
  ) { }

  ngOnInit(): void {
    this.listarProductos();
    this.listarDocs();
    console.log(this.listaCarrito);
  }

  /**
   * @method Listar productos
   * @author Leidy Caterine Santos Alvarez - <leidysantos103@gmail.com>
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
   * @author Leidy Caterine Santos Alvarez - <leidysantos103@gmail.com>
   * @generalDescription Se consume la API para listar los docs
   * @date 23/08/2023
   */
  listarDocs(){
    this.service.docs().subscribe((resp: any) => {
      console.log(resp);
    });
  }

  /**
   * @method Agregar producto al carrito
   * @author Leidy Caterine Santos Alvarez - <leidysantos103@gmail.com>
   * @generalDescription Se agregan los productos seleccionados en una lista denominada: listaCarrito
   * @date 23/08/2023
   */
  agregarProducto(prod: any) {
    this.listaCarrito.push(prod);
  }

  /**
   * @method Eliminar producto del carrito
   * @author Leidy Caterine Santos Alvarez - <leidysantos103@gmail.com>
   * @generalDescription Se eliminan los productos seleccionados de la lista del carrito
   * @date 23/08/2023
   */

  eliminar(id:any) {
    const index = this.listaCarrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
      this.listaCarrito.splice(index, 1);
    }
  }
}
