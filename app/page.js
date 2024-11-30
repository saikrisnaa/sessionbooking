import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left 40% - User Profile Section */}
      <div className="w-[40%] bg-[#46BEE3] p-6 sticky top-0 h-screen flex flex-col justify-center items-center">
        <div className="w-[85%] bg-white rounded-2xl py-8 px-6 shadow-lg mb-6">
          <div className="flex flex-col items-center gap-6">
            {/* Profile Image */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-white">
              <Image
                src="/profile-placeholder.jpg"
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            
            {/* Therapy Icon */}
            <div className="w-16 h-16">
              <Image
                src="/therapy-icon.svg"
                alt="Therapy Icon"
                width={64}
                height={64}
                priority
              />
            </div>
            
            {/* Profile Info */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Dr. John Doe</h1>
              <p className="text-sm text-gray-600 mt-2">Psychologist & Mental Health Expert</p>
              <p className="text-sm text-gray-500 mt-1">New York, USA</p>
            </div>
          </div>
        </div>
        {/* Book Session Button */}
        <Link href="/available-sessions" className="w-[85%]">
          <button className="w-full bg-white text-[#46BEE3] px-6 py-2.5 rounded-full hover:bg-blue-50 transition-colors font-semibold text-base shadow-lg">
            Book Session
          </button>
        </Link>
      </div>

      {/* Right 60% - Details Section */}
      <div className="w-[60%] p-12 overflow-y-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* About Me Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed">
              With over 15 years of experience in clinical psychology, I specialize in helping individuals overcome anxiety, depression, and relationship issues. My approach combines cognitive behavioral therapy with mindfulness techniques to provide comprehensive care tailored to each client's needs.
            </p>
          </section>

          {/* Credentials Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Credentials</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Ph.D. in Clinical Psychology - Stanford University</li>
              <li>Licensed Clinical Psychologist - New York State</li>
              <li>Certified CBT Practitioner</li>
              <li>Member of American Psychological Association</li>
            </ul>
          </section>

          {/* Available Sessions Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available on</h2>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <button className="w-20 h-20 flex items-center justify-center bg-white border-2 border-[#46BEE3] text-[#46BEE3] rounded-lg hover:bg-blue-50 transition-colors">
                  <Image
                    src="/person-icon.svg"
                    alt="In-person"
                    width={32}
                    height={32}
                    className="text-[#46BEE3]"
                  />
                </button>
                <span className="mt-2 text-sm font-medium text-gray-700">In-person Session</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-20 h-20 flex items-center justify-center bg-white border-2 border-[#46BEE3] text-[#46BEE3] rounded-lg hover:bg-blue-50 transition-colors">
                  <Image
                    src="/video-icon.svg"
                    alt="Video call"
                    width={32}
                    height={32}
                    className="text-[#46BEE3]"
                  />
                </button>
                <span className="mt-2 text-sm font-medium text-gray-700">Video/Voice Call</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
