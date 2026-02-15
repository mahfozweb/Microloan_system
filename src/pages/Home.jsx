import { Helmet } from 'react-helmet-async';
import HeroBanner from '../components/home/HeroBanner';
import AvailableLoans from '../components/home/AvailableLoans';
import HowItWorks from '../components/home/HowItWorks';
import CustomerFeedback from '../components/home/CustomerFeedback';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>LoanLink - Microloan Request & Approval Tracker</title>
                <meta name="description" content="Access microloans quickly and easily with LoanLink" />
            </Helmet>

            <HeroBanner />
            <AvailableLoans />
            <HowItWorks />
            <CustomerFeedback />
        </>
    );
};

export default Home;
