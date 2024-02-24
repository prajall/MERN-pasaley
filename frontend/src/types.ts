export type CardComponent = {
  title: string,
  description: string,
  content?: React.ReactNode,
  footer: string
};

export type AlertComponent = {
  message:string
}

export type ProductType = {
  _id: string;
  name: string;
  rate: [
    {
      price: number;
      quantity: string;
    }
  ];
  company: string;
};

export type ProductArray = ProductType[];