'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function BookingInfo() {
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');
  const selectedMode = searchParams.get('mode');
  const price = "₹1500"; // This can be dynamic based on therapy mode

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Booking Details</h2>
          <div className="mt-2 text-gray-600">
            <p>Date: {selectedDate}</p>
            <p>Time: {selectedTime}</p>
            <p>Mode: {selectedMode}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Session Fee</p>
          <p className="text-2xl font-bold text-[#46BEE3]">{price}</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingDetails() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isEmployerReferred: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would submit the form data to your backend here
    // After successful submission, navigate to the confirmation page
    router.push(`/booking-confirmation?email=${encodeURIComponent(formData.email)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Arrow */}
      <button
        onClick={() => router.back()}
        className="fixed top-8 left-8 p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <div className="max-w-3xl mx-auto">
        {/* Booking Summary Card wrapped in Suspense */}
        <Suspense fallback={<div className="bg-white rounded-lg shadow-lg p-6 mb-8">Loading booking details...</div>}>
          <BookingInfo />
        </Suspense>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#46BEE3] focus:border-[#46BEE3] text-gray-900"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#46BEE3] focus:border-[#46BEE3] text-gray-900"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#46BEE3] focus:border-[#46BEE3] text-gray-900"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#46BEE3] focus:border-[#46BEE3] text-gray-900"
                required
              />
            </div>
          </div>

          {/* Employer Referral */}
          <div className="mb-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isEmployerReferred"
                checked={formData.isEmployerReferred}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#46BEE3] focus:ring-[#46BEE3] border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Have you been referred by your employer?</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#46BEE3] text-white py-3 px-6 rounded-lg hover:bg-[#3EADD0] transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
