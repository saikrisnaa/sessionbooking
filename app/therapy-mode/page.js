'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function TherapyMode() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState(null);
  const [filterType, setFilterType] = useState('slots');
  const [duration, setDuration] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Get duration from URL
    const params = new URLSearchParams(window.location.search);
    const durationParam = params.get('duration');
    if (durationParam) {
      setDuration(parseInt(durationParam));
    }
  }, []);

  const handleModeSelect = (mode) => {
    if (selectedMode === mode) {
      setSelectedMode(null);
    } else {
      setSelectedMode(mode);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  // Function to format time in 12-hour format with AM/PM
  const formatTime = (hour, minute = 0, forcePM = false) => {
    const period = forcePM || hour >= 12 ? 'PM' : 'AM';
    let displayHour = hour;
    if (forcePM && hour < 12) {
      displayHour += 12;
    }
    if (displayHour > 12) {
      displayHour -= 12;
    }
    return `${displayHour}:${minute.toString().padStart(2, '0')}${period}`;
  };

  // Generate time slot with end time based on duration
  const generateTimeSlot = (startHour, startMinute = 0, forcePM = false) => {
    const durationInMinutes = duration || 45; // default to 45 minutes if not set
    let endMinute = startMinute + durationInMinutes;
    let endHour = startHour;
    
    while (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
    }

    return `${formatTime(startHour, startMinute, forcePM)} - ${formatTime(endHour, endMinute, forcePM)}`;
  };

  const timeSlots = {
    morning: [
      generateTimeSlot(8, 0, false),
      generateTimeSlot(9, 0, false),
      generateTimeSlot(10, 0, false),
      generateTimeSlot(11, 0, false),
    ],
    afternoon: [
      generateTimeSlot(12, 0, true),
      generateTimeSlot(1, 0, true),
      generateTimeSlot(2, 0, true),
      generateTimeSlot(3, 0, true),
    ],
    evening: [
      generateTimeSlot(4, 0, true),
      generateTimeSlot(5, 0, true),
      generateTimeSlot(6, 0, true),
      generateTimeSlot(7, 0, true),
    ]
  };

  // Calendar utils
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Generate calendar days for the current month
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const calendarDays = generateCalendarDays(currentMonth);

  // Mock available dates (you would fetch this from an API)
  const generateAvailableDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // Generate some random available dates for the current month
    return [5, 8, 12, 15, 19, 22, 26, 29].map(day => day);
  };

  const availableDates = generateAvailableDates(currentMonth);

  const handlePreviousMonth = () => {
    const currentDate = new Date();
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    
    // Create dates with day set to 1 to compare only months and years
    const firstOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstOfNewMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    
    // Allow navigation if new date is not before current month
    if (firstOfNewMonth >= firstOfCurrentMonth) {
      setCurrentMonth(newDate);
      setSelectedDate(null);
    }
  };

  const handleNextMonth = () => {
    // Limit to next 3 months
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    if (newDate <= maxDate) {
      setCurrentMonth(newDate);
      setSelectedDate(null);
    }
  };

  const handleDateSelect = (day) => {
    if (day && availableDates.includes(day)) {
      const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setSelectedDate(formattedDate);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/available-sessions" className="hover:opacity-80">
            <Image
              src="/arrow-left.svg"
              alt="Back"
              width={24}
              height={24}
              className="text-gray-800"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Please Select Therapy Mode</h1>
        </div>

        {/* Mode Selection Buttons */}
        <div className="flex gap-6 justify-center mb-12">
          {/* In-Person Button */}
          <button
            onClick={() => handleModeSelect('inperson')}
            className={`flex flex-col items-center w-28 h-28 p-4 rounded-xl transition-colors ${
              selectedMode === 'inperson'
                ? 'bg-[#46BEE3] text-white'
                : 'border-2 border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
            }`}
          >
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/person-icon.svg"
                alt="In-Person"
                width={28}
                height={28}
                className={selectedMode === 'inperson' ? 'text-white' : 'text-[#46BEE3]'}
              />
            </div>
            <span className="text-sm font-semibold mt-2">In-Person</span>
          </button>

          {/* Video Button */}
          <button
            onClick={() => handleModeSelect('video')}
            className={`flex flex-col items-center w-28 h-28 p-4 rounded-xl transition-colors ${
              selectedMode === 'video'
                ? 'bg-[#46BEE3] text-white'
                : 'border-2 border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
            }`}
          >
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/video-icon.svg"
                alt="Video"
                width={28}
                height={28}
                className={selectedMode === 'video' ? 'text-white' : 'text-[#46BEE3]'}
              />
            </div>
            <span className="text-sm font-semibold mt-2">Video</span>
          </button>

          {/* Call Button */}
          <button
            onClick={() => handleModeSelect('call')}
            className={`flex flex-col items-center w-28 h-28 p-4 rounded-xl transition-colors ${
              selectedMode === 'call'
                ? 'bg-[#46BEE3] text-white'
                : 'border-2 border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
            }`}
          >
            <div className="flex-1 flex items-center justify-center">
              <svg
                className={`w-7 h-7 ${selectedMode === 'call' ? 'text-white' : 'text-[#46BEE3]'}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-sm font-semibold mt-2">Call</span>
          </button>
        </div>

        {/* Filter Section */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">Filter by</p>
          
          {/* Toggle Switch */}
          <div className="inline-flex rounded-full border-2 border-[#46BEE3] p-1">
            <button
              onClick={() => setFilterType('slots')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filterType === 'slots'
                  ? 'bg-[#46BEE3] text-white'
                  : 'text-[#46BEE3] hover:bg-blue-50'
              }`}
            >
              Slots
            </button>
            <button
              onClick={() => setFilterType('date')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filterType === 'date'
                  ? 'bg-[#46BEE3] text-white'
                  : 'text-[#46BEE3] hover:bg-blue-50'
              }`}
            >
              Date
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Time Slots Section */}
          {filterType === 'slots' && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Slot</h2>
              <div className="grid grid-cols-1 gap-8">
                {/* Morning Slots */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Morning</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.morning.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSlotSelect(`morning-${time}`)}
                        className={`py-2 px-3 rounded-lg text-xs transition-colors ${
                          selectedSlot === `morning-${time}`
                            ? 'bg-[#46BEE3] text-white'
                            : 'border border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Afternoon</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.afternoon.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSlotSelect(`afternoon-${time}`)}
                        className={`py-2 px-3 rounded-lg text-xs transition-colors ${
                          selectedSlot === `afternoon-${time}`
                            ? 'bg-[#46BEE3] text-white'
                            : 'border border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evening Slots */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Evening</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.evening.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleSlotSelect(`evening-${time}`)}
                        className={`py-2 px-3 rounded-lg text-xs transition-colors ${
                          selectedSlot === `evening-${time}`
                            ? 'bg-[#46BEE3] text-white'
                            : 'border border-[#46BEE3] text-[#46BEE3] hover:bg-blue-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column - Calendar Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Date</h2>
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <span className="inline-flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#46BEE3] mr-2"></div>
                  Available Dates
                </span>
              </div>
              
              {/* Calendar Grid */}
              <div className="border border-gray-200 rounded-lg p-4">
                {/* Month Navigation */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={handlePreviousMonth}
                    disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
                    className={`p-2 transition-colors ${
                      currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <h3 className="text-lg font-medium text-gray-900">
                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day && (
                        <button
                          onClick={() => handleDateSelect(day)}
                          disabled={!availableDates.includes(day)}
                          className={`w-full h-full flex items-center justify-center text-sm rounded-lg transition-colors ${
                            selectedDate && new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) === selectedDate
                              ? 'bg-[#46BEE3] text-white'
                              : availableDates.includes(day)
                              ? 'text-[#46BEE3] hover:bg-blue-50'
                              : 'text-gray-400'
                          }`}
                        >
                          {day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-8">
          <button
            onClick={() => {
              if (selectedDate && selectedMode && selectedSlot) {
                router.push(`/booking-details?date=${selectedDate}&time=${selectedSlot}&mode=${selectedMode}`);
              }
            }}
            disabled={!selectedDate || !selectedMode || !selectedSlot}
            className={`w-full py-3 px-6 rounded-lg text-center transition-colors ${
              selectedDate && selectedMode && selectedSlot
                ? 'bg-[#46BEE3] text-white hover:bg-[#3EADD0]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
