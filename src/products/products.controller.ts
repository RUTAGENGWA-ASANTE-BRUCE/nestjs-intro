import { Controller,Post,Body,Get,Param,Patch,Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Post()
    addProduct(
        //@Body() completeBody:{title:string,description:string,price:number}
        @Body('title') prodTitle:string,@Body('description') prodDesc:string,@Body('price') prodPrice:number
        ):{id:string}{
       const generatedId= this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
       return {id:generatedId};
    }

    @Get()
    getAllProducts(){
        const products=this.productsService.getProducts();
        return {products:products};
    }
    @Get(':id')
    getProduct(@Param('id') prodId:string){
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId:string,@Body() product:{title:string,description:string,price:number}){
        this.productsService.updateProduct(prodId,product);
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId:string){
        this.productsService.deleteProduct(prodId);
    }
    
}