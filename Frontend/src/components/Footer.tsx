import Button from './Button';
import FooterSection from './FooterSection';
import InputField from './InputField';

const footerSections = [
  {
    header: 'Quick Links',
    points: ['About Us', 'Contact Us', 'Support Center', 'Blog Posts', 'FAQs'],
  },
  {
    header: 'Resources',
    points: ['Webinars', 'Case Studies', 'E-books', 'Guides', 'Newsletters'],
  },
  {
    header: 'Stay Connected',
    points: [
      'Social Media',
      'Link Twelve',
      'Community Forum',
      'Feedback',
      'Careers',
      'Partnerships',
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#121826] text-white flex flex-col p-10 gap-32 xl:p-20 xl:gap-40">
      <div className="flex flex-col xl:flex-row justify-between">
        <img className="h-28 cursor-pointer" src="logo.svg" alt="" />
        <div className="flex gap-5 sm:gap-20 justify-around mb-10 xl:mb-0">
          <div className="flex flex-col gap-4">
            <FooterSection
              header={footerSections[0].header}
              points={footerSections[0].points}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FooterSection
              header={footerSections[1].header}
              points={footerSections[1].points}
            />
          </div>
          <div className="flex flex-col gap-4">
            <FooterSection
              header={footerSections[2].header}
              points={footerSections[2].points}
            />
          </div>
        </div>
        <div className="flex flex-col xl:w-1/3 gap-5 items-center xl:items-start ">
          <h2 className="font-medium">Subscribe</h2>
          <p className="text-sm">
            Join our newsletter for the latest updates and exclusive offers.
          </p>
          <div className="flex gap-5">
            <InputField
              id="email"
              type="email"
              placeholder="Enter your email"
              variant="primary"
            />
            <Button variant="primary">Subscribe</Button>
          </div>
          <p className="text-xs">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-10 xl:gap-0">
        <div className="flex justify-around gap-5 text-xs xl:text-sm ">
          <p>© 2024 Relume. All rights reserved.</p>
          <p className="underline cursor-pointer">Privacy Policy</p>
          <p className="underline cursor-pointer">Terms of Service</p>
          <p className="underline cursor-pointer">Cookies Settings</p>
        </div>
        <div className="flex justify-around gap-8 text-3xl">
          <i className="fab fa-facebook cursor-pointer"></i>
          <i className="fab fa-instagram cursor-pointer"></i>
          <i className="fab fa-x-twitter cursor-pointer"></i>
          <i className="fab fa-linkedin cursor-pointer"></i>
          <i className="fab fa-youtube cursor-pointer"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
