export const Footer = () => {
  return (
    <>
      <div className="h-20 w-full"></div>
      <div className="w-full h-20 flex items-center justify-between px-6 fixed bottom-0 bg-primary border-t border-gray-700 text-gray-300">
        <p className="text-sm md:text-base font-medium">
          Copyright © 2024 ebo_ecommerse Official. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm md:text-base text-gray-300 hover:text-white transition-all"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm md:text-base text-gray-300 hover:text-white transition-all"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm md:text-base text-gray-300 hover:text-white transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};
