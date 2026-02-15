import { motion } from 'framer-motion';
import { FiUserCheck, FiFileText, FiDollarSign } from 'react-icons/fi';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'Apply Online',
            description: 'Complete our simple online application form in minutes.',
            icon: <FiFileText className="w-10 h-10 text-white" />,
            color: 'bg-blue-500',
        },
        {
            id: 2,
            title: 'Get Approved',
            description: 'Our automated system reviews your application instantly.',
            icon: <FiUserCheck className="w-10 h-10 text-white" />,
            color: 'bg-purple-500',
        },
        {
            id: 3,
            title: 'Receive Funds',
            description: 'Once approved, funds are disbursed directly to your account.',
            icon: <FiDollarSign className="w-10 h-10 text-white" />,
            color: 'bg-green-500',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Simple 3-Step Process
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Getting a loan shouldn't be complicated. We've streamlined the process for you.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>

                    {steps.map((step) => (
                        <motion.div
                            key={step.id}
                            variants={itemVariants}
                            className="text-center relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg transform -translate-y-12 ${step.color}`}>
                                {step.icon}
                            </div>
                            <div className="-mt-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
