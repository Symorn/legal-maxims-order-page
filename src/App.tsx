import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Check, MessageSquare, ArrowRight, ShieldCheck, 
  ExternalLink, CheckCircle2, Loader2, Plus, Minus, Tag, X
} from 'lucide-react';
import bookCoverImg from './assets/book-cover.jpg';
import { trackPixelEvent } from './utils/pixel';

const SELAR_SOFT_COPY_LINK = "https://selar.com/y18t00200g";
const WHATSAPP_PHONE = "2349048402122";
const FORMATTED_PHONE = "+234 904 840 2122";

const GOOGLE_SCRIPT_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwIV50ieJ1C_YCZQSbYR0bMlN9H20fRBcdpkha3kg6JSrJLa_I7-BsMgcKD8SW7EFyiuw/exec"; 

export default function App() {
  // Book Type: 'hard' (Physical book) or 'soft' (Read online)
  const [bookType, setBookType] = useState<'hard' | 'soft'>('hard');
  
  // Quantity of physical hard copies
  const [quantity, setQuantity] = useState<number>(1);

  // Delivery option for Hard Copy: 'direct' or 'pod' (Pay on delivery)
  const [deliveryOption, setDeliveryOption] = useState<'direct' | 'pod'>('direct');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Submission & Modal state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasStartedForm, setHasStartedForm] = useState(false);

  // Fire ViewContent on load
  useEffect(() => {
    trackPixelEvent('ViewContent', {
      content_name: 'Legal Maxims Simplified: A Practical Guide For Everyone',
      content_category: 'Law Book / Legal Education',
      content_ids: ['LMS-BOOK-2026'],
      content_type: 'product',
      value: 10000,
      currency: 'NGN'
    });
  }, []);

  // Calculations for Physical Books
  const unitPrice = 10000;
  const deliveryFee = 5000;
  const rawBookTotal = quantity * unitPrice;

  let discountPercent = 0;
  if (quantity >= 10) {
    discountPercent = 20;
  } else if (quantity >= 5) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((rawBookTotal * discountPercent) / 100);
  const discountedBookTotal = rawBookTotal - discountAmount;
  const grandTotal = discountedBookTotal + deliveryFee;

  // Upfront payment
  const amountDueNow = deliveryOption === 'direct' ? grandTotal : deliveryFee;
  const balanceOnDelivery = deliveryOption === 'pod' ? discountedBookTotal : 0;

  const handleQuantityChange = (qty: number) => {
    const validQty = Math.max(1, Math.min(100, qty || 1));
    setQuantity(validQty);

    let dPercent = 0;
    if (validQty >= 10) dPercent = 20;
    else if (validQty >= 5) dPercent = 10;
    const dTotal = (validQty * unitPrice) - Math.round((validQty * unitPrice * dPercent) / 100) + deliveryFee;

    // Track product customization in Meta Pixel
    trackPixelEvent('CustomizeProduct', {
      content_name: 'Legal Maxims Simplified (Hard Copy)',
      content_type: 'product',
      num_items: validQty,
      discount_percent: dPercent,
      value: dTotal,
      currency: 'NGN'
    });
  };

  const handleSelectBookType = (type: 'hard' | 'soft') => {
    setBookType(type);
    setShowPopup(false);

    trackPixelEvent('SelectContent', {
      content_type: 'product',
      content_name: type === 'hard' ? 'Legal Maxims (Hard Copy)' : 'Legal Maxims (Soft Copy - Read Online)',
      value: type === 'hard' ? 10000 : 5000,
      currency: 'NGN'
    });
  };

  const handleSoftCopyClick = () => {
    trackPixelEvent('InitiateCheckout', {
      content_name: 'Legal Maxims Simplified (Soft Copy - Read Online)',
      content_type: 'product',
      value: 5000,
      currency: 'NGN'
    });
    trackPixelEvent('ClickReadOnline', {
      value: 5000,
      currency: 'NGN',
      destination: 'Selar'
    }, true);
  };

  const handleFormFocus = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackPixelEvent('InitiateCheckout', {
        content_name: 'Legal Maxims Simplified (Hard Copy Order Form)',
        content_type: 'product',
        num_items: quantity,
        value: grandTotal,
        currency: 'NGN'
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please enter a valid email address';
    if (!phone.trim()) errs.phone = 'Please enter your phone number';
    if (bookType === 'hard' && !address.trim()) errs.address = 'Please enter your delivery address';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const ref = `LMS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);

    const orderData = {
      orderRef: ref,
      date: new Date().toLocaleString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      bookType: bookType === 'hard' ? 'Hard Copy (Physical)' : 'Soft Copy (Read Online)',
      quantity: quantity,
      discount: discountPercent > 0 ? `${discountPercent}% (Save ₦${discountAmount.toLocaleString()})` : 'None (0%)',
      deliveryOption: deliveryOption === 'direct' ? 'Direct Order' : 'Pay on Delivery',
      deliveryFee: `₦${deliveryFee.toLocaleString()}`,
      discountedBookCost: `₦${discountedBookTotal.toLocaleString()}`,
      totalCost: `₦${grandTotal.toLocaleString()}`,
      amountDueNow: `₦${amountDueNow.toLocaleString()}`,
      balanceOnDelivery: deliveryOption === 'pod' ? `₦${balanceOnDelivery.toLocaleString()}` : '₦0 (Paid)'
    };

    // Fire Meta Pixel Purchase & Lead Events with full currency and value parameters
    trackPixelEvent('Purchase', {
      content_name: 'Legal Maxims Simplified (Hard Copy)',
      content_type: 'product',
      content_ids: ['LMS-HARD-COPY'],
      num_items: quantity,
      value: grandTotal,
      currency: 'NGN',
      order_id: ref,
      delivery_option: deliveryOption
    });

    trackPixelEvent('Lead', {
      content_name: 'Legal Maxims Book Order Placed',
      value: amountDueNow,
      currency: 'NGN',
      order_id: ref
    });

    // Send data to Google Sheets Web App (Single request)
    if (GOOGLE_SCRIPT_WEBAPP_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(orderData)
        });
      } catch (err) {
        console.error('Google Sheet submission error:', err);
      }
    }

    setIsSubmitting(false);
    setShowPopup(true);
  };

  const handleWhatsAppConfirmationClick = () => {
    trackPixelEvent('Contact', {
      content_name: 'WhatsApp Order Confirmation Clicked',
      order_id: orderRef,
      value: amountDueNow,
      currency: 'NGN'
    });

    trackPixelEvent('ConfirmOrderWhatsApp', {
      orderRef,
      quantity,
      value: amountDueNow,
      currency: 'NGN'
    }, true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sharon, I just placed an order for "Legal Maxims Simplified".\n\n` +
    `• Order Reference: ${orderRef || 'NEW-ORDER'}\n` +
    `• Full Name: ${name}\n` +
    `• Email: ${email}\n` +
    `• Phone Number: ${phone}\n` +
    `• Type: Hard Copy (Physical Book)\n` +
    `• Number of Copies: ${quantity} copy/copies${discountPercent > 0 ? ` (${discountPercent}% Discount Applied - Saved ₦${discountAmount.toLocaleString()})` : ''}\n` +
    `• Delivery Address: ${address}\n` +
    `• Payment Option: ${deliveryOption === 'direct' ? 'Direct Order (Full Payment)' : 'Pay on Delivery'}\n` +
    `• Total Order Cost: ₦${grandTotal.toLocaleString()}\n` +
    `• Amount Required Now: ₦${amountDueNow.toLocaleString()}${deliveryOption === 'pod' ? `\n• Balance on Delivery: ₦${balanceOnDelivery.toLocaleString()}` : ''}\n\n` +
    `I am ready to confirm my order and pay the ₦5,000 delivery fee.`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#0a0b10] text-zinc-100 font-['Montserrat',sans-serif] selection:bg-orange-600 selection:text-white flex flex-col antialiased">
      
      {/* Top Header */}
      <header className="border-b-2 border-zinc-800 bg-[#12141f] py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
            LEGAL MAXIMS SIMPLIFIED
          </h1>
          <p className="text-xs sm:text-sm text-orange-400 font-bold mt-0.5">
            Official Book Order Page
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* Book Showcase Card */}
        <div className="bg-[#141624] border-2 border-zinc-700/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          
          {/* Exact Book Cover Image */}
          <div className="w-64 sm:w-72 shrink-0">
            <div className="rounded-2xl overflow-hidden border-2 border-zinc-600 shadow-[0_16px_40px_rgba(0,0,0,0.9)] bg-black">
              <img 
                src={bookCoverImg} 
                alt="Legal Maxims Simplified - Sharon O. Olaniyi" 
                className="w-full h-auto object-cover block"
                loading="eager"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-block bg-orange-950 text-orange-300 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full border border-orange-500/50">
              ISBN: 978-978-68-2634-9
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                LEGAL MAXIMS SIMPLIFIED
              </h2>
              <p className="text-orange-400 font-bold text-lg sm:text-xl mt-1">
                A Practical Guide For Everyone
              </p>
            </div>

            <div className="text-sm sm:text-base text-zinc-100 space-y-1.5 bg-[#1b1e30] p-4 rounded-2xl border border-zinc-700">
              <p><strong className="text-white">Author:</strong> Sharon O. Olaniyi</p>
              <p><strong className="text-white">Foreword:</strong> Professor Mojeed Olujinmi Alabi</p>
            </div>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-medium">
              A practical guide that explains Latin legal maxims in simple, clear English with relatable Nigerian everyday examples.
            </p>

            {/* Clear Bullet Features with strong emphasis on 1,100+ Maxims */}
            <div className="space-y-3 pt-2 text-sm sm:text-base text-zinc-200 font-medium">
              {/* Highlight Callout for 1,100+ Maxims */}
              <div className="p-3.5 rounded-2xl bg-orange-950/50 border-2 border-orange-500/60 flex items-center gap-3.5 shadow-md">
                <Check className="w-6 h-6 text-orange-400 stroke-[3] shrink-0" />
                <div>
                  <p className="text-base sm:text-lg font-black text-white">
                    Over 1,100+ Legal Maxims Included
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 font-normal">
                    Exhaustive A–Z coverage + 10 distinct subject areas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 stroke-[3] shrink-0" />
                <span>Plain English translations for every single maxim</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 stroke-[3] shrink-0" />
                <span>Real-life Nigerian case scenarios & practical illustrations</span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1: CHOOSE COPY TYPE */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">1</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Choose Which Copy You Want:
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Hard Copy Card */}
            <div
              onClick={() => handleSelectBookType('hard')}
              className={`p-6 rounded-2xl border-3 cursor-pointer transition ${
                bookType === 'hard'
                  ? 'bg-[#1a1d30] border-orange-500 shadow-2xl'
                  : 'bg-[#141624] border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-lg sm:text-xl text-white">Hard Copy (Physical Book)</h4>
                  <p className="text-sm text-zinc-300 mt-1 font-medium">Printed book delivered directly to your doorstep in Nigeria.</p>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${
                  bookType === 'hard' ? 'border-orange-500 bg-orange-600 text-white' : 'border-zinc-500'
                }`}>
                  {bookType === 'hard' && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-700 text-sm sm:text-base space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-medium">Book Price:</span>
                  <span className="font-extrabold text-white text-lg">₦10,000 / copy</span>
                </div>
                <div className="flex justify-between items-center text-orange-400 font-bold">
                  <span>Nationwide Delivery:</span>
                  <span>₦5,000</span>
                </div>
              </div>
            </div>

            {/* Soft Copy Card */}
            <div
              onClick={() => handleSelectBookType('soft')}
              className={`p-6 rounded-2xl border-3 cursor-pointer transition ${
                bookType === 'soft'
                  ? 'bg-[#1a1d30] border-orange-500 shadow-2xl'
                  : 'bg-[#141624] border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-lg sm:text-xl text-white">Soft Copy — Read Online</h4>
                  <p className="text-sm text-zinc-300 mt-1 font-medium">Instant access to read on your smartphone, tablet, or computer.</p>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${
                  bookType === 'soft' ? 'border-orange-500 bg-orange-600 text-white' : 'border-zinc-500'
                }`}>
                  {bookType === 'soft' && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-700 text-sm sm:text-base space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-medium">Price:</span>
                  <span className="font-extrabold text-orange-400 text-2xl">₦5,000</span>
                </div>
                <p className="text-emerald-400 text-sm font-bold">
                  ✓ Instant Access (Zero delivery fee)
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* IF SOFT COPY: BIG BUTTON */}
        {bookType === 'soft' && (
          <div className="bg-[#141624] border-2 border-orange-500 rounded-3xl p-8 sm:p-10 space-y-6 text-center sm:text-left shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Read Online (Instant Access)
                </h3>
                <p className="text-base sm:text-lg text-zinc-200 mt-1">
                  Price: <strong className="text-orange-400 text-xl font-bold">₦5,000</strong>. Click the big button below to get immediate access.
                </p>
              </div>
            </div>

            {/* Direct Selar Link Button */}
            <div className="pt-2">
              <a
                href={SELAR_SOFT_COPY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSoftCopyClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-5 px-10 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-lg sm:text-xl shadow-2xl transition transform active:scale-95"
              >
                <BookOpen className="w-6 h-6" />
                <span>Click Here to Read Online (₦5,000)</span>
                <ExternalLink className="w-5 h-5 ml-1" />
              </a>
            </div>
          </div>
        )}

        {/* IF HARD COPY: FORM */}
        {bookType === 'hard' && (
          <form onSubmit={handleSubmit} className="bg-[#141624] border-2 border-zinc-700 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
            
            {/* STEP 2: QUANTITY & BULK DISCOUNT */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">2</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Select Number of Copies:
                </h3>
              </div>

              {/* DISCOUNT TIERS PROMINENT BOX */}
              <div className="bg-[#1b1e32] p-5 sm:p-6 rounded-2xl border-2 border-zinc-600 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="text-base sm:text-lg font-bold text-white block">
                      How many copies do you need?
                    </label>
                    <p className="text-sm text-zinc-300 mt-0.5">
                      Standard price is ₦10,000 per copy. Click any tier below or adjust quantity.
                    </p>
                  </div>

                  {/* Large Clear Stepper */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-12 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xl flex items-center justify-center disabled:opacity-40 transition cursor-pointer border border-zinc-600"
                    >
                      <Minus className="w-5 h-5 stroke-[3]" />
                    </button>

                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-20 h-12 bg-[#0d0e17] border-2 border-orange-500 rounded-2xl text-center text-xl font-black text-white focus:outline-hidden"
                    />

                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-12 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xl flex items-center justify-center transition cursor-pointer border border-zinc-600"
                    >
                      <Plus className="w-5 h-5 stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* Clickable Discount Rates Display */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-center text-sm font-bold">
                  {/* 1 - 4 Copies */}
                  <button
                    type="button"
                    onClick={() => {
                      if (quantity >= 5) handleQuantityChange(1);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center relative flex flex-col items-center justify-between hover:scale-[1.02] active:scale-[0.98] ${
                      quantity < 5 
                        ? 'bg-[#1e2238] border-orange-500 shadow-lg ring-2 ring-orange-500/30 text-white' 
                        : 'bg-[#121422] border-zinc-700 hover:border-zinc-500 text-zinc-400'
                    }`}
                  >
                    {quantity < 5 && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
                    )}
                    <p className="text-xs uppercase font-extrabold tracking-wider text-zinc-300">1 – 4 Copies</p>
                    <p className="text-lg text-white font-black my-1.5">₦10,000 / copy</p>
                    <p className="text-xs text-zinc-400 font-medium">Standard Price</p>
                  </button>

                  {/* 5 - 9 Copies */}
                  <button
                    type="button"
                    onClick={() => {
                      if (quantity < 5 || quantity > 9) handleQuantityChange(5);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center relative flex flex-col items-center justify-between hover:scale-[1.02] active:scale-[0.98] ${
                      quantity >= 5 && quantity <= 9 
                        ? 'bg-emerald-950/90 border-emerald-500 shadow-lg ring-2 ring-emerald-500/30 text-emerald-200' 
                        : 'bg-[#121422] border-zinc-700 hover:border-emerald-600/50 text-zinc-400'
                    }`}
                  >
                    {quantity >= 5 && quantity <= 9 && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                    <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">5 – 9 Copies</p>
                    <p className="text-lg text-emerald-400 font-black my-1.5">10% DISCOUNT</p>
                    <p className="text-xs text-emerald-200 font-semibold">₦9,000 / copy (Save ₦1k/copy)</p>
                  </button>

                  {/* 10+ Copies */}
                  <button
                    type="button"
                    onClick={() => {
                      if (quantity < 10) handleQuantityChange(10);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center relative flex flex-col items-center justify-between hover:scale-[1.02] active:scale-[0.98] ${
                      quantity >= 10 
                        ? 'bg-emerald-950/90 border-emerald-500 shadow-lg ring-2 ring-emerald-500/30 text-emerald-200' 
                        : 'bg-[#121422] border-zinc-700 hover:border-emerald-600/50 text-zinc-400'
                    }`}
                  >
                    {quantity >= 10 && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
                    )}
                    <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">10+ Copies</p>
                    <p className="text-lg text-emerald-400 font-black my-1.5">20% DISCOUNT</p>
                    <p className="text-xs text-emerald-200 font-semibold">₦8,000 / copy (Save ₦2k/copy)</p>
                  </button>
                </div>

                {/* Active Savings Alert */}
                {discountPercent > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100 font-semibold flex items-center justify-between text-sm sm:text-base">
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-5 h-5 text-emerald-300 shrink-0" />
                      <span>
                        <strong>{discountPercent}% Discount Applied!</strong> You save ₦{discountAmount.toLocaleString()}.
                      </span>
                    </div>
                    <span className="font-extrabold text-white text-base sm:text-lg">
                      ₦{discountedBookTotal.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 3: DELIVERY DETAILS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">3</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Enter Your Delivery Details:
                </h3>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm sm:text-base font-bold text-white block mb-1.5">
                    Your Full Name: *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onFocus={handleFormFocus}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full bg-[#1b1e32] border-2 rounded-2xl px-4 py-3.5 text-base sm:text-lg text-white placeholder-zinc-400 focus:outline-hidden focus:border-orange-500 ${
                      errors.name ? 'border-red-500' : 'border-zinc-600'
                    }`}
                  />
                  {errors.name && <p className="text-xs sm:text-sm text-red-400 font-bold mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm sm:text-base font-bold text-white block mb-1.5">
                    Email Address: *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onFocus={handleFormFocus}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full bg-[#1b1e32] border-2 rounded-2xl px-4 py-3.5 text-base sm:text-lg text-white placeholder-zinc-400 focus:outline-hidden focus:border-orange-500 ${
                      errors.email ? 'border-red-500' : 'border-zinc-600'
                    }`}
                  />
                  {errors.email && <p className="text-xs sm:text-sm text-red-400 font-bold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm sm:text-base font-bold text-white block mb-1.5">
                    Phone Number (WhatsApp): *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onFocus={handleFormFocus}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className={`w-full bg-[#1b1e32] border-2 rounded-2xl px-4 py-3.5 text-base sm:text-lg text-white placeholder-zinc-400 focus:outline-hidden focus:border-orange-500 ${
                      errors.phone ? 'border-red-500' : 'border-zinc-600'
                    }`}
                  />
                  {errors.phone && <p className="text-xs sm:text-sm text-red-400 font-bold mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm sm:text-base font-bold text-white block mb-1.5">
                    Delivery Address in Nigeria: *
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onFocus={handleFormFocus}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your house or office address, city, and state"
                    className={`w-full bg-[#1b1e32] border-2 rounded-2xl px-4 py-3.5 text-base sm:text-lg text-white placeholder-zinc-400 focus:outline-hidden focus:border-orange-500 ${
                      errors.address ? 'border-red-500' : 'border-zinc-600'
                    }`}
                  />
                  {errors.address && <p className="text-xs sm:text-sm text-red-400 font-bold mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* STEP 4: PAYMENT OPTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">4</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Select Order Option:
                </h3>
              </div>

              <div className="space-y-3.5">
                {/* Option 1: Direct order */}
                <label
                  className={`p-5 rounded-2xl border-3 flex items-start justify-between cursor-pointer transition ${
                    deliveryOption === 'direct'
                      ? 'bg-[#1b1e32] border-orange-500 shadow-xl'
                      : 'bg-[#141624] border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="delivery_opt"
                      checked={deliveryOption === 'direct'}
                      onChange={() => setDeliveryOption('direct')}
                      className="accent-orange-600 w-5 h-5 mt-1"
                    />
                    <div>
                      <p className="font-black text-base sm:text-lg text-white">Direct Order (Full Payment)</p>
                      <p className="text-sm text-zinc-300 mt-1">
                        ₦{discountedBookTotal.toLocaleString()} ({quantity} {quantity > 1 ? 'copies' : 'copy'}) + ₦5,000 delivery fee
                      </p>
                    </div>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-orange-400 shrink-0">
                    ₦{grandTotal.toLocaleString()} Total
                  </span>
                </label>

                {/* Option 2: Pay on delivery */}
                <label
                  className={`p-5 rounded-2xl border-3 flex items-start justify-between cursor-pointer transition ${
                    deliveryOption === 'pod'
                      ? 'bg-[#1b1e32] border-orange-500 shadow-xl'
                      : 'bg-[#141624] border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="delivery_opt"
                      checked={deliveryOption === 'pod'}
                      onChange={() => setDeliveryOption('pod')}
                      className="accent-orange-600 w-5 h-5 mt-1"
                    />
                    <div>
                      <p className="font-black text-base sm:text-lg text-white">Pay on Delivery</p>
                      <p className="text-sm text-amber-200 mt-1 font-medium">
                        Pay ₦5,000 delivery fee now to process your order. Pay the balance of ₦{discountedBookTotal.toLocaleString()} when the book arrives.
                      </p>
                    </div>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-white shrink-0">
                    ₦5,000 Now
                  </span>
                </label>
              </div>

              {/* IMPORTANT NOTE BOX */}
              <div className="bg-amber-950/70 border-2 border-amber-500 p-5 rounded-2xl text-sm sm:text-base text-amber-100 space-y-2">
                <p className="font-black text-amber-300 flex items-center gap-2 text-base">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Important Note:</span>
                </p>
                <p>
                  • Delivery fee to anywhere in Nigeria is <strong>₦5,000</strong>.
                </p>
                <p>
                  • Pay on delivery is available too, but <strong>₦5,000 (delivery fee) is required upfront to process and dispatch your order</strong>.
                </p>
              </div>
            </div>

            {/* COST BREAKDOWN SUMMARY */}
            <div className="bg-black/80 p-6 rounded-2xl border-2 border-zinc-700 space-y-3">
              <div className="flex justify-between text-sm sm:text-base text-zinc-200 font-medium">
                <span>Book Cost ({quantity} {quantity > 1 ? 'copies' : 'copy'}):</span>
                <span className="font-bold">₦{rawBookTotal.toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-sm sm:text-base text-emerald-400 font-bold">
                  <span>Bulk Discount ({discountPercent}% OFF):</span>
                  <span>-₦{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-sm sm:text-base text-zinc-200 font-medium">
                <span>Nationwide Delivery Fee:</span>
                <span className="font-bold">₦{deliveryFee.toLocaleString()}</span>
              </div>

              <div className="border-t-2 border-zinc-700 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm sm:text-base text-zinc-300 font-bold">
                    {deliveryOption === 'direct' ? 'Total Amount Payable:' : 'Amount Required Now to Process:'}
                  </p>
                  {deliveryOption === 'pod' && (
                    <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-0.5">
                      Balance to pay on delivery: <strong>₦{balanceOnDelivery.toLocaleString()}</strong>
                    </p>
                  )}
                </div>
                <p className="text-3xl sm:text-4xl font-black text-orange-400">
                  ₦{amountDueNow.toLocaleString()}
                </p>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-8 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-lg sm:text-xl shadow-2xl transition transform active:scale-98 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing Your Order...</span>
                </>
              ) : (
                <>
                  <span>Submit Order ({quantity} {quantity > 1 ? 'Copies' : 'Copy'})</span>
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </>
              )}
            </button>
          </form>
        )}

      </main>

      {/* CONFIRMATION POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#141624] border-2 border-orange-500 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            
            {/* Close Modal Button */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Title */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono font-black text-orange-400 bg-orange-950 px-3 py-1 rounded-md border border-orange-500/40">
                  Ref: {orderRef}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Confirm Your Order
                </h3>
              </div>
            </div>

            {/* Main Instruction Alert */}
            <div className="bg-amber-950/80 border-2 border-amber-500/80 p-4 sm:p-5 rounded-2xl text-amber-100 text-sm sm:text-base space-y-2">
              <p className="font-black text-amber-300 text-base sm:text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Next Step to Complete Order:</span>
              </p>
              <p className="font-medium leading-relaxed">
                Please click the green button below to <strong>confirm your order and pay your ₦5,000 delivery fee on WhatsApp</strong> so we can package and dispatch your book immediately.
              </p>
            </div>

            {/* Order Summary in Popup */}
            <div className="bg-[#1b1e32] p-4 sm:p-5 rounded-2xl text-sm sm:text-base space-y-2 border border-zinc-700 text-zinc-200">
              <div className="flex justify-between">
                <span className="text-zinc-400">Customer Name:</span>
                <span className="font-bold text-white">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Number of Copies:</span>
                <span className="font-bold text-white">{quantity} copy/copies {discountPercent > 0 ? `(${discountPercent}% OFF)` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Selected Option:</span>
                <span className="font-bold text-white">{deliveryOption === 'direct' ? 'Direct Order' : 'Pay on Delivery'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="font-bold text-white text-right max-w-[60%] truncate">{address}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-700 pt-2 text-base">
                <span className="text-zinc-300 font-bold">Amount Due Now (Delivery Fee):</span>
                <span className="font-black text-orange-400 text-lg">₦{amountDueNow.toLocaleString()}</span>
              </div>
              {deliveryOption === 'pod' && (
                <div className="flex justify-between text-xs sm:text-sm text-amber-300">
                  <span>Balance to pay on delivery:</span>
                  <span className="font-bold">₦{balanceOnDelivery.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Action WhatsApp Button */}
            <div className="space-y-2.5 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppConfirmationClick}
                className="w-full py-5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-2xl transition transform active:scale-95 text-center"
              >
                <MessageSquare className="w-6 h-6 shrink-0" />
                <span>Confirm Order & Pay Delivery Fee on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="w-full py-3 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition text-center"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Clean Footer */}
      <footer className="border-t-2 border-zinc-800 py-8 px-4 text-center text-sm text-zinc-400 bg-[#0d0f18] mt-auto">
        <p className="text-zinc-200 font-bold text-base">
          LEGAL MAXIMS SIMPLIFIED: A Practical Guide For Everyone
        </p>
        <p className="mt-1.5 font-medium">
          By Sharon O. Olaniyi • Foreword by Professor Mojeed Olujinmi Alabi
        </p>
      </footer>

    </div>
  );
}
