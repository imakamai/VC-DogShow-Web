import React from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram, ShieldCheck, Dog } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4 text-white">
                            <Dog className="h-8 w-8 text-orange-500" />
                            <span className="text-xl font-bold">VC Dog Show</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-6 max-w-sm">
                            The premier platform for organizing and participating in dog shows.
                            Celebrate the beauty and talent of our canine companions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/dogs" className="hover:text-orange-400 transition-colors">Dogs</Link>
                            </li>
                            <li>
                                <Link to="/apply" className="hover:text-orange-400 transition-colors">Apply</Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="hover:text-orange-400 transition-colors">Pricing</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-orange-500" />
                                <a href="mailto:contact@dogshow.com" className="hover:text-white transition-colors">
                                    contact@dogshow.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-orange-500" />
                                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                                    +1 234 567 890
                                </a>
                            </li>
                            <li className="flex items-center gap-4 mt-4">
                                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
                                    <Facebook className="h-4 w-4" />
                                </a>
                                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
                                    <Twitter className="h-4 w-4" />
                                </a>
                                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
                                    <Instagram className="h-4 w-4" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} VC Dog Show. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
                        <span className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                            Secure Platform
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
