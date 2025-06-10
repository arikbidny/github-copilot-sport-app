import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="p-4 h-full">
      <div className="flex justify-center pb-10">
        <Image
          src="/copilotimage.avif"
          alt="copilot"
          width="800"
          height="600"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to our sports application powered by GitHub Copilot! We are dedicated to providing
          you with the latest information about sports events, players, and analytics.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p className="text-lg mb-2">
            <span className="font-medium">Phone:</span> 050423123123
          </p>
          <p className="text-lg mb-2">
            <span className="font-medium">Email:</span> contact@sportsapp.com
          </p>
          <p className="text-lg mb-2">
            <span className="font-medium">Address:</span> 123 Sports Avenue, Tech City
          </p>
        </div>
      </div>
    </div>
  );
}