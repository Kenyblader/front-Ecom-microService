export class Product {
    private _id?: number;
    private _name!: string;
    private _description?: string;
    private _price!: number;
    private _stock!: number;
  
    constructor(data?: Partial<Product>) {
      if (data) {
        this._id = data.id;
        this._name = data.name!;
        this._description = data.description;
        this._price = data.price!;
        this._stock = data.stock!;
      }
    }
  
    // ID
    public get id(): number | undefined {
      return this._id;
    }
  
    public set id(value: number | undefined) {
      this._id = value;
    }
  
    // Name
    public get name(): string {
      return this._name;
    }
  
    public set name(value: string) {
      this._name = value;
    }
  
    // Description
    public get description(): string | undefined {
      return this._description;
    }
  
    public set description(value: string | undefined) {
      this._description = value;
    }
  
    // Price
    public get price(): number {
      return this._price;
    }
  
    public set price(value: number) {
      this._price = value;
    }
  
    // Stock
    public get stock(): number {
      return this._stock;
    }
  
    public set stock(value: number) {
      this._stock = value;
    }
  }
  