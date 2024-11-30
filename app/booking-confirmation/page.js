'use client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="max-w-md w-full space-y-8 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-[#46BEE3] rounded-full mx-auto flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>

      {/* Confirmation Message */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-gray-600">
          Congratulations! Your therapy session has been successfully scheduled.
        </p>
        <p className="text-sm text-gray-500">
          A confirmation email with the details has been sent to {email}
        </p>
      </div>

      {/* Back to Home Button */}
      <div className="pt-6">
        <Link 
          href="/"
          className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-[#46BEE3] rounded-lg hover:bg-[#3EADD0] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmation() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="pt-6">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
