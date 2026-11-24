import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Check, MessageSquare, ArrowRight, ShieldCheck, 
  ExternalLink, CheckCircle2, Loader2, Plus, Minus, Tag, X,
  Copy, Building2, CreditCard, ArrowLeft, Clock, MapPin
} from 'lucide-react';
import bookCoverImg from './assets/book-cover.jpg';
import { trackPixelEvent } from './utils/pixel';

const SELAR_SOFT_COPY_LINK = "https://selar.com/y18t00200g";
const WHATSAPP_PHONE = "2349048402122";
const FORMATTED_PHONE = "+234 904 840 2122";

const GOOGLE_SCRIPT_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwIV50ieJ1C_YCZQSbYR0bMlN9H20fRBcdpkha3kg6JSrJLa_I7-BsMgcKD8SW7EFyiuw/exec"; 

// Official Publisher Bank Accounts
const BANK_ACCOUNTS = [
  {
    id: 'moniepoint',
    bankName: 'Moniepoint MFB',
    accountNumber: '7039938934',
    accountName: 'Sharon Olaniyi',
    tag: 'Instant Confirmation',
    accentColor: 'orange'
  },
  {
    id: 'opay',
    bankName: 'Opay',
    accountNumber: '6140343865',
    accountName: 'Sharon Olaniyi',
    tag: 'Fast Transfer',
    accentColor: 'emerald'
  }
];

// Realistic recent verified purchase notifications across Nigeria
const RECENT_PURCHASES = [
  {
    buyer: "Emeka O., Esq.",
    location: "Ikeja, Lagos",
    copies: "1 Hard Copy (Direct Order)",
    timeAgo: "4 minutes ago"
  },
  {
    buyer: "Amina Bello",
    location: "Maitama, Abuja (FCT)",
    copies: "2 Hard Copies (Free Delivery)",
    timeAgo: "9 minutes ago"
  },
  {
    buyer: "Chidinma E. (UNILAG Law)",
    location: "Akoka, Lagos",
    copies: "5 Copies (Study Group Pack • 30% OFF)",
    timeAgo: "14 minutes ago"
  },
  {
    buyer: "Tunde Adeleke",
    location: "Bodija, Ibadan",
    copies: "1 Hard Copy (Pay on Delivery)",
    timeAgo: "19 minutes ago"
  },
  {
    buyer: "Folashade A., Esq.",
    location: "Port Harcourt, Rivers",
    copies: "3 Hard Copies",
    timeAgo: "26 minutes ago"
  },
  {
    buyer: "Kelechi N. (OAU Law Faculty)",
    location: "Ile-Ife, Osun State",
    copies: "5 Copies (30% Discount Applied)",
    timeAgo: "33 minutes ago"
  },
  {
    buyer: "Ibrahim K.",
    location: "Kano Municipal, Kano",
    copies: "1 Hard Copy (Direct Order)",
    timeAgo: "41 minutes ago"
  },
  {
    buyer: "Sharon A.",
    location: "GRA, Benin City",
    copies: "1 Hard Copy (Free Delivery)",
    timeAgo: "48 minutes ago"
  }
];

export default function App() {
  // Page View: 'order' (Main Order Page) or 'payment' (Payment & Bank Details Page)
  const [currentPage, setCurrentPage] = useState<'order' | 'payment'>('order');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Book Selection: 'hard' (Physical book) or 'soft' (Read online via Selar)
  const [bookType, setBookType] = useState<'hard' | 'soft'>('hard');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryOption, setDeliveryOption] = useState<'direct' | 'pod'>('direct');

  // Customer Contact & Delivery Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Live Purchase Notification Alert State (Come and go cycle)
  const [activeAlertIndex, setActiveAlertIndex] = useState<number>(0);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // 1. Meta Pixel: Fire ViewContent on load
  useEffect(() => {
    trackPixelEvent('ViewContent', {
      content_name: 'Legal Maxims Simplified: A Practical Guide For Everyone',
      content_category: 'Law Book / Legal Education',
      content_ids: ['LMS-BOOK-2026'],
      content_type: 'product',
      value: 15000,
      currency: 'NGN'
    });
  }, []);

  // 2. Meta Pixel: Fire InitiateCheckout when viewing the payment page
  useEffect(() => {
    if (currentPage === 'payment' && orderRef) {
      trackPixelEvent('InitiateCheckout', {
        content_name: 'Legal Maxims Simplified - Payment Page',
        content_type: 'product',
        content_ids: ['LMS-HARD-COPY'],
        num_items: quantity,
        value: amountDueNow,
        currency: 'NGN',
        order_id: orderRef
      });
    }
  }, [currentPage, orderRef]);

  // Live Purchase Notification Rotator: Smoothly comes and goes
  useEffect(() => {
    if (isDismissed) return;

    let hideTimer: ReturnType<typeof setTimeout>;

    // Initial gentle appearance after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setIsAlertVisible(true);
      hideTimer = setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }, 3500);

    // Periodic cycle: appears for 5 seconds, goes away for 10 seconds (total 15s period)
    const interval = setInterval(() => {
      setActiveAlertIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
      setIsAlertVisible(true);
      hideTimer = setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  // Pricing & Discount Calculations (₦15,000 unit price, Free Nationwide Delivery, 30% off for 5+ copies)
  const unitPrice = 15000;
  const rawBookTotal = quantity * unitPrice;
  const discountPercent = quantity >= 5 ? 30 : 0;
  const discountAmount = Math.round((rawBookTotal * discountPercent) / 100);
  const discountedBookTotal = rawBookTotal - discountAmount;
  const grandTotal = discountedBookTotal;

  // Pay on Delivery Policy: ₦5,000 commitment deposit required upfront to dispatch order
  const podCommitmentDeposit = 5000;
  const amountDueNow = deliveryOption === 'direct' ? grandTotal : Math.min(grandTotal, podCommitmentDeposit);
  const balanceOnDelivery = deliveryOption === 'pod' ? Math.max(0, grandTotal - podCommitmentDeposit) : 0;

  // 1-Click Clipboard Copy with Feedback
  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleQuantityChange = (qty: number) => {
    const validQty = Math.max(1, Math.min(100, qty || 1));
    setQuantity(validQty);

    const dPercent = validQty >= 5 ? 30 : 0;
    const dTotal = (validQty * unitPrice) - Math.round((validQty * unitPrice * dPercent) / 100);

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

    trackPixelEvent('SelectContent', {
      content_type: 'product',
      content_name: type === 'hard' ? 'Legal Maxims (Hard Copy)' : 'Legal Maxims (Soft Copy - Read Online)',
      value: type === 'hard' ? 15000 : 5000,
      currency: 'NGN'
    });
  };

  const handleSoftCopyClick = () => {
    trackPixelEvent('ClickReadOnline', {
      value: 5000,
      currency: 'NGN',
      destination: 'Selar'
    }, true);
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

  // 3. Meta Pixel: Submitting the form tracks AddToCart
  const handleSubmitOrder = async (e: React.FormEvent) => {
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
      deliveryOption: deliveryOption === 'direct' ? 'Direct Order (Full Payment)' : 'Pay on Delivery',
      deliveryFee: 'FREE (Nationwide Offer)',
      discountedBookCost: `₦${discountedBookTotal.toLocaleString()}`,
      totalCost: `₦${grandTotal.toLocaleString()}`,
      amountDueNow: `₦${amountDueNow.toLocaleString()}`,
      balanceOnDelivery: deliveryOption === 'pod' ? `₦${balanceOnDelivery.toLocaleString()}` : '₦0 (Paid)'
    };

    // Track AddToCart on submission
    trackPixelEvent('AddToCart', {
      content_name: 'Legal Maxims Simplified (Hard Copy)',
      content_type: 'product',
      content_ids: ['LMS-HARD-COPY'],
      num_items: quantity,
      value: amountDueNow,
      currency: 'NGN',
      order_id: ref
    });

    // Send order row to Google Sheets Web App
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
    setCurrentPage('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Meta Pixel: The button to send receipt on WhatsApp tracks Purchase
  const handleSendReceiptWhatsAppClick = () => {
    trackPixelEvent('Purchase', {
      content_name: 'Legal Maxims Simplified (Hard Copy)',
      content_type: 'product',
      content_ids: ['LMS-HARD-COPY'],
      num_items: quantity,
      value: amountDueNow,
      currency: 'NGN',
      order_id: orderRef,
      delivery_option: deliveryOption
    });
  };

  // Prefilled WhatsApp message containing all submitted details
  const whatsappMessage = encodeURIComponent(
    `Hello Sharon, I have made payment for my order of "Legal Maxims Simplified".\n\n` +
    `• Order Reference: ${orderRef || 'NEW-ORDER'}\n` +
    `• Full Name: ${name}\n` +
    `• Email: ${email}\n` +
    `• Phone Number: ${phone}\n` +
    `• Book Type: Hard Copy (Physical Book)\n` +
    `• Quantity: ${quantity} copy/copies${discountPercent > 0 ? ` (${discountPercent}% Discount Applied - Saved ₦${discountAmount.toLocaleString()})` : ''}\n` +
    `• Delivery Address: ${address}\n` +
    `• Nationwide Delivery: FREE (Special Offer)\n` +
    `• Order Option: ${deliveryOption === 'direct' ? 'Direct Order (Full Payment)' : 'Pay on Delivery'}\n` +
    `• Total Order Cost: ₦${grandTotal.toLocaleString()}\n` +
    `• Amount Paid: ₦${amountDueNow.toLocaleString()}${deliveryOption === 'pod' ? `\n• Balance to Pay on Delivery: ₦${balanceOnDelivery.toLocaleString()}` : ''}\n\n` +
    `I have attached my bank transfer payment receipt. Please confirm my payment and dispatch my order.`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`;
  const currentAlert = activeAlertIndex !== null ? RECENT_PURCHASES[activeAlertIndex] : null;

  return (
    <div className="min-h-screen bg-[#0a0b10] text-zinc-100 font-['Montserrat',sans-serif] selection:bg-orange-600 selection:text-white flex flex-col antialiased">
      
      {/* Top Header */}
      <header className="border-b-2 border-zinc-800 bg-[#12141f] py-4 px-4 sm:px-6 sticky top-0 z-30 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-extrabold text-base sm:text-xl tracking-wider text-white">
              LEGAL MAXIMS SIMPLIFIED
            </h1>
            <p className="text-xs text-orange-400 font-bold">
              Official Book Order Portal
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold hidden sm:inline-block">
            ✓ Nationwide Free Delivery Active
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* ======================================================== */}
        {/* VIEW 1: MAIN ORDER PAGE                                  */}
        {/* ======================================================== */}
        {currentPage === 'order' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
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
                  Centuries of Latin jurisprudence distilled into plain English with everyday Nigerian courtroom applications and relatable examples.
                </p>

                {/* Key Bullet Features */}
                <div className="space-y-3 pt-2 text-sm sm:text-base text-zinc-200 font-medium">
                  <div className="p-3.5 rounded-2xl bg-orange-950/50 border-2 border-orange-500/60 flex items-center gap-3.5 shadow-md">
                    <Check className="w-6 h-6 text-orange-400 stroke-[3] shrink-0" />
                    <div>
                      <p className="text-base sm:text-lg font-black text-white">
                        Over 1,100+ Legal Maxims Included
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-300 font-normal">
                        Exhaustive A–Z coverage across 10 distinct subject areas of Nigerian law.
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

            {/* STEP 1: CHOOSE FORMAT */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">1</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Choose Which Format You Want:
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
                      <p className="text-sm text-zinc-300 mt-1 font-medium">Printed book delivered directly to your doorstep anywhere in Nigeria.</p>
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
                      <span className="font-extrabold text-white text-lg">₦15,000 / copy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 font-medium">Nationwide Delivery:</span>
                      <span className="text-emerald-400 font-black text-xs sm:text-sm flex items-center gap-1 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                        FREE (Special Promo Offer)
                      </span>
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
                      <p className="text-sm text-zinc-300 mt-1 font-medium">Instant access to read on your smartphone, tablet, or laptop via Selar.</p>
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
                      ✓ Instant Access (Zero shipping fee)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* IF SOFT COPY: BIG SELAR BUTTON */}
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
                      Price: <strong className="text-orange-400 text-xl font-bold">₦5,000</strong>. Click the button below to read immediately.
                    </p>
                  </div>
                </div>

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

            {/* IF HARD COPY: ORDER FORM */}
            {bookType === 'hard' && (
              <form onSubmit={handleSubmitOrder} className="bg-[#141624] border-2 border-zinc-700 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
                
                {/* STEP 2: QUANTITY & BULK DISCOUNT */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">2</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Select Number of Copies:
                    </h3>
                  </div>

                  <div className="bg-[#1b1e32] p-5 sm:p-6 rounded-2xl border-2 border-zinc-600 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <label className="text-base sm:text-lg font-bold text-white block">
                          How many copies do you need?
                        </label>
                        <p className="text-sm text-zinc-300 mt-0.5">
                          Standard price is ₦15,000 per copy with FREE delivery nationwide. 5 copies and above attract a 30% discount!
                        </p>
                      </div>

                      {/* Stepper Buttons */}
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

                    {/* Discount Tier Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-center text-sm font-bold">
                      {/* 1 - 4 Copies */}
                      <button
                        type="button"
                        onClick={() => {
                          if (quantity >= 5) handleQuantityChange(1);
                        }}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-center relative flex flex-col items-center justify-between hover:scale-[1.01] active:scale-[0.98] ${
                          quantity < 5 
                            ? 'bg-[#1e2238] border-orange-500 shadow-lg ring-2 ring-orange-500/30 text-white' 
                            : 'bg-[#121422] border-zinc-700 hover:border-zinc-500 text-zinc-400'
                        }`}
                      >
                        {quantity < 5 && (
                          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-orange-500" />
                        )}
                        <p className="text-xs uppercase font-extrabold tracking-wider text-zinc-300">1 – 4 Copies</p>
                        <p className="text-xl text-white font-black my-1.5">₦15,000 / copy</p>
                        <p className="text-xs text-emerald-400 font-semibold">Standard Price • Free Delivery Nationwide</p>
                      </button>

                      {/* 5+ Copies (30% Discount) */}
                      <button
                        type="button"
                        onClick={() => {
                          if (quantity < 5) handleQuantityChange(5);
                        }}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-center relative flex flex-col items-center justify-between hover:scale-[1.01] active:scale-[0.98] ${
                          quantity >= 5 
                            ? 'bg-emerald-950/90 border-emerald-500 shadow-lg ring-2 ring-emerald-500/30 text-emerald-200' 
                            : 'bg-[#121422] border-zinc-700 hover:border-emerald-600/50 text-zinc-400'
                        }`}
                      >
                        {quantity >= 5 && (
                          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        )}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                            Best Value
                          </span>
                          <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">5+ Copies</p>
                        </div>
                        <p className="text-xl text-emerald-400 font-black my-1.5">30% DISCOUNT</p>
                        <p className="text-xs text-emerald-200 font-semibold">₦10,500 / copy (Save ₦4,500/copy • Free Delivery)</p>
                      </button>
                    </div>

                    {/* Active Savings Alert */}
                    {discountPercent > 0 && (
                      <div className="p-4 rounded-xl bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100 font-semibold flex items-center justify-between text-sm sm:text-base">
                        <div className="flex items-center gap-2.5">
                          <Tag className="w-5 h-5 text-emerald-300 shrink-0" />
                          <span>
                            <strong>{discountPercent}% Bulk Discount Applied!</strong> You save ₦{discountAmount.toLocaleString()} (₦10,500/copy).
                          </span>
                        </div>
                        <span className="font-extrabold text-white text-base sm:text-lg">
                          ₦{discountedBookTotal.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* STEP 3: CONTACT & DELIVERY DETAILS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-orange-600 text-white text-base flex items-center justify-center font-black">3</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Enter Your Delivery Details:
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm sm:text-base font-bold text-white block mb-1.5">
                        Your Full Name: *
                      </label>
                      <input
                        type="text"
                        value={name}
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
                          <div className="flex items-center gap-2">
                            <p className="font-black text-base sm:text-lg text-white">Direct Order (Full Payment)</p>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Recommended
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300 mt-1">
                            ₦{discountedBookTotal.toLocaleString()} ({quantity} {quantity > 1 ? 'copies' : 'copy'}) • Free Nationwide Doorstep Delivery
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
                            Pay ₦5,000 commitment deposit now to dispatch. Pay balance of ₦{balanceOnDelivery.toLocaleString()} upon arrival.
                          </p>
                        </div>
                      </div>
                      <span className="text-lg sm:text-xl font-black text-white shrink-0">
                        ₦5,000 Now
                      </span>
                    </label>
                  </div>

                  {/* NOTICE ABOUT PAY ON DELIVERY POLICY & SPECIAL OFFER */}
                  <div className="bg-amber-950/70 border-2 border-amber-500 p-5 sm:p-6 rounded-2xl text-sm sm:text-base text-amber-100 space-y-3.5 shadow-xl">
                    <div className="flex items-center gap-2.5 text-amber-300 font-black text-base sm:text-lg border-b border-amber-500/40 pb-2.5">
                      <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                      <span>Notice: Special Offer & Pay on Delivery Policy</span>
                    </div>
                    
                    <div className="space-y-2.5 text-sm sm:text-base leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-black text-base shrink-0 mt-0.5">✓</span>
                        <div>
                          <strong className="text-white">Special Promo Offer:</strong> We have an active offer of <strong className="text-emerald-300 uppercase">Free Delivery Nationwide</strong> across all Nigerian states. The cost of the hardcopy book is now <strong>₦15,000</strong> per copy.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="text-amber-400 font-black text-base shrink-0 mt-0.5">⚠️</span>
                        <div>
                          <strong className="text-white">Pay on Delivery Policy:</strong> For customers who choose <strong>Pay on Delivery</strong>, a mandatory commitment fee/deposit of <strong>₦5,000 is required upfront</strong> before your parcel is packaged and dispatched.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="text-orange-400 font-black text-base shrink-0 mt-0.5">•</span>
                        <div>
                          <strong className="text-white">Why is this required?</strong> This upfront payment confirms your order seriousness and protects against dispatch failures and uncollected courier deliveries.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-black text-base shrink-0 mt-0.5">•</span>
                        <div>
                          <strong className="text-white">Deducted from Total:</strong> The ₦5,000 is credited to your order. You only pay the balance of <strong className="text-white font-mono">₦{balanceOnDelivery.toLocaleString()}</strong> to the rider when the book reaches your hands.
                        </div>
                      </div>

                      <div className="pt-2 border-t border-amber-500/30 text-xs sm:text-sm text-zinc-300">
                        💡 <em>Want zero balance upon arrival? Choose <strong>Direct Order (Full Payment)</strong> to pay once in full and enjoy priority free delivery.</em>
                      </div>
                    </div>
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
                    <span>Nationwide Doorstep Delivery:</span>
                    <span className="font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 text-xs sm:text-sm">
                      FREE (Special Offer)
                    </span>
                  </div>

                  <div className="border-t-2 border-zinc-700 pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm sm:text-base text-zinc-300 font-bold">
                        {deliveryOption === 'direct' ? 'Total Amount Payable Now:' : 'Amount Required Now to Dispatch:'}
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
                      <span>Saving Order Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Order & Proceed to Payment</span>
                      <ArrowRight className="w-6 h-6 stroke-[3]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: DEDICATED PAYMENT & ACCOUNT DETAILS PAGE          */}
        {/* ======================================================== */}
        {currentPage === 'payment' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Navigation Bar with Back Button & Progress Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Modify Order Details</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Step 1: Order Submitted</span>
                </span>
                <span className="text-zinc-600">→</span>
                <span className="flex items-center gap-1.5 text-orange-400 bg-orange-950/80 px-3 py-1.5 rounded-full border border-orange-500/40">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span>Step 2: Transfer & Send Receipt</span>
                </span>
              </div>
            </div>

            {/* Order Confirmation Banner with Order Reference */}
            <div className="bg-gradient-to-r from-orange-950/50 via-[#161826] to-amber-950/40 border-2 border-orange-500/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40 shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-orange-400 bg-orange-950 px-3 py-1 rounded-full border border-orange-500/30">
                    Order Saved Successfully
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5">
                    Make Payment to Confirm Order
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-medium">
                    Transfer the required amount below to complete your order and submit your receipt on WhatsApp.
                  </p>
                </div>
              </div>

              {/* Order Reference Box with 1-Click Copy */}
              <div className="bg-[#0e101a] p-4 rounded-2xl border border-zinc-700 text-center sm:text-right shrink-0 w-full sm:w-auto">
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">Official Order Ref</p>
                <p className="font-mono text-xl sm:text-2xl font-black text-orange-400 tracking-wider">
                  {orderRef}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(orderRef, 'ref')}
                  className="mt-1.5 text-xs text-zinc-300 hover:text-white inline-flex items-center gap-1 font-semibold transition cursor-pointer"
                >
                  {copiedItem === 'ref' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied Ref!
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Ref</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AMOUNT DUE NOW HERO CARD (WITH CLICK TO COPY) */}
            <div className="bg-[#141624] border-2 border-orange-500 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-400">
                    {deliveryOption === 'direct' ? 'Total Amount To Transfer' : 'Amount Required Now (Commitment Deposit)'}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ₦{amountDueNow.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 mt-1.5">
                    {deliveryOption === 'direct' ? (
                      <span className="text-emerald-400 font-semibold">
                        ✓ Full payment for {quantity} {quantity > 1 ? 'copies' : 'copy'} (Free Nationwide Doorstep Delivery included)
                      </span>
                    ) : (
                      <span className="text-amber-300 font-semibold">
                        ⚠️ ₦5,000 Commitment Deposit to dispatch. Balance of ₦{balanceOnDelivery.toLocaleString()} is paid upon delivery.
                      </span>
                    )}
                  </p>
                </div>

                {/* CLICK TO COPY AMOUNT BUTTON */}
                <button
                  type="button"
                  onClick={() => handleCopy(amountDueNow.toString(), 'amount')}
                  className={`px-6 py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2.5 transition transform active:scale-95 cursor-pointer shadow-lg shrink-0 ${
                    copiedItem === 'amount'
                      ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border-2 border-zinc-600'
                  }`}
                >
                  {copiedItem === 'amount' ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Amount Copied (₦{amountDueNow.toLocaleString()})!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Click to Copy Amount (₦{amountDueNow.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* OFFICIAL BANK ACCOUNTS TO TRANSFER TO */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <Building2 className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl sm:text-2xl font-black">
                  Official Publisher Accounts:
                </h3>
              </div>
              <p className="text-sm text-zinc-300">
                Please transfer exactly <strong className="text-white">₦{amountDueNow.toLocaleString()}</strong> into either account below. Click the button to copy the account number:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {BANK_ACCOUNTS.map((bank) => {
                  const isCopied = copiedItem === bank.id;
                  const isMoniepoint = bank.id === 'moniepoint';

                  return (
                    <div 
                      key={bank.id} 
                      className={`bg-[#1b1e32] border-2 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl transition relative overflow-hidden ${
                        isMoniepoint ? 'border-zinc-600 hover:border-orange-500' : 'border-zinc-600 hover:border-emerald-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                            isMoniepoint 
                              ? 'bg-orange-600/20 text-orange-400 border-orange-500/40' 
                              : 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
                          }`}>
                            {isMoniepoint ? <Building2 className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                          </div>
                          <div>
                            <p className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-400">
                              {isMoniepoint ? 'Account Option 1' : 'Account Option 2'}
                            </p>
                            <h4 className="text-xl font-black text-white">{bank.bankName}</h4>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                          isMoniepoint 
                            ? 'bg-orange-950 text-orange-300 border-orange-500/30' 
                            : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {bank.tag}
                        </span>
                      </div>

                      <div className="bg-[#0e101a] p-4 rounded-2xl border border-zinc-700/80 space-y-1">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Account Number:</p>
                        <p className="font-mono text-2xl sm:text-3xl font-black text-white tracking-widest">
                          {bank.accountNumber}
                        </p>
                        <p className="text-sm text-zinc-300 pt-1 font-medium">
                          Account Name: <strong className="text-white">{bank.accountName}</strong>
                        </p>
                      </div>

                      {/* COPY ACCOUNT NUMBER BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleCopy(bank.accountNumber, bank.id)}
                        className={`w-full py-4 px-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition transform active:scale-98 cursor-pointer shadow-md ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : isMoniepoint
                              ? 'bg-orange-600 hover:bg-orange-500 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-5 h-5 stroke-[3]" />
                            <span>Copied {bank.bankName} ({bank.accountNumber})!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            <span>Click to Copy {bank.bankName} ({bank.accountNumber})</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* NEXT STEP: WHATSAPP RECEIPT SUBMISSION CARD */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-[#131b26] to-emerald-950/70 border-2 border-emerald-500 p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shrink-0 shadow-lg font-black text-xl">
                  ✓
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    Submit Payment Receipt on WhatsApp
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-200 mt-1">
                    After completing your bank transfer, click the green button below to send your receipt on WhatsApp. Your submitted order details will be automatically prefilled!
                  </p>
                </div>
              </div>

              {/* WHATSAPP ACTION BUTTON THAT TRACKS PURCHASE */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSendReceiptWhatsAppClick}
                className="w-full py-5 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-2xl transition transform active:scale-98 text-center cursor-pointer"
              >
                <MessageSquare className="w-7 h-7 shrink-0" />
                <span>Send Payment Receipt on WhatsApp</span>
                <ArrowRight className="w-6 h-6 shrink-0" />
              </a>

              <p className="text-center text-xs text-zinc-400">
                Official Author & Publisher Line: {FORMATTED_PHONE} • Fast Dispatch Confirmation
              </p>
            </div>

            {/* SUMMARY OF SUBMITTED ORDER DETAILS */}
            <div className="bg-[#141624] p-6 sm:p-7 rounded-3xl border-2 border-zinc-700 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
                <h4 className="font-extrabold text-white text-base sm:text-lg">
                  Submitted Order Summary
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('order');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs text-orange-400 hover:text-orange-300 font-bold underline cursor-pointer"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300">
                <div>
                  <span className="text-zinc-500 block text-xs">Customer Name:</span>
                  <strong className="text-white text-base">{name}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Phone / WhatsApp:</span>
                  <strong className="text-white text-base">{phone}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Email Address:</span>
                  <span className="text-zinc-200">{email}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Number of Copies:</span>
                  <strong className="text-white">
                    {quantity} {quantity > 1 ? 'copies' : 'copy'}{discountPercent > 0 ? ` (${discountPercent}% OFF applied)` : ''}
                  </strong>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-zinc-500 block text-xs">Delivery Address:</span>
                  <span className="text-zinc-200">{address}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Selected Option:</span>
                  <strong className="text-white">
                    {deliveryOption === 'direct' ? 'Direct Order (Full Payment)' : 'Pay on Delivery'}
                  </strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Nationwide Delivery:</span>
                  <span className="text-emerald-400 font-bold">FREE (Special Offer)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Total Order Cost:</span>
                  <strong className="text-white font-mono text-base">₦{grandTotal.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Amount Due Now:</span>
                  <strong className="text-orange-400 font-mono text-lg">₦{amountDueNow.toLocaleString()}</strong>
                </div>
                {deliveryOption === 'pod' && (
                  <div className="sm:col-span-2 pt-2 border-t border-zinc-700/60 text-xs sm:text-sm text-amber-300">
                    <span>Balance to be paid to the courier upon delivery: </span>
                    <strong className="text-white font-mono text-base">₦{balanceOnDelivery.toLocaleString()}</strong>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* REALISTIC LIVE PURCHASE NOTIFICATION ALERT TOAST (COMES AND GOES SMOOTHLY) */}
      {!isDismissed && currentAlert && (
        <aside
          aria-live="polite"
          className={`fixed bottom-4 left-4 z-40 max-w-sm w-[90%] sm:w-auto bg-[#151726]/95 border border-zinc-700 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl transition-all duration-500 ease-in-out transform ${
            isAlertVisible
              ? 'translate-y-0 opacity-100 pointer-events-auto scale-100'
              : 'translate-y-6 opacity-0 pointer-events-none scale-95'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-11 h-14 rounded-lg overflow-hidden shrink-0 border border-zinc-600 bg-black">
              <img src={bookCoverImg} alt="Book cover" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-[11px] font-bold text-white truncate">
                  {currentAlert.buyer}
                </p>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified
                </span>
              </div>

              <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-1 font-medium">
                Purchased: <strong className="text-orange-400">{currentAlert.copies}</strong>
              </p>

              <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-1">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-zinc-500" />
                  {currentAlert.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-zinc-400">
                  <Clock className="w-2.5 h-2.5 text-zinc-500" />
                  {currentAlert.timeAgo}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAlertVisible(false);
                setIsDismissed(true);
              }}
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
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
