import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary-500 text-white p-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-secondary-500 mb-4">Use Smart Event Manager</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Create Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Event Marketing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-secondary-500 mb-4">Plan Events</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Sell Tickets Online
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Event Planning
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-secondary-500 mb-4">Find Events</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Bangalore Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Music Events
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-secondary-500 mb-4">Connect With Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-neutral-300">
        <p>© 2025 Smart Event Manager</p>
      </div>
    </footer>
  );
}

export default Footer;