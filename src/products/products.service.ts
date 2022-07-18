import {Injectable,NotFoundException} from '@nestjs/common'
import {Product} from './product.model'

@Injectable()
export class ProductsService {
    private products: Product[] =[];

    insertProduct(title: string,description: string,price: number):string{
        const prodId=Math.random().toString();

        const newProduct = new Product(prodId,title, description, price);
        this.products.push(newProduct);

        return prodId;
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(id:string){
        const product = this.findProduct(id)[0];
        return {...product}
    }

    updateProduct(productId,product:{title:string,description:string,price:number}){
        const [productFound,index] = this.findProduct(productId);

        const updateProduct={...productFound}

        if(product.title){
            updateProduct.title=product.title
        }
        if(product.description){
            updateProduct.description=product.description
        }
        if(product.price){
            updateProduct.price=product.price
        }

        this.products[index]=updateProduct
    }

    private findProduct(id:string):[Product,number]{
        const productIndex = this.products.findIndex(product => product.id == id);
        const product= this.products[productIndex]
        if(!product){
            throw new NotFoundException('Could not find  product.');
        }
        return [product,productIndex];
    }

    deleteProduct(id: string){
        const [productFound,index]=this.findProduct(id);
        this.products.splice(index,1);
    }
}