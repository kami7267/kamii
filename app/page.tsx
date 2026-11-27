'use client';

import { useState } from 'react';
import { Product, CartItem } from './types';

// Данные товаров (берем картинку похожую на макет)
const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Лонгслив Heavy Green', price: 5990, oldPrice: 10000, image: 'buda.png' },
  { id: 2, name: 'Лонгслив Heavy Green', price: 5990, image: 'buda.png' },
  { id: 3, name: 'Лонгслив Heavy Green', price: 5990, image: 'buda.png' },
  { id: 4, name: 'Лонгслив Heavy Green', price: 5990, image: 'buda.png' },
  { id: 5, name: 'Лонгслив Heavy Green', price: 5990, image: 'buda.png' },
  { id: 6, name: 'Лонгслив Heavy Green', price: 5990, image: 'buda.png' },
];

// Иконки в стиле макета (тонкие линии)
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="8" x2="21" y2="8"></line>
    <line x1="3" y1="16" x2="21" y2="16"></line>
  </svg>
);

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 400;
  const total = subtotal > 0 ? subtotal + delivery : 0;

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-black selection:text-white">
      
      {/* Шапка (Header) */}
      <header className="sticky top-0 z-40 flex justify-between items-center px-6 py-5 bg-[#F4F4F0]">
        <div className="flex-1 flex">
          <button className="hover:opacity-60 transition-opacity" onClick={() => setIsMenuOpen(true)}>
            <MenuIcon />
          </button>
        </div>
        <div className="flex-2 text-center text-[11px] tracking-[0.2em] uppercase pt-1">
          <a href="/">ТЕКСТУРА</a>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="hover:opacity-60 transition-opacity" onClick={() => setIsCartOpen(true)}>
            <BagIcon />
          </button>
        </div>
      </header>

      {/* Главный экран (Hero Section) */}
      <section className="text-center px-4 pt-16 pb-12">
        <h1 className="text-[16vw] md:text-[10vw] lg:text-[11rem] font-light tracking-[0.05em] leading-none uppercase mb-2">
          ТЕКСТУРА
        </h1><div className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-16 md:mb-24">
          Moscow
        </div>
        <p className="max-w-[480px] mx-auto text-[11px] md:text-[12px] leading-relaxed text-center font-medium">
          <strong className="font-semibold">ТЕКСТУРА</strong> - Бренд одежды, который не боится размывать границы между материалами и текстурами. Каждое изделие — это шанс заявить о себе, выразить личность через необычные сочетания и уникальные силуэты.
        </p>
      </section>

      {/* Каталог (Grid) - строго 3 колонки как на макете */}
      <section className="px-4 md:px-8 pb-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="cursor-pointer group" onClick={() => addToCart(product)}>
              <div className="w-full aspect-[3/4] bg-[#E8E5DF] mb-3 overflow-hidden relative">
                {/* Заглушка вместо фото, чтобы сохранить пропорции макета */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
                />
              </div>
              <div className="flex justify-between items-start text-[11px] leading-tight">
                <span className="pr-4">{product.name}</span>
                <div className="flex gap-2 shrink-0">
                  <span>{product.price} ₽</span>
                  {product.oldPrice && (
                    <span className="line-through text-[#A0A0A0]">{product.oldPrice} ₽</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Подвал (Footer) */}
      <footer className="px-6 py-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-wide mt-10 gap-4">
        <div>© ТЕКСТУРА</div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <a href="#" className="hover:opacity-50 transition-opacity">Контакты</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Возврат</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Оферта</a>
          <a href="#" className="hover:opacity-50 transition-opacity">О нас</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Lookbook</a>
        </div>
      </footer>

      {/* ================= КОРЗИНА ================= */}
      <aside className={`fixed top-0 right-0 w-full md:w-[450px] h-screen bg-[#F4F4F0] z-50 transition-transform duration-500 ease-in-out p-8 overflow-y-auto shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[14px]">Корзина</h2>
          <button onClick={() => setIsCartOpen(false)}><CloseIcon /></button>
        </div>
        
        <div className="mb-8">
          {cart.length === 0 ? <p className="text-[12px] text-gray-500">Ваша корзина пуста.</p> : null}
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 mb-6 text-[11px]">
              <img src={item.image} alt={item.name} className="w-16 h-20 object-cover object-top" />
              <div className="flex-1">
                <h3 className="mb-1">{item.name}</h3>
                <p className="text-[10px] text-gray-500 mb-1">Размер: M</p>
                <p>{item.quantity} шт.</p>
              </div>
              <div>{item.price * item.quantity} ₽</div>
            </div>
          ))}
        </div>

        <div className="mb-8 text-[12px] border-t border-[#D1D1D1] pt-4">
          <div className="flex justify-between mb-2"><span>Сумма:</span><span>{subtotal} ₽</span></div>
11:31
<div className="flex justify-between mb-4"><span>Доставка СДЭК:</span><span>{delivery} ₽</span></div>
          <div className="flex justify-between font-medium text-[13px]"><span>Итоговая сумма:</span><span>{total} ₽</span></div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Заказ оформлен!'); }}>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-500 mb-1">Ваше имя</label>
            <input type="text" required className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[12px] outline-none focus:border-black transition-colors" />
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-500 mb-1">Ваш email</label>
            <input type="email" required className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[12px] outline-none focus:border-black transition-colors" />
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-500 mb-1">Ваш телефон</label>
            <input type="tel" required className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[12px] outline-none focus:border-black transition-colors" />
          </div>
          
          <h3 className="mt-8 mb-4 text-[12px] font-medium">Доставка</h3>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-500 mb-1">Город</label>
            <input type="text" required className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[12px] outline-none focus:border-black transition-colors" />
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-500 mb-1">Получатель (ФИО)</label>
            <input type="text" required className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[12px] outline-none focus:border-black transition-colors" />
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-500 mb-1">Комментарий</label>
            <input type="text" className="w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[12px] outline-none focus:border-black transition-colors" />
          </div>
          
          <button type="submit" className="w-full bg-black text-[#F4F4F0] py-4 text-[12px] mt-8 hover:bg-gray-800 transition-colors">
            Оформить заказ
          </button>
          <p className="text-[9px] text-gray-500 mt-4 leading-relaxed text-center">
            Посылка будет отправлена в ближайший ПВЗ по указанному адресу. Сразу же после оформления вам придет письмо с трек-номером.
          </p>
        </form>
      </aside>

      {/* ================= МОБИЛЬНОЕ МЕНЮ ================= */}
      <nav className={`fixed top-0 left-0 w-full h-screen bg-[#F4F4F0] z-50 transition-transform duration-500 ease-in-out p-6 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <div className="text-[11px] tracking-[0.2em] uppercase">МЕНЮ</div>
          <button onClick={() => setIsMenuOpen(false)}><CloseIcon /></button>
        </div>
        <ul className="flex flex-col gap-6 text-[14px]">
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>Контакты</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>Возврат</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>Оферта</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>О нас</a></li>
          <li><a href="#" onClick={() => setIsMenuOpen(false)}>Lookbook</a></li>
        </ul>
      </nav>

    </div>
  );
}
