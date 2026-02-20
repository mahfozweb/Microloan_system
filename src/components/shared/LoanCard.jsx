import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getLoanVisuals } from "../../utils/loanVisuals";

const LoanCard = ({ loan, variants }) => {
    const visuals = getLoanVisuals(loan.category);

    return (
        <motion.div
            layout
            variants={variants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8 }}
            className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border ${visuals.borderColor} hover:shadow-2xl transition-all duration-500 flex flex-col group h-full`}
        >
            {/* Icon Header */}
            <div className={`relative h-28 md:h-32 flex items-center justify-center ${visuals.color} border-b ${visuals.borderColor}`}>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110 duration-300 bg-white/50 dark:bg-gray-800/50">
                    {visuals.icon}
                </div>
            </div>

            <div className="p-5 md:p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {loan.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                    {loan.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6 bg-gray-50/50 dark:bg-gray-900/40 p-3 md:p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                            Amount
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {loan.amount}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                            Interest
                        </span>
                        <span className="font-bold text-primary-600 dark:text-primary-400">
                            {loan.interest}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                            Duration
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {loan.duration}
                        </span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mb-6 flex">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                        Available Now
                    </span>
                </div>

                {/* Apply Button */}
                <Link
                    to={`/loans/${loan._id}`}
                    className="mt-auto block w-full py-3 md:py-4 text-center rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 active:scale-[0.98] transform group-hover:-translate-y-1"
                >
                    Apply Now
                </Link>
            </div>
        </motion.div>
    );
};

export default LoanCard;
