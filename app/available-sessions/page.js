'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AvailableSessions() {
  const [selectedSession, setSelectedSession] = useState({
    therapy: null,
    duration: null
  });

  const handleDurationSelect = (therapy, duration) => {
    // If clicking the same button again, deselect it
    if (selectedSession.therapy === therapy && selectedSession.duration === duration) {
      setSelectedSession({
        therapy: null,
        duration: null
      });
    } else {
      // Otherwise, select the new button
      setSelectedSession({
        therapy,
        duration
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="hover:opacity-80">
            <Image
              src="/arrow-left.svg"
              alt="Back"
              width={24}
              height={24}
              className="text-gray-800"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Available Sessions</h1>
        </div>
        
        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Individual Therapy Card */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 ${
            selectedSession.therapy === 'individual' ? 'ring-2 ring-[#46BEE3]' : ''
          }`}>
            {/* Price */}
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-800">
                ₹3200<span className="text-lg font-normal text-gray-600">/session</span>
              </p>
            </div>

            {/* Time Duration Buttons */}
            <div className="flex gap-2 mb-6">
              {[45, 60, 90].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationSelect('individual', duration)}
                  className={`flex-1 py-2 px-3 text-sm border-2 rounded-lg transition-colors ${
                    selectedSession.therapy === 'individual' && selectedSession.duration === duration
                      ? 'bg-[#46BEE3] text-white border-[#46BEE3]'
                      : 'border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
                  }`}
                >
                  {duration}min
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Individual Therapy</h2>
            <div className="mb-6">
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>One-on-one personalized sessions</li>
                <li>Tailored treatment approach</li>
                <li>Flexible scheduling options</li>
                <li>Progress monitoring</li>
              </ul>
            </div>
            <Link
              href={selectedSession.duration ? `/therapy-mode?duration=${selectedSession.duration}` : '#'}
              className={`w-full py-3 px-6 rounded-lg text-center transition-colors ${
                selectedSession.duration
                  ? 'bg-[#46BEE3] text-white hover:bg-[#3EADD0]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed
            </Link>
          </div>

          {/* Couples Therapy Card */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 ${
            selectedSession.therapy === 'couples' ? 'ring-2 ring-[#46BEE3]' : ''
          }`}>
            {/* Price */}
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-800">
                ₹4200<span className="text-lg font-normal text-gray-600">/session</span>
              </p>
            </div>

            {/* Time Duration Buttons */}
            <div className="flex gap-2 mb-6">
              {[45, 60, 90].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationSelect('couples', duration)}
                  className={`flex-1 py-2 px-3 text-sm border-2 rounded-lg transition-colors ${
                    selectedSession.therapy === 'couples' && selectedSession.duration === duration
                      ? 'bg-[#46BEE3] text-white border-[#46BEE3]'
                      : 'border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
                  }`}
                >
                  {duration}min
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Couples Therapy</h2>
            <div className="mb-6">
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Joint counseling sessions</li>
                <li>Relationship strengthening</li>
                <li>Communication improvement</li>
                <li>Conflict resolution strategies</li>
              </ul>
            </div>
            <Link
              href={selectedSession.duration ? `/therapy-mode?duration=${selectedSession.duration}` : '#'}
              className={`w-full py-3 px-6 rounded-lg text-center transition-colors ${
                selectedSession.duration
                  ? 'bg-[#46BEE3] text-white hover:bg-[#3EADD0]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed
            </Link>
          </div>

          {/* Group Therapy Card */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 ${
            selectedSession.therapy === 'group' ? 'ring-2 ring-[#46BEE3]' : ''
          }`}>
            {/* Price */}
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-800">
                ₹2500<span className="text-lg font-normal text-gray-600">/session</span>
              </p>
            </div>

            {/* Time Duration Buttons */}
            <div className="flex gap-2 mb-6">
              {[45, 60, 90].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationSelect('group', duration)}
                  className={`flex-1 py-2 px-3 text-sm border-2 rounded-lg transition-colors ${
                    selectedSession.therapy === 'group' && selectedSession.duration === duration
                      ? 'bg-[#46BEE3] text-white border-[#46BEE3]'
                      : 'border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
                  }`}
                >
                  {duration}min
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Therapy</h2>
            <div className="mb-6">
              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                <li>Small group sessions (4-6 people)</li>
                <li>Peer support environment</li>
                <li>Shared learning experience</li>
                <li>Cost-effective option</li>
              </ul>
            </div>
            <Link
              href={selectedSession.duration ? `/therapy-mode?duration=${selectedSession.duration}` : '#'}
              className={`w-full py-3 px-6 rounded-lg text-center transition-colors ${
                selectedSession.duration
                  ? 'bg-[#46BEE3] text-white hover:bg-[#3EADD0]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
