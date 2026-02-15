import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMap, FiSend } from 'react-icons/fi';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - LoanLink</title>
                <meta name="description" content="Get in touch with LoanLink for support or inquiries." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 md:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Contact Info */}
                            <div className="p-8 md:p-12 bg-primary-600 text-white relative flex flex-col justify-between">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Talk</h2>
                                    <p className="text-lg text-primary-100 mb-12 max-w-md">
                                        We're here to help you with any questions about our loan services.
                                        Reach out to us and we'll respond within 24 hours.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-4 group cursor-pointer">
                                            <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                                                <FiMail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-xl mb-1">Email Us</h3>
                                                <p className="text-primary-100">sazzadhossain2005@gmail.com</p>
                                                <p className="text-primary-100 opacity-70">support@loanlink.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 group cursor-pointer">
                                            <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                                                <FiPhone className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-xl mb-1">Call Us</h3>
                                                <p className="text-primary-100">+880 1888-566804</p>
                                                <p className="text-primary-100 opacity-70">Mon - Fri, 9am - 6pm</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 group cursor-pointer">
                                            <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                                                <FiMap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-xl mb-1">Visit Us</h3>
                                                <p className="text-primary-100">123 Finance Avenue</p>
                                                <p className="text-primary-100 opacity-70">Dhaka, Bangladesh</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 text-sm text-primary-200 opacity-80">
                                    &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="p-8 md:p-12 lg:p-16 bg-white dark:bg-gray-800">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <span className="animate-pulse">Sending...</span>
                                        ) : status === 'success' ? (
                                            <span className="text-green-200">Message Sent!</span>
                                        ) : (
                                            <>
                                                Send Message <FiSend />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Contact;
