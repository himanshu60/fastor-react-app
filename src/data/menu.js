import berryTart from '../assets/images/berry-tart.jpg'
import chickenBurger from '../assets/images/chicken-burger.jpg'
import chickenCurry from '../assets/images/chicken-curry.jpg'
import lasagna from '../assets/images/lasagna.jpg'
import pepperoniPizza from '../assets/images/pepperoni-pizza.jpg'
import salmonSushi from '../assets/images/salmon-sushi.jpg'
import strawberryShake from '../assets/images/strawberry-shake.jpg'

// Sample data for the demo (there is no backend for this task)
export const user = { name: 'Karan', location: 'Model Town, New Delhi' }

export const products = [
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    image: pepperoniPizza,
    price: 14,
    description: 'Stone-baked crust with tomato sauce, mozzarella and spicy pepperoni, finished with fresh basil.',
    optionsTitle: 'Personal portion',
    options: [
      { label: 'Personal (4 Slices)', price: 0 },
      { label: 'Medium (8 Slices)', price: 3 },
      { label: 'Family (10 Slices)', price: 6 },
      { label: 'Jumbo (12 Slices)', price: 10 },
    ],
  },
  {
    id: 'salmon-sushi',
    name: 'Salmon Sushi Rolls',
    image: salmonSushi,
    price: 103,
    description: 'Eight fresh salmon and avocado rolls, served with soy sauce, wasabi and pickled ginger.',
  },
  {
    id: 'chicken-curry',
    name: 'Chicken Curry & Rice',
    image: chickenCurry,
    price: 50,
    description: 'Slow-cooked chicken in a rich, mildly spiced gravy with fragrant herbed basmati rice.',
  },
  {
    id: 'lasagna',
    name: 'Classic Lasagna',
    image: lasagna,
    price: 12.99,
    description: 'Layers of fresh pasta, slow-cooked meat sauce and creamy béchamel, baked until golden.',
  },
  {
    id: 'berry-tart',
    name: 'Raspberry Tart',
    image: berryTart,
    price: 8.2,
    description: 'Buttery shortcrust filled with smooth custard and topped with fresh raspberries.',
  },
  {
    id: 'strawberry-shake',
    name: 'Strawberry Shake',
    image: strawberryShake,
    price: 10,
    description: 'Thick strawberry milkshake blended with real fruit and topped with whipped cream.',
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    image: chickenBurger,
    price: 20,
    description: 'Crispy fried chicken fillet with red slaw and house sauce in a toasted sesame bun.',
  },
]

export const getProduct = (id) => products.find((product) => product.id === id)

export const bestSellerIds = ['salmon-sushi', 'chicken-curry', 'lasagna', 'berry-tart']

export const promos = [
  { productId: 'pepperoni-pizza', tagline: 'Experience our delicious new dish', discount: '30% OFF' },
  { productId: 'chicken-burger', tagline: 'Crispy, juicy and made fresh', discount: '20% OFF' },
  { productId: 'salmon-sushi', tagline: 'Fresh rolls made to order', discount: '25% OFF' },
  { productId: 'strawberry-shake', tagline: 'Cool off with a creamy shake', discount: '15% OFF' },
  { productId: 'lasagna', tagline: 'Layered, cheesy and oven baked', discount: '10% OFF' },
]

// "Popular Items" in the design are shown as recent orders
export const orders = [
  { id: 'order-1', productId: 'strawberry-shake', total: 20, date: '29 Nov, 01:20 pm', items: 2 },
  { id: 'order-2', productId: 'chicken-burger', total: 20, date: '17 Oct, 01:20 pm', items: 1 },
  { id: 'order-3', productId: 'pepperoni-pizza', total: 42, date: '12 Oct, 08:45 pm', items: 3 },
]
