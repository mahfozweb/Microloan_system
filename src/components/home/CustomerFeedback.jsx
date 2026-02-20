import { motion } from 'framer-motion';
import { FiStar, FiUser } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const CustomerFeedback = () => {
    const feedbacks = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Small Business Owner',
            image: null, // Placeholder to test fallback or use specific images if desired
            content: 'LoanLink helped me expand my boutique when traditional banks said no. The process was incredibly fast and transparent.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Freelance Designer',
            image: null,
            content: 'I needed a quick loan for new equipment. The application took 5 minutes and I had the funds the next day. Highly recommended!',
            rating: 5,
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Teacher',
            image: null,
            content: 'Educational loans are usually a headache, but LoanLink made it simple. Low interest rates and great support.',
            rating: 4,
        },
        {
            id: 4,
            name: 'David Wilson',
            role: 'Tech Startup Founder',
            image: null,
            content: 'The dashboard is intuitive and the approval speed is unmatched. A game changer for startups.',
            rating: 5,
        },
        {
            id: 5,
            name: 'Jessica Martinez',
            role: 'Healthcare Professional',
            image: null,
            content: 'Fair rates and excellent customer service. I felt valued throughout the entire process.',
            rating: 5,
        }
    ];

    // Create a sequence long enough to fill the screen (at least 2x original if small, or ensure it's wide enough)
    // Then duplicate THAT sequence to create the seamless loop.
    // 5 items * ~400px = 2000px. Safe for most screens.
    // We strictly need 2 copies of the "screen-filling" content for -50% logic to work seamlessly.

    // Let's just use the array 4 times to be super safe. 
    // Set 1: [A, B, C, D, E]
    // Set 2: [A, B, C, D, E]
    // Render: [Set 1, Set 2] -> Animate 0% to -50%.

    const doubleFeedbacks = [...feedbacks, ...feedbacks];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Don't just take our word for it. Join thousands of satisfied customers achieving their financial goals.
                    </p>
                </div>
            </div>

            {/* Gradient Overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 h-full w-24 md:w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-24 md:w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

            {/* Slider Container */}
            <div className="flex overflow-hidden">
                <motion.div
                    className="flex gap-8 px-8"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust for speed
                    }}
                    style={{ width: "max-content" }}
                >
                    {/* Render Double Set */}
                    {[...doubleFeedbacks, ...doubleFeedbacks].map((feedback, index) => (
                        <div
                            key={`${feedback.id}-${index}`}
                            className="w-[350px] md:w-[450px] flex-shrink-0 bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl relative border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <FaQuoteLeft className="absolute top-6 right-8 text-5xl text-primary-200 dark:text-gray-700 opacity-50" />

                            <div className="flex items-center space-x-4 mb-6 relative z-10">
                                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl">
                                    <FiUser />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white font-display">
                                        {feedback.name}
                                    </h3>
                                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                                        {feedback.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex mb-4 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-4 h-4 mr-1 ${i < feedback.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed relative z-10">
                                "{feedback.content}"
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CustomerFeedback;
