import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

// Types for form data
interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  exhibitionName: string;
  exhibitionDate: string;
  participantsCount: number;
  budget: string;
  message: string;
}

interface BookingFormProps {
  onClose: () => void;
  serviceType: "exhibition" | "tour";
  serviceName: string;
}

export default function BookingForm({ onClose, serviceType, serviceName }: BookingFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    exhibitionName: "",
    exhibitionDate: "",
    participantsCount: 1,
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity:1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participantsCount' ? parseInt(value) || 1 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof BookingFormData];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    
    if (serviceType === "exhibition" && !formData.exhibitionName.trim()) {
      newErrors.exhibitionName = "Exhibition name is required";
    }
    
    if (formData.participantsCount < 1) {
      newErrors.participantsCount = "Number of participants must be at least 1";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission using Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // 创建FormData对象
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);
        formDataObj.append('country', formData.country);
        formDataObj.append('exhibitionName', formData.exhibitionName);
        formDataObj.append('exhibitionDate', formData.exhibitionDate);
        formDataObj.append('participantsCount', formData.participantsCount.toString());
        formDataObj.append('budget', formData.budget);
        formDataObj.append('message', formData.message);
        formDataObj.append('serviceType', serviceType);
        formDataObj.append('serviceName', serviceName);
        
        // 使用Formspree
        const response = await fetch('https://formspree.io/f/xojdrkdr', { 
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formDataObj,
        });
        
        console.log('Formspree response status:', response.status);
        
        if (response.ok) {
          // Show success message
          toast.success(`Thank you ${formData.name}! Your inquiry for ${serviceName} has been received. We will contact you at ${formData.email} within 24 hours.`);
          
          // Track form submission in Google Analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'form_submission', {
              'event_category': 'Lead Generation',
              'event_label': serviceName,
              'service_type': serviceType,
              'country': formData.country,
              'participants_count': formData.participantsCount,
              'exhibition_name': formData.exhibitionName || 'N/A'
            });
            console.log('Google Analytics event tracked: form_submission');
          }
          
          // Close modal
          onClose();
        } else {
          const errorText = await response.text();
          console.error('Form submission error:', response.status, response.statusText, errorText);
          
          try {
            const errorData = JSON.parse(errorText);
            if (errorData.error) {
              toast.error(`Oops! ${errorData.error}`);
            } else {
              toast.error('Oops! There was a problem submitting your form. Please try again.');
            }
          } catch (jsonError) {
            toast.error(`Oops! ${errorText || 'There was a problem submitting your form. Please try again.'}`);
          }
        }
      } catch (error) {
        console.error('Network error:', error);
        toast.error('Network error! Please check your connection and try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Get title based on service type
  const getTitle = () => {
    if (serviceType === "exhibition") {
      return `Get Exhibition Service - ${serviceName}`;
    }
    return `Book ${serviceName}`;
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-bold">{getTitle()}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>
        
        {/* Form */}
        <form className="p-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Country */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
              Country/Region <span className="text-red-600">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
            >
              <option value="">Select your country/region</option>
              <optgroup label="North America">
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Belgium">Belgium</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Sweden">Sweden</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
                <option value="Finland">Finland</option>
                <option value="Poland">Poland</option>
                <option value="Austria">Austria</option>
                <option value="Czech Republic">Czech Republic</option>
              </optgroup>
              <optgroup label="Asia Pacific">
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Singapore">Singapore</option>
                <option value="Australia">Australia</option>
                <option value="New Zealand">New Zealand</option>
              </optgroup>
              <optgroup label="Other">
                <option value="Other">Other</option>
              </optgroup>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Exhibition Name (only for exhibition service) */}
          {serviceType === "exhibition" && (
            <>
              <div className="mb-4">
                <label htmlFor="exhibitionName" className="block text-gray-700 font-medium mb-2">
                  Exhibition Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="exhibitionName"
                  name="exhibitionName"
                  value={formData.exhibitionName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.exhibitionName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-red-600`}
                  placeholder="e.g., CES Asia, Canton Fair"
                />
                {errors.exhibitionName && (
                  <p className="text-red-500 text-sm mt-1">{errors.exhibitionName}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="exhibitionDate" className="block text-gray-700 font-medium mb-2">
                  Exhibition Date (Optional)
                </label>
                <input
                  type="date"
                  id="exhibitionDate"
                  name="exhibitionDate"
                  value={formData.exhibitionDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600`}
                />
              </div>
            </>
          )}
          
          {/* Number of Participants */}
          <div className="mb-4">
            <label htmlFor="participantsCount" className="block text-gray-700 font-medium mb-2">
              Number of Participants <span className="text-red-600">*</span>
            </label>
            <select
              id="participantsCount"
              name="participantsCount"
              value={formData.participantsCount}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.participantsCount ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Person' : 'People'}
                </option>
              ))}
              <option value={11}>More than 10 people</option>
            </select>
            {errors.participantsCount && (
              <p className="text-red-500 text-sm mt-1">{errors.participantsCount}</p>
            )}
          </div>

          {/* Budget Range */}
          <div className="mb-4">
            <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
              Estimated Budget (USD) (Optional)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select budget range</option>
              <option value="< $1,000">Less than $1,000</option>
              <option value="$1,000 - $3,000">$1,000 - $3,000</option>
              <option value="$3,000 - $5,000">$3,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000 - $20,000">$10,000 - $20,000</option>
              <option value="> $20,000">More than $20,000</option>
              <option value="Flexible">Flexible - Let me know your quote</option>
            </select>
          </div>
          
          {/* Additional Information */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Additional Requirements (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Any special requirements? Translation, pickup, specific services needed?"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              "Send Inquiry"
            )}
          </button>
          
          {/* Footer Info */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
          <p className="text-xs text-gray-500 mt-1 text-center">
            We will contact you within 24 hours at {formData.email || 'your email address'}.
          </p>
        </form>
      </div>
    </motion.div>
  );
}
