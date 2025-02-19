//src/test/pages/discount.ts
export class Discount {

    constructor(public readonly total: number,
                public readonly discount: number,
                public readonly unit: string) {
    }
  
    perform() {
      let amount = this.total
      if(this.unit === '%') {
        amount = this.total - ( this.total * this.discount ) / 100
      }else {
        amount = this.total - this.discount
      }
      return amount
    }
  }