function LandingPageFooter() {
  // TODO REFACTOR
  return (
    <footer
      className="text-gray-400 bg-gray-900 py-8"
      style={{
        background: 'rgb(29, 29, 31)', // Matches Apple's dark tone
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Shop and Learn
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Mac
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  iPad
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  iPhone
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Watch
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Apple Music
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Apple TV+
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  iCloud
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Apple Books
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Apple Store
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Find a Store
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Genius Bar
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Today at Apple
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Apple Camp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              About Apple
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Investors
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Events
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Jobs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Social Media and Legal Section */}
        <div className="flex flex-col sm:flex-row justify-between text-sm">
          <div className="mb-4 sm:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Sales Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Site Map
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-gray-500">
              © 2024 Dummy Footer Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandingPageFooter;
