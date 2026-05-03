/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ChevronRight, 
  Search,
  CheckCircle2,
  Phone,
  LayoutGrid,
  Palette,
  Printer,
  Package,
  Share2
} from 'lucide-react';
import { products, type Product } from './data';

// --- Types ---
interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  // --- Effects ---
  useEffect(() => {
    const savedCart = localStorage.getItem('xtreme_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('xtreme_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Computed ---
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Actions ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Trigger bounce animation
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 300);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const shareProduct = (product: Product) => {
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.id);
    
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedId(product.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const finishOrder = () => {
    if (cart.length === 0) return;

    // WhatsApp number for Agência Xtreme
    const phoneNumber = "5513997047761"; 
    const itemsMessage = cart.map(item => `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const total = cartTotal.toFixed(2);
    
    const message = encodeURIComponent(
      `*Olá, Agência Xtreme! Gostaria de fazer um pedido:*\n\n` +
      `${itemsMessage}\n\n` +
      `*Total: R$ ${total}*\n\n` +
      `_Pedido gerado via Catálogo Digital_`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex justify-between items-center h-20 lg:h-24">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-black tracking-tighter uppercase font-display italic">Xtreme<span className="text-red-600">.</span></div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">Digital Studio</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-10">
              {['Início', 'Catálogo', 'Sobre'].map((item) => (
                <span 
                  key={item}
                  className={`text-[11px] uppercase tracking-[0.2em] cursor-pointer transition-colors ${
                    item === 'Catálogo' ? 'text-white border-b border-white pb-1' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {item}
                </span>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <div className="hidden lg:relative lg:block group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="BUSCAR..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 pr-4 py-2 bg-transparent text-[11px] uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none w-32 focus:w-48 transition-all"
                />
              </div>

              <motion.button 
                id="cart-trigger"
                onClick={() => setIsCartOpen(true)}
                animate={isCartBouncing ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Ver carrinho"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-8 lg:py-12">
        {/* Banner Section */}
        <section className="mb-16 lg:mb-24 text-center lg:text-left flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="text-[10px] lg:text-[12px] uppercase tracking-[0.3em] text-red-600 font-bold mb-4 lg:mb-6">Creative & High Performance</div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 lg:mb-8 leading-[0.85] font-display uppercase italic">
              TRANSFORME <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-600/50">SUA MARCA</span>
            </h2>
            <p className="text-white/60 text-base lg:text-lg font-light leading-relaxed max-w-xl mb-8 lg:mb-10">
              Design disruptivo e produção de alta performance para quem busca o topo.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-12">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Qualidade</span>
                <span className="text-sm font-bold tracking-tight text-white italic">HIGH PERFORMANCE</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">WhatsApp</span>
                <span className="text-sm font-bold tracking-tight text-white">(13) 99704-7761</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-[400px] aspect-[4/3] lg:aspect-[3/4] bg-[#111] rounded-[2.5rem] border border-white/5 flex items-center justify-center relative overflow-hidden group shadow-2xl"
          >
            <div className="text-[10px] uppercase tracking-[1em] text-white/5 rotate-90 whitespace-nowrap font-black">Xtreme Showcase</div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/10 blur-[100px] rounded-full"></div>
          </motion.div>
        </section>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto no-scrollbar gap-4 lg:gap-12 mb-12 lg:mb-20 border-b border-white/5 pb-6 lg:pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] lg:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative py-2 px-4 rounded-full font-bold whitespace-nowrap ${
                activeCategory === cat 
                  ? 'text-white bg-red-600 shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]' 
                  : 'text-white/30 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar - Mobile Only */}
        <div className="lg:hidden mb-12">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="PESQUISAR PRODUTOS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-[#111] rounded-2xl border border-white/5 text-xs uppercase tracking-widest font-bold focus:outline-none focus:border-red-600 transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.165, 0.84, 0.44, 1] }}
                className="sporty-card group flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-black/40 flex items-center justify-center overflow-hidden">
                   {product.image ? (
                     <img 
                       src={product.image} 
                       alt={product.name} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       referrerPolicy="no-referrer"
                       loading="lazy"
                     />
                   ) : (
                     <div className="text-white/5 group-hover:text-white/10 transition-colors duration-700">
                      {product.category === 'Impressos' && <Printer className="w-12 h-12 lg:w-16 lg:h-16 stroke-1" />}
                      {product.category === 'Produtos' && <Package className="w-12 h-12 lg:w-16 lg:h-16 stroke-1" />}
                      {product.category === 'Design Digital' && <Palette className="w-12 h-12 lg:w-16 lg:h-16 stroke-1" />}
                     </div>
                   )}
                   
                   <div className="absolute top-3 right-3 lg:top-6 lg:right-6 flex flex-col gap-2">
                    <button 
                      onClick={() => shareProduct(product)}
                      className="p-2 lg:p-3 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 relative group/share"
                      aria-label="Compartilhar produto"
                    >
                      <Share2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      <AnimatePresence>
                        {copiedId === product.id && (
                          <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold py-1 px-2 rounded-lg whitespace-nowrap"
                          >
                            COPIADO!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center transition-all bg-black/60 backdrop-blur-md text-white hover:bg-red-600 hover:border-red-600 active:scale-95 shadow-2xl"
                      aria-label="Adicionar"
                    >
                      <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    </button>
                   </div>

                   <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6 flex items-center gap-2 px-2 lg:px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-red-600"></div>
                    <span className="text-[8px] lg:text-[9px] uppercase tracking-widest font-black text-white italic">Xtreme Gear</span>
                   </div>
                </div>

                <div className="flex-1 p-4 lg:p-6 pb-0 flex flex-col">
                  <div className="text-[8px] lg:text-[10px] uppercase tracking-widest text-red-600 font-black mb-1 lg:mb-2">{product.category}</div>
                  <h3 className="text-base lg:text-xl font-bold tracking-tight text-white mb-2 leading-tight font-display italic">
                    {product.name}
                  </h3>
                  <p className="text-[11px] lg:text-sm font-medium text-white/40 line-clamp-2 leading-tight lg:leading-normal mb-4">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-lg lg:text-2xl font-black tracking-tighter italic font-display">R$ {product.price.toFixed(0)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="lg:hidden text-[10px] font-black uppercase text-red-600 tracking-widest"
                    >
                      COMPRAR
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
            <h3 className="text-3xl font-extralight tracking-tight text-white/20 mb-4">Nenhum resultado encontrado</h3>
            <p className="text-white/10 uppercase tracking-widest text-sm">Refine sua busca ou categoria</p>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 40, stiffness: 400 }}
              className="fixed right-0 top-0 h-[100dvh] w-full max-w-lg bg-[#0a0a0a] z-[60] shadow-[-20px_0_100px_-15px_rgba(0,0,0,0.5)] flex flex-col border-l border-white/5"
            >
              <div className="px-6 lg:px-10 py-8 lg:py-10 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white mb-1 font-display italic uppercase">Carrinho</h2>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{cartCount} PRODUTOS SELECIONADOS</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-12 h-12 hover:bg-white/5 rounded-full transition-colors text-white/40 flex items-center justify-center group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 lg:py-10 space-y-8 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <ShoppingCart className="w-16 h-16 mb-8 stroke-[1]" />
                    <h3 className="text-xl font-black uppercase tracking-[0.2em] italic font-display">Vazio</h3>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-6 lg:gap-8 group"
                      >
                        <div className="w-20 lg:w-24 h-28 lg:h-32 bg-[#111] rounded-2xl border border-white/5 shrink-0 flex items-center justify-center text-white/5 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                          ) : (
                            <>
                              {item.category === 'Impressos' && <Printer className="w-8 h-8 stroke-1" />}
                              {item.category === 'Produtos' && <Package className="w-8 h-8 stroke-1" />}
                              {item.category === 'Design Digital' && <Palette className="w-8 h-8 stroke-1" />}
                            </>
                          )}
                        </div>
                        <div className="flex-1 py-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-base lg:text-xl font-bold tracking-tight text-white leading-tight font-display italic uppercase">{item.name}</h4>
                            <span className="text-sm font-black text-red-600 font-display italic">R$ {item.price.toFixed(0)}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 lg:gap-6 bg-white/5 rounded-full px-4 py-2 border border-white/5">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-white/30 hover:text-white transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-white/30 hover:text-white transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/20 hover:text-red-600 transition-colors text-[9px] uppercase tracking-widest font-black"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {cart.length > 0 && (
                <div className="px-6 lg:px-10 py-10 bg-[#0a0a0a] border-t border-white/5 space-y-8">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Total do Pedido</span>
                      <span className="text-5xl font-black tracking-tighter italic font-display text-red-600">R$ {cartTotal.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={finishOrder}
                    className="w-full bg-white text-black py-6 rounded-3xl font-black text-xs lg:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all transform active:scale-[0.98] shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)]"
                  >
                    Finalizar Pedido
                    <Phone className="w-4 h-4 px-0.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Action Bar Footer (Always visible when items present) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.footer 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-4 lg:bottom-10 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-max z-40 bg-[#111]/80 backdrop-blur-2xl border border-white/5 px-6 lg:px-12 py-5 lg:py-6 flex justify-between items-center lg:gap-24 rounded-[3rem] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)]"
          >
            <motion.div 
              animate={isCartBouncing ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col cursor-pointer" 
              onClick={() => setIsCartOpen(true)}
            >
              <span className="text-[8px] lg:text-[9px] uppercase tracking-widest text-red-600 font-black mb-1 leading-none italic">Sua Seleção</span>
              <span className="text-xl lg:text-2xl font-black tracking-tight leading-none italic font-display">{cartCount} <span className="text-xs uppercase tracking-widest font-bold opacity-30">Itens</span></span>
            </motion.div>
            <div className="flex items-center gap-8 lg:gap-16">
              <div className="text-right hidden sm:flex flex-col">
                <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1 leading-none font-bold">Investimento</span>
                <span className="text-2xl lg:text-3xl font-black tracking-tighter leading-none italic font-display text-red-600">R$ {cartTotal.toFixed(0)}</span>
              </div>
              <button 
                onClick={finishOrder}
                className="bg-red-600 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-full flex items-center gap-3 hover:bg-white hover:text-red-600 transition-all shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)] active:scale-95"
              >
                <span className="text-[10px] lg:text-[11px] uppercase tracking-widest font-black italic">Finalizar</span>
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
