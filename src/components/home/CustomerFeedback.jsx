import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const CustomerFeedback = () => {
    const feedbacks = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Small Business Owner',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
            content: 'LoanLink helped me expand my boutique when traditional banks said no. The process was incredibly fast and transparent.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Freelance Designer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
            content: 'I needed a quick loan for new equipment. The application took 5 minutes and I had the funds the next day. Highly recommended!',
            rating: 5,
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Teacher',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
            content: 'Educational loans are usually a headache, but LoanLink made it simple. Low interest rates and great support.',
            rating: 4,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from people who have achieved their financial goals with us.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {feedbacks.map((feedback) => (
                        <motion.div
                            key={feedback.id}
                            variants={itemVariants}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl relative"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-4 right-8 text-6xl text-primary-200 dark:text-gray-700 font-serif opacity-50">
                                "
                            </div>

                            <div className="flex items-center space-x-4 mb-6 relative z-10">
                                <img
                                    src={feedback.image}
                                    alt={feedback.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{feedback.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{feedback.role}</p>
                                </div>
                            </div>

                            <div className="flex mb-4 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={`w-5 h-5 ${i < feedback.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic relative z-10">
                                "{feedback.content}"
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CustomerFeedback;
