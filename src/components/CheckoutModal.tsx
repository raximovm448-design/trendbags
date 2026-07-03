import React, { useState } from "react";
import { CartItem } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
        alert("Please complete all fields to proceed.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        alert("Please complete card credentials to checkout.");
        return;
      }
      setStep(3);
    }
  };

  const handleCompleteOrder = () => {
    onOrderCompleted();
    onClose();
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    });
  };

  const orderNumber = "COACH-83920147";

  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex justify-center items-center p-4 overflow-y-auto backdrop-blur-xs animate-fade-in">
      {/* Outer panel to click outside and close (only if not success screen) */}
      <div className="absolute inset-0" onClick={step !== 3 ? onClose : undefined} />

      <div className="relative bg-[#ffffff] dark:bg-[#1b1b1b] w-full max-w-2xl shadow-2xl z-10 border border-[#E5E5E5] dark:border-[#4c4546] animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E5E5] dark:border-[#4c4546] flex justify-between items-center bg-[#f9f9f9] dark:bg-[#1b1b1b]">
          <h3 className="text-[18px] font-bold tracking-tight text-[#1a1c1c] dark:text-[#ffffff] uppercase font-headline-lg-mobile">
            {step === 1 && "Shipping & Invoicing"}
            {step === 2 && "Payment & Review"}
            {step === 3 && "Order Confirmed"}
          </h3>
          {step !== 3 && (
            <button
              onClick={onClose}
              className="p-1 cursor-pointer hover:opacity-75 text-[#000000] dark:text-[#ffffff]"
              aria-label="Close checkout"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Progress Indicators */}
          {step !== 3 && (
            <div className="flex gap-4 mb-8">
              <div className="flex-1">
                <div className={`h-1.5 ${step >= 1 ? "bg-[#000000] dark:bg-[#ffffff]" : "bg-[#eeeeee]"}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mt-1.5 block">
                  1. Delivery
                </span>
              </div>
              <div className="flex-1">
                <div className={`h-1.5 ${step >= 2 ? "bg-[#000000] dark:bg-[#ffffff]" : "bg-[#eeeeee]"}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mt-1.5 block">
                  2. Payment
                </span>
              </div>
              <div className="flex-1">
                <div className={`h-1.5 ${step === 3 ? "bg-[#000000] dark:bg-[#ffffff]" : "bg-[#eeeeee]"}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mt-1.5 block">
                  3. Receipt
                </span>
              </div>
            </div>
          )}

          {/* Form Content */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="E.g. John Doe"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div className="col-span-full">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div className="col-span-full">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, building, floor"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Paris"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Zip / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="75001"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>

              {/* Summary brief */}
              <div className="bg-[#f9f9f9] dark:bg-[#2f3131] p-4 border border-[#E5E5E5] dark:border-[#4c4546] mt-6 flex justify-between items-center">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5]">Total Cart Subtotal</p>
                  <p className="text-[18px] font-bold text-black dark:text-white mt-1">{subtotal} €</p>
                </div>
                <span className="text-[11px] bg-[#000000]/10 dark:bg-white/10 px-3 py-1 font-bold text-[#1a1c1c] dark:text-[#ffffff] uppercase tracking-wider">
                  Complimentary Shipping
                </span>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-[#000000] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#000000] font-label-caps text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                Continue to Payment
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="E.g. John Doe"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div className="col-span-full">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Credit Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="4000 1234 5678 9010"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    required
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] block mb-2">
                    Security Code (CVV)
                  </label>
                  <input
                    type="password"
                    name="cardCvv"
                    required
                    maxLength={4}
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full border-b border-[#E5E5E5] dark:border-[#4c4546] py-2 px-1 focus:border-[#000000] dark:focus:border-[#ffffff] bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>

              {/* Order review info */}
              <div className="bg-[#f9f9f9] dark:bg-[#2f3131] p-4 border border-[#E5E5E5] dark:border-[#4c4546] mt-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mb-2">Delivery Summary</p>
                <p className="text-[13px] font-semibold text-black dark:text-white">{formData.fullName}</p>
                <p className="text-[12px] text-[#5d5f5f] dark:text-[#cfc4c5]">{formData.address}, {formData.city}, {formData.zipCode}</p>
                <p className="text-[12px] text-[#5d5f5f] dark:text-[#cfc4c5] mt-1">{formData.email}</p>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-[#000000] dark:border-[#ffffff] text-[#000000] dark:text-[#ffffff] font-label-caps text-[12px] uppercase tracking-widest font-bold cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="flex-2 py-4 bg-[#CC0000] hover:bg-red-700 text-white font-label-caps text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  Pay {subtotal} €
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#000000] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl select-none">verified</span>
              </div>

              <p className="text-[12px] font-bold text-[#CC0000] uppercase tracking-widest mb-1">
                Thank you for your order
              </p>
              <h2 className="text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight mb-2">
                Order Placed Successfully
              </h2>
              <p className="text-[14px] text-[#5d5f5f] dark:text-[#cfc4c5] max-w-md mx-auto leading-relaxed mb-6">
                We've received your request! Your transaction has been completed securely and a copy of the receipt has been dispatched to <span className="font-bold text-black dark:text-white">{formData.email}</span>.
              </p>

              {/* Order Card details */}
              <div className="bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#E5E5E5] dark:border-[#4c4546] p-5 max-w-sm mx-auto space-y-3 mb-8 text-left text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Order Number:</span>
                  <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Recipient:</span>
                  <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Delivery Address:</span>
                  <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff] truncate max-w-[200px]" title={formData.address}>
                    {formData.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Grand Total Paid:</span>
                  <span className="font-bold text-[#CC0000]">{subtotal} €</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E5E5] dark:border-[#4c4546]">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Estimated Arrival:</span>
                  <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">July 07, 2026</span>
                </div>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="px-8 py-4 bg-[#000000] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#000000] font-label-caps text-[12px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2"
              >
                Continue Shopping
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
