// Printful API integration utilities

const PRINTFUL_API_BASE = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

export interface PrintfulProduct {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  image: string;
  variant_count: number;
  currency: string;
  price: string;
  in_stock: boolean;
}

export interface PrintfulVariant {
  id: number;
  product_id: number;
  name: string;
  size: string;
  color: string;
  color_code: string;
  image: string;
  price: string;
  in_stock: boolean;
}

export interface PrintfulOrderItem {
  variant_id: number;
  quantity: number;
  retail_price?: string;
}

export interface PrintfulRecipient {
  name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
}

export interface PrintfulOrder {
  external_id: string;
  shipping: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  retail_costs?: {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    tax: string;
    total: string;
  };
  gift?: {
    subject: string;
    message: string;
  };
  packing_slip?: {
    email: string;
    phone?: string;
    message?: string;
  };
}

export interface PrintfulShippingRate {
  id: string;
  name: string;
  rate: string;
  currency: string;
  minDeliveryDays: number;
  maxDeliveryDays: number;
}

class PrintfulAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) {
    const url = `${PRINTFUL_API_BASE}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Printful API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Get all products from Printful
  async getProducts(): Promise<{ result: { items: PrintfulProduct[] } }> {
    return this.makeRequest('/products');
  }

  // Get specific product details
  async getProduct(productId: number): Promise<{ result: PrintfulProduct }> {
    return this.makeRequest(`/products/${productId}`);
  }

  // Get product variants (sizes, colors, etc.)
  async getProductVariants(productId: number): Promise<{ result: { variants: PrintfulVariant[] } }> {
    return this.makeRequest(`/products/${productId}`);
  }

  // Calculate shipping rates
  async calculateShipping(recipient: PrintfulRecipient, items: PrintfulOrderItem[]): Promise<{ result: PrintfulShippingRate[] }> {
    return this.makeRequest('/shipping/rates', 'POST', {
      recipient,
      items,
    });
  }

  // Create an order in Printful
  async createOrder(order: PrintfulOrder): Promise<{ result: any }> {
    return this.makeRequest('/orders', 'POST', order);
  }

  // Get order status
  async getOrder(orderId: string): Promise<{ result: any }> {
    return this.makeRequest(`/orders/${orderId}`);
  }

  // Cancel an order
  async cancelOrder(orderId: string): Promise<{ result: any }> {
    return this.makeRequest(`/orders/${orderId}`, 'DELETE');
  }
}

// Create a singleton instance
let printfulAPI: PrintfulAPI | null = null;

export function getPrintfulAPI(): PrintfulAPI {
  if (!PRINTFUL_API_KEY) {
    throw new Error('PRINTFUL_API_KEY environment variable is not set');
  }
  
  if (!printfulAPI) {
    printfulAPI = new PrintfulAPI(PRINTFUL_API_KEY);
  }
  
  return printfulAPI;
}

// Helper function to create an order from our product data
export function createPrintfulOrder(
  product: any,
  selectedSize: string,
  selectedColor: string,
  quantity: number,
  customerInfo: {
    name: string;
    email: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone?: string;
  },
  retailPrice?: string
): PrintfulOrder {
  // This is a simplified version - you'll need to map your product variants to Printful variant IDs
  // For now, we'll use placeholder data that you'll need to update based on your Printful catalog
  
  const order: PrintfulOrder = {
    external_id: `optimalsports_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    shipping: 'STANDARD', // You might want to make this configurable
    recipient: {
      name: customerInfo.name,
      email: customerInfo.email,
      address1: customerInfo.address1,
      address2: customerInfo.address2,
      city: customerInfo.city,
      state_code: customerInfo.state,
      country_code: customerInfo.country,
      zip: customerInfo.zip,
      phone: customerInfo.phone,
    },
    items: [
      {
        variant_id: 1, // This needs to be mapped to the actual Printful variant ID
        quantity,
        retail_price: retailPrice,
      }
    ],
    retail_costs: retailPrice ? {
      currency: 'USD',
      subtotal: retailPrice,
      discount: '0',
      shipping: '0',
      tax: '0',
      total: retailPrice,
    } : undefined,
  };

  return order;
}
