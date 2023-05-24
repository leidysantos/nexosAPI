import {Component, OnInit} from '@angular/core';
import {MarketplaceService} from './services/marketplace.service';
import * as XLSX from 'xlsx';

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
    { id: 1, nombre: 'Producto 1', precio: '$250.000', descripcion: 'Descripción 1', url: '/assets/images/img1.png', selected: false},
    { id: 2,nombre: 'Producto 2', precio: '$480.000', descripcion: 'Descripción 2', url: '/assets/images/img2.png', selected: false},
    { id: 3,nombre: 'Producto 3', precio: '$500.000', descripcion: 'Descripción 3', url: '/assets/images/img3.png', selected: false},
  ];
  listaCarrito: any[] = [];
  productoRepetido: any;
  cantProductos: any;

  constructor(
    private service: MarketplaceService,
  ) { }

  ngOnInit(): void {
    this.listarProductos();
    this.listarDocs();
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
    const index = this.listaCarrito.findIndex(producto => producto.id === prod.id);
    if (index !== -1) {
      // Está agregando un producto repetido, sumar cantidad
    } else {
      this.listaCarrito.push(prod);
    }
    this.cantProductos = this.listaCarrito.length;
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
    this.cantProductos = this.listaCarrito.length;
  }

  exportSelectedProducts(format: string): void {
    // Filtrar los productos seleccionados
    const selectedProducts = this.productos.filter(product => product.selected);

    // Convertir los productos en un arreglo de datos compatible con el formato seleccionado
    let exportData: any[] = [];
    selectedProducts.forEach(product => {
      exportData.push([product.id, product.nombre, product.precio, product.descripcion]);
    });

    // Crear el nombre del archivo de acuerdo al formato seleccionado
    const fileName = `listaProductos.${format}`;

    // Exportar los datos al formato seleccionado
    if (format === 'xls' || format === 'xlsx') {
      const worksheet = XLSX.utils.aoa_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
      const excelData = XLSX.write(workbook, { bookType: format, type: 'array' });
      this.downloadFile(excelData, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
  }

  downloadFile(data: any, fileName: string, fileType: string): void {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  validarCheck(index: any) {
    this.productos[index].selected = true;
    console.log(this.productos);
  }
}
