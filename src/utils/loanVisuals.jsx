import {
    FiDollarSign,
    FiBriefcase,
    FiHome,
    FiBook,
    FiTrendingUp,
    FiShoppingCart,
    FiHeart,
    FiCreditCard,
} from "react-icons/fi";

export const getLoanVisuals = (category) => {
    switch (category?.toLowerCase()) {
        case 'personal':
            return {
                icon: <FiDollarSign className="w-8 h-8 text-blue-500" />,
                color: "bg-blue-50 dark:bg-blue-900/20",
                borderColor: "border-blue-100 dark:border-blue-800",
            };
        case 'business':
            return {
                icon: <FiBriefcase className="w-8 h-8 text-purple-500" />,
                color: "bg-purple-50 dark:bg-purple-900/20",
                borderColor: "border-purple-100 dark:border-purple-800",
            };
        case 'education':
            return {
                icon: <FiBook className="w-8 h-8 text-orange-500" />,
                color: "bg-orange-50 dark:bg-orange-900/20",
                borderColor: "border-orange-100 dark:border-orange-800",
            };
        case 'renovation':
            return {
                icon: <FiHome className="w-8 h-8 text-green-500" />,
                color: "bg-green-50 dark:bg-green-900/20",
                borderColor: "border-green-100 dark:border-green-800",
            };
        default:
            return {
                icon: <FiCreditCard className="w-8 h-8 text-gray-500" />,
                color: "bg-gray-50 dark:bg-gray-900/20",
                borderColor: "border-gray-100 dark:border-gray-800",
            };
    }
};
