import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiAward, FiShield } from 'react-icons/fi';

const About = () => {
    const stats = [
        { label: 'Loans Disbursed', value: '$2M+', icon: <FiAward className="w-6 h-6" /> },
        { label: 'Happy Customers', value: '5,000+', icon: <FiUsers className="w-6 h-6" /> },
        { label: 'Success Rate', value: '98%', icon: <FiTarget className="w-6 h-6" /> },
        { label: 'Secure Transactions', value: '100%', icon: <FiShield className="w-6 h-6" /> },
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
            bio: 'Visionary leader with 15+ years in fintech and micro-lending.',
        },
        {
            name: 'David Chen',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
            bio: 'Operational excellence expert ensuring smooth loan processing.',
        },
        {
            name: 'Emily Davis',
            role: 'Customer Success lead',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
            bio: 'Dedicated to providing the best support experience for our users.',
        },
    ];

    return (
        <>
            <Helmet>
                <title>About Us - LoanLink</title>
                <meta name="description" content="Learn more about LoanLink's mission to empower financial growth." />
            </Helmet>

            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                {/* Hero Section */}
                <section className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Empowering Financial Growth
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                        >
                            We believe that everyone deserves tailored financial solutions to achieve their dreams.
                            LoanLink connects you with the resources you need, when you need them.
                        </motion.p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    To provide accessible, transparent, and fair lending services that empower individuals and small businesses to reach their full potential.
                                </p>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white pt-4">Our Vision</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    A world where financial barriers are removed, and opportunity is available to all through innovative technology and human-centric service.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                                    alt="Team collaboration"
                                    className="rounded-2xl shadow-xl w-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 bg-primary-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                        {stat.icon}
                                    </div>
                                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-primary-100">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Meet Our Leadership</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                                        <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{member.role}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
