import { ICatalogRepository } from "../interface/catalogInterface.repository";

export class CatalogService {
   
    private _repository : ICatalogRepository


     constructor(repository : ICatalogRepository) {
        this._repository=repository
     }

    async createProduct(input : any) {
      const data = await this._repository.create(input)
      if(!data.id) {
         throw new Error("unable to create product");
      }
      return data;
    }
    async updateProduct(input : any) {
   const data = await this._repository.update(input)

   if(!data.id) {
      throw new Error("unable to update product");
   }
   // emit event to update in Elastic Search
   return data;
    }

    //instead of this , will get products from Elastic search
    
    async getProducts(limit:number , offset : number) {
     const products = await this._repository.find(limit,offset)

     return products
    }
    async getProduct(id:number) {
      const product = await this._repository.findOne(id);
      return product
    }
     async deleteProduct(id:number) {
        const response = await this._repository.delete(id)
        return response
     }
}