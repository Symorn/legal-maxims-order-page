import React, { useState } from 'react';
import { 
  ShoppingBag, Check, ShieldCheck, Truck, CreditCard, Building2, 
  Sparkles, Tag, ArrowRight, BookOpen, AlertCircle, Phone, Mail, MapPin, User, FileText 
} from 'lucide-react';
import { EDITIONS, NIGERIAN_STATES, BANK_DETAILS, PROMO_CODES, BOOK_INFO, BookEdition } from '../data/bookData';
import { CompletedOrder, OrderConfirmationModal } from './OrderConfirmationModal';

interface OrderSectionProps {
  onOpenSample: () => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ onOpenSample }) => {
  // Order selection state
  const [selectedEditionId, setSelectedEditionId] = useState<string>('paperback');
  const [quantity, setQuantity] = useState<number>(1);
  const [requestInscription, setRequestInscription] = useState<boolean>(false);
  const [inscriptionNote, setInscriptionNote] = useState<string>('');

  // Shipping & Contact State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryState, setDeliveryState] = useState<string>('Lagos');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  // Promo code state
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: 'percent' | 'flat'; value: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'online' | 'pod'>('bank_transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Completed order for modal
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Selected Edition object
  const currentEdition = EDITIONS.find((e) => e.id === selectedEditionId) || EDITIONS[0];

  // Calculate pricing
  const isDigital = currentEdition.format === 'Digital eBook';
  const selectedStateObj = NIGERIAN_STATES.find((s) => s.name === deliveryState) || NIGERIAN_STATES[0];
  const deliveryFee = isDigital ? 0 : selectedStateObj.fee;

  const subtotal = currentEdition.price * quantity;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discount = Math.round((subtotal * appliedPromo.value) / 100);
    } else {
      discount = appliedPromo.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) return;

    if (PROMO_CODES[cleaned]) {
      setAppliedPromo({
        code: cleaned,
        ...PROMO_CODES[cleaned]
      });
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try LEXMENTORS or LAWSTUDENT');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.name = 'Full name is required';
    if (!customerEmail.trim() || !customerEmail.includes('@')) errors.email = 'Valid email is required for receipt & digital access';
    if (!customerPhone.trim() || customerPhone.length < 8) errors.phone = 'Valid phone number is required for dispatch';
    if (!isDigital && !deliveryAddress.trim()) errors.address = 'Street / delivery address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `LMS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const newOrder: CompletedOrder = {
        orderId: generatedId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        editionName: currentEdition.name,
        editionFormat: currentEdition.format,
        quantity,
        deliveryState: isDigital ? 'Digital Delivery (Worldwide)' : deliveryState,
        deliveryAddress: isDigital ? 'Direct Email Access' : deliveryAddress.trim(),
        deliveryFee,
        discount,
        subtotal,
        total: grandTotal,
        paymentMethod,
        inscription: requestInscription && inscriptionNote.trim() ? inscriptionNote.trim() : undefined,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      setCompletedOrder(newOrder);
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 800);
  };

  return (
    <section id="order-section" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
          <ShoppingBag className="w-4 h-4" />
          <span>Official Author & Publisher Order Portal</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
          Order Your Copy Today
        </h2>
        <p className="mt-4 font-lora text-base sm:text-lg text-zinc-300 leading-relaxed">
          Select your preferred format, customize your order with an optional author inscription, and receive reliable delivery across Nigeria or immediate digital access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Edition Selection & Features (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-[#13141c] border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-sans-ui flex items-center justify-center">1</span>
                <span>Select Your Edition</span>
              </h3>
              <button
                type="button"
                onClick={onOpenSample}
                className="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Sample Pages</span>
              </button>
            </div>

            {/* Edition Cards Grid */}
            <div className="space-y-3.5">
              {EDITIONS.map((edition) => {
                const isSelected = selectedEditionId === edition.id;

                return (
                  <div
                    key={edition.id}
                    onClick={() => setSelectedEditionId(edition.id)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#1c1d29] border-orange-500 shadow-md ring-1 ring-orange-500/50'
                        : 'bg-[#171822]/70 border-zinc-800 hover:border-zinc-700 hover:bg-[#1a1b26]'
                    }`}
                  >
                    {edition.badge && (
                      <span className={`absolute -top-2.5 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        edition.isPopular
                          ? 'bg-orange-600 text-white border-orange-400 shadow-xs'
                          : 'bg-zinc-800 text-amber-300 border-amber-500/30'
                      }`}>
                        {edition.badge}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-600 text-white'
                            : 'border-zinc-600 bg-zinc-800'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">
                            {edition.name}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-0.5 font-lora">
                            {edition.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono text-lg font-bold text-white">
                          ₦{edition.price.toLocaleString()}
                        </p>
                        {edition.originalPrice && (
                          <p className="text-xs text-zinc-500 line-through font-mono">
                            ₦{edition.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Features list when selected */}
                    {isSelected && (
                      <div className="mt-4 pt-3.5 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                        {edition.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quantity and Inscription Request */}
            <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Quantity of Copies
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center border border-zinc-700 transition"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-white w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center border border-zinc-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {!isDigital && (
                <div className="flex-1 max-w-sm sm:pl-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-300">
                    <input
                      type="checkbox"
                      checked={requestInscription}
                      onChange={(e) => setRequestInscription(e.target.checked)}
                      className="rounded accent-orange-600 w-4 h-4"
                    />
                    <span>Request Hand-Signed Author Inscription (Free)</span>
                  </label>
                  {requestInscription && (
                    <input
                      type="text"
                      value={inscriptionNote}
                      onChange={(e) => setInscriptionNote(e.target.value)}
                      placeholder="e.g. 'To Barrister Tunde, with best wishes!'"
                      className="mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Delivery & Logistics Details Card */}
          {!isDigital && (
            <div className="bg-[#13141c] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-sans-ui flex items-center justify-center">2</span>
                <span>Nationwide Shipping Destination</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                    Delivery State / Location
                  </label>
                  <select
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    className="w-full bg-[#181a24] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-orange-500"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st.name} value={st.name}>
                        {st.name} — {st.fee === 0 ? 'FREE' : `₦${st.fee.toLocaleString()}`} ({st.estimate})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-[#181a24] p-3.5 rounded-xl border border-zinc-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-600/20 text-orange-400 shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Estimated Dispatch Timeline
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5 font-lora">
                      {selectedStateObj.estimate} via GIG Logistics / Speedaf. Doorstep delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                  Detailed Street Address / Landmark / Faculty
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. Flat 4, 12 Broad Street, Lagos Island or Law Faculty Office, UNIOSUN Ifetedo Campus"
                    className={`w-full bg-[#181a24] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500 ${
                      formErrors.address ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                </div>
                {formErrors.address && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.address}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Customer Details, Coupon & Checkout (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSubmitOrder} className="bg-[#13141c] border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
            <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-sans-ui flex items-center justify-center">3</span>
              <span>Buyer Details</span>
            </h3>

            {/* Buyer Contact Form */}
            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Full Name (or Firm Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Barrister Sharon Adeleke"
                    className={`w-full bg-[#181a24] border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500 ${
                      formErrors.name ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-[11px] text-red-400 mt-0.5">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Email Address (for Receipt & Digital Copy) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className={`w-full bg-[#181a24] border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500 ${
                      formErrors.email ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-400 mt-0.5">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className={`w-full bg-[#181a24] border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500 ${
                      formErrors.phone ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-400 mt-0.5">{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="pt-2">
              <label className="text-xs font-medium text-zinc-400 block mb-1.5 flex items-center justify-between">
                <span>Coupon / Law Student Promo Code</span>
                <span className="text-[10px] text-orange-400 font-mono">LEXMENTORS (10% OFF)</span>
              </label>

              {appliedPromo ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-bold">{appliedPromo.code}:</span>
                    <span>{appliedPromo.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-zinc-400 hover:text-red-400 text-xs font-bold px-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. LEXMENTORS)"
                    className="flex-1 bg-[#181a24] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-hidden focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl transition"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-red-400 mt-1">{promoError}</p>
              )}
            </div>

            {/* Payment Options */}
            <div className="pt-2 space-y-2">
              <label className="text-xs font-bold text-zinc-300 block">
                Select Payment Mode
              </label>

              <div className="space-y-2">
                <label
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-orange-950/20 border-orange-500 text-white'
                      : 'bg-[#181a24] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="accent-orange-600"
                    />
                    <Building2 className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-xs font-bold">Direct Bank Transfer</p>
                      <p className="text-[10px] text-zinc-400">GTBank & Zenith Bank instant transfer</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    Recommended
                  </span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'online'
                      ? 'bg-orange-950/20 border-orange-500 text-white'
                      : 'bg-[#181a24] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="accent-orange-600"
                    />
                    <CreditCard className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-xs font-bold">Online Card / USSD Payment</p>
                      <p className="text-[10px] text-zinc-400">Instant verification via Paystack</p>
                    </div>
                  </div>
                </label>

                {!isDigital && ['Lagos', 'Oyo (Ibadan, Ogbomoso)', 'Osun (Osogbo, Ife, etc.)', 'Abuja (FCT)'].includes(deliveryState) && (
                  <label
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'pod'
                        ? 'bg-orange-950/20 border-orange-500 text-white'
                        : 'bg-[#181a24] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pod'}
                        onChange={() => setPaymentMethod('pod')}
                        className="accent-orange-600"
                      />
                      <Truck className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-xs font-bold">Pay on Delivery</p>
                        <p className="text-[10px] text-zinc-400">Available in your state upon arrival</p>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Order Price Breakdown */}
            <div className="bg-[#181a24] p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>{currentEdition.name} × {quantity}</span>
                <span className="font-mono text-zinc-200">₦{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount ({appliedPromo?.label})</span>
                  <span className="font-mono">-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Shipping ({isDigital ? 'eBook' : deliveryState})</span>
                <span className="font-mono text-zinc-200">
                  {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-zinc-700 pt-2 flex justify-between text-sm sm:text-base font-bold text-white">
                <span>Total Payable:</span>
                <span className="font-mono text-orange-400">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-orange-600/25 transition transform active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Order...</span>
                </span>
              ) : (
                <>
                  <span>Complete Order (₦{grandTotal.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Buyer Protection Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Author Fulfillment • Guaranteed Delivery</span>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onOpenSample={onOpenSample}
      />
    </section>
  );
};
