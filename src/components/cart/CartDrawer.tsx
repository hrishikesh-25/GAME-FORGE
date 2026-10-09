import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  Tag, 
  ShieldCheck, 
  ArrowRight,
  Download,
  Play
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    clearCart, 
    purchaseCart, 
    user, 
    navigate,
    installGame
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'GameForge Wallet' | 'Credit Card' | 'PayPal'>('GameForge Wallet');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    itemsCount: number;
    total: number;
    purchasedGameIds: string[];
  } | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const total = +(subtotal - discountAmount).toFixed(2);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'FORGE20' || code === 'STEAM20') {
      setAppliedDiscount(20);
      setPromoSuccess('Promo code applied: 20% discount granted!');
    } else if (code === 'FORGE50') {
      setAppliedDiscount(50);
      setPromoSuccess('VIP Creator code applied: 50% discount granted!');
    } else {
      setPromoError('Invalid promo code. Try "FORGE20"');
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    const gameIds = cart.map(c => c.gameId);

    setTimeout(() => {
      const res = purchaseCart(paymentMethod, appliedDiscount);
      setIsProcessing(false);
      if (res.success) {
        setCompletedOrder({
          orderId: `GF-${Math.floor(100000 + Math.random() * 900000)}`,
          itemsCount: gameIds.length,
          total,
          purchasedGameIds: gameIds
        });
      } else {
        alert(res.message);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0a0d14] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-white">Your Cart</h3>
            <span className="text-xs text-slate-400 font-mono">({cart.length} items)</span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setCompletedOrder(null);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Success State */}
        {completedOrder ? (
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-display text-xl font-bold text-white">Payment Confirmed!</h4>
              <p className="text-xs text-slate-400">
                Order <strong className="text-cyan-400 font-mono">#{completedOrder.orderId}</strong> processed successfully.
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
              {completedOrder.itemsCount} game{completedOrder.itemsCount > 1 ? 's' : ''} have been automatically bound to your GameForge license and added to your library.
            </p>

            <div className="w-full pt-4 space-y-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCompletedOrder(null);
                  navigate('library');
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Go to Game Library & Install</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCompletedOrder(null);
                  navigate('store');
                }}
                className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <X className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Your cart is empty</h4>
              <p className="text-xs text-slate-400">Explore blockbuster games and dedicated servers.</p>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('store');
              }}
              className="py-2 px-4 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-xl text-xs font-medium transition-colors"
            >
              Browse Game Store
            </button>
          </div>
        ) : (
          /* Cart Items & Checkout Flow */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400">Items in Order</span>
                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Item list */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.gameId}
                    className="flex gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl items-center"
                  >
                    <img
                      src={item.game.coverImage}
                      alt={item.game.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg bg-slate-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">{item.game.title}</h4>
                      <p className="text-[11px] text-slate-400">{item.game.developer}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.game.originalPrice && (
                          <span className="text-[10px] font-mono text-slate-500 line-through">
                            ${item.game.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.gameId)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. FORGE20"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <p className="text-[11px] text-emerald-400 mt-1">{promoSuccess}</p>}
                {promoError && <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>}
              </form>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block">Payment Method</span>
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('GameForge Wallet')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                      paymentMethod === 'GameForge Wallet'
                        ? 'border-cyan-400 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium">GameForge Wallet</span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                      ${user.walletBalance.toFixed(2)} available
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit Card')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                      paymentMethod === 'Credit Card'
                        ? 'border-cyan-400 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-indigo-400" />
                      <span className="font-medium">Credit / Debit Card (Mock)</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PayPal')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                      paymentMethod === 'PayPal'
                        ? 'border-cyan-400 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sky-400 text-xs">PP</span>
                      <span className="font-medium">PayPal Checkout</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Instant</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom summary and action */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/90 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Digital Taxes & VAT</span>
                  <span className="font-mono">$0.00 (Included)</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                  <span>Total Due</span>
                  <span className="font-mono text-cyan-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing License Provisioning...</span>
                ) : (
                  <>
                    <span>Confirm & Purchase Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Instant 14-day refund policy · 256-bit encryption</span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
