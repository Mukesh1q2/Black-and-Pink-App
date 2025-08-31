
export interface Product {
  id: string;
  name: string;
  price: string;
  availability: 'In Stock' | 'Sold Out';
  imageUrl: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
