import React, { useState } from 'react';
import { CheckCircle2, Copy, Download, MessageSquare, ArrowRight, Printer, BookOpen, ShieldCheck, Check } from 'lucide-react';
import { BOOK_INFO, BANK_DETAILS } from '../data/bookData';

export interface CompletedOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  editionName: string;
  editionFormat: string;
  quantity: number;
  deliveryState: string;
  deliveryAddress: string;
  deliveryFee: number;
  discount: number;
  subtotal: number;
  total: number;
  paymentMethod: 'bank_transfer' | 'online' | 'pod';
  inscription?: string;
  date: string;
}

interface OrderConfirmationModalProps {
  order: CompletedOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSample: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onOpenSample
}) => {
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isOpen || !order) return null;

  const handleCopyOrderRef = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // WhatsApp prefilled message
  const whatsappText = encodeURIComponent(
    `Hello Sharon / Lex Mentors team, I just placed an order for the book "Legal Maxims Simplified".\n\n` +
    `• Order Ref: ${order.orderId}\n` +
    `• Name: ${order.customerName}\n` +
    `• Edition: ${order.editionName} (Qty: ${order.quantity})\n` +
    `• Total: ₦${order.total.toLocaleString()}\n` +
    `• Payment Method: ${order.paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer' : order.paymentMethod === 'pod' ? 'Pay on Delivery' : 'Online Payment'}\n` +
    `• Destination: ${order.deliveryState}\n\n` +
    `Please confirm my order and dispatch schedule.`
  );

  const whatsappUrl = `https://wa.me/${BOOK_INFO.authorWhatsapp}?text=${whatsappText}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#12131a] border border-orange-500/40 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-950/60 via-zinc-900 to-amber-950/40 p-6 border-b border-zinc-800 text-center relative">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 bg-orange-950/80 px-3 py-1 rounded-full border border-orange-500/30">
            Order Successfully Placed
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-white mt-2">
            Thank You For Your Order!
          </h3>
          <p className="text-xs text-zinc-300 font-lora mt-1 max-w-md mx-auto">
            Your copy of <span className="text-white font-semibold">Legal Maxims Simplified</span> by Sharon O. Olaniyi has been received.
          </p>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#0e0f14]">
          {/* Order Ref Banner */}
          <div className="bg-[#181a24] p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono">Official Order Reference</p>
              <p className="text-lg sm:text-xl font-mono font-bold text-orange-400 tracking-wider">
                {order.orderId}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{order.date}</p>
            </div>
            <button
              type="button"
              onClick={handleCopyOrderRef}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Copied' : 'Copy Ref'}</span>
            </button>
          </div>

          {/* Payment Guidance if Bank Transfer */}
          {order.paymentMethod === 'bank_transfer' && (
            <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-2xl space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-200">
                    Bank Transfer Payment Instructions
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    Please transfer the exact sum of <span className="font-bold text-white font-mono">₦{order.total.toLocaleString()}</span> to either account below and send proof to our WhatsApp helpline:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-black/60 p-3 rounded-xl border border-amber-500/30">
                  <p className="text-[10px] text-zinc-400 uppercase font-mono">Bank 1 (GTBank)</p>
                  <p className="font-mono text-sm font-bold text-white">{BANK_DETAILS.accountNumber}</p>
                  <p className="text-[11px] text-amber-300 font-medium">{BANK_DETAILS.accountName}</p>
                  <p className="text-[10px] text-zinc-400">{BANK_DETAILS.bankName}</p>
                </div>

                <div className="bg-black/60 p-3 rounded-xl border border-amber-500/30">
                  <p className="text-[10px] text-zinc-400 uppercase font-mono">Bank 2 (Zenith Bank)</p>
                  <p className="font-mono text-sm font-bold text-white">{BANK_DETAILS.secondaryBank.accountNumber}</p>
                  <p className="text-[11px] text-amber-300 font-medium">{BANK_DETAILS.secondaryBank.accountName}</p>
                  <p className="text-[10px] text-zinc-400">{BANK_DETAILS.secondaryBank.bankName}</p>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank ? 'Copied GTB Number!' : 'Copy GTB Account Number'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Digital Edition Instant Download Note */}
          {order.editionFormat === 'Digital eBook' && (
            <div className="bg-emerald-950/30 border border-emerald-500/40 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Instant eBook Access Granted</span>
                </h4>
                <p className="text-xs text-zinc-300 mt-0.5">
                  We have queued your PDF and ePub download link to <span className="text-white font-mono">{order.customerEmail}</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenSample}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Read Sample Now</span>
              </button>
            </div>
          )}

          {/* Order Summary Details Table */}
          <div className="bg-[#151620] p-5 rounded-2xl border border-zinc-800 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-zinc-300 tracking-wider uppercase border-b border-zinc-800 pb-2">
              Invoice Summary
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Book Item:</span>
                <span className="font-semibold text-white">{order.editionName} × {order.quantity}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Format:</span>
                <span className="text-zinc-200">{order.editionFormat}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Recipient:</span>
                <span className="text-zinc-200">{order.customerName} ({order.customerPhone})</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Destination:</span>
                <span className="text-zinc-200 text-right max-w-xs">{order.deliveryAddress}, {order.deliveryState}</span>
              </div>
              {order.inscription && (
                <div className="flex justify-between text-zinc-400">
                  <span>Author Note:</span>
                  <span className="text-orange-300 italic text-right">&ldquo;{order.inscription}&rdquo;</span>
                </div>
              )}
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="font-mono text-zinc-200">₦{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied:</span>
                  <span className="font-mono">-₦{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Delivery Logistics:</span>
                <span className="font-mono text-zinc-200">
                  {order.deliveryFee === 0 ? 'FREE' : `₦${order.deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-zinc-700 pt-2.5 flex justify-between text-base font-bold text-white">
                <span>Total Amount:</span>
                <span className="font-mono text-orange-400">₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-5 border-t border-zinc-800 bg-[#161822] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-semibold transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
