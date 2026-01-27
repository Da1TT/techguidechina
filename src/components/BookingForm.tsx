import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

// Types for form data
interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  peopleCount: number;
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
    peopleCount: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'peopleCount' ? parseInt(value) || 1 : value
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
    
    if (formData.peopleCount < 1) {
      newErrors.peopleCount = "Number of people must be at least 1";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission using Formspree with correct method
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // 创建FormData对象，这是Formspree推荐的标准方法
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);
        formDataObj.append('peopleCount', formData.peopleCount.toString());
        formDataObj.append('message', formData.message);
        formDataObj.append('serviceType', serviceType);
        formDataObj.append('serviceName', serviceName);
        
        // 使用Formspree推荐的标准fetch方法
        const response = await fetch('https://formspree.io/f/xojdrkdr', { 
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: formDataObj,
        });
        
        // 记录完整的响应信息用于调试
        console.log('Formspree response status:', response.status);
        
        if (response.ok) {
          // Show success message
          toast.success(`Your booking request for ${serviceName} has been received! We will contact you at ${formData.email} within 24 hours to complete your booking.`);
          
          // Close the modal
          onClose();
        } else {
          // 获取详细的错误信息
          const errorText = await response.text();
          console.error('Form submission error:', response.status, response.statusText, errorText);
          
          try {
            // 尝试解析JSON格式的错误信息
            const errorData = JSON.parse(errorText);
            if (errorData.error) {
              toast.error(`Oops! ${errorData.error}`);
            } else {
              toast.error('Oops! There was a problem submitting your form. Please try again.');
            }
          } catch (jsonError) {
            // 如果错误信息不是JSON格式，显示原始错误文本
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
      return `Register for ${serviceName}`;
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
          
          {/* Number of People */}
          <div className="mb-4">
            <label htmlFor="peopleCount" className="block text-gray-700 font-medium mb-2">
              Number of People <span className="text-red-600">*</span>
            </label>
            <select
              id="peopleCount"
              name="peopleCount"
              value={formData.peopleCount}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.peopleCount ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Person' : 'People'}
                </option>
              ))}
              <option value={11}>More than 10 people</option>
            </select>
            {errors.peopleCount && (
              <p className="text-red-500 text-sm mt-1">{errors.peopleCount}</p>
            )}
          </div>
          
          {/* Additional Information */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Additional Information (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Any special requirements or questions?"
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
              serviceType === "exhibition" ? "Complete Registration" : "Confirm Booking"
            )}
          </button>
          
          {/* Footer Info */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
          <p className="text-xs text-gray-500 mt-1 text-center">
            You will also receive a confirmation email with your booking details.
          </p>
        </form>
      </div>
    </motion.div>
  );
}