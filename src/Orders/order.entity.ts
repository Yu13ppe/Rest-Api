import { User } from '../Users/users.entity';
import { Product } from '../Products/products.entity';

export class Order {
  id: number;
  orderNumber: string;
  orderDate: Date;
  user: User;
  products: Product[];
}
