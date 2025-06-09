// components/Testimonials.jsx
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Eco-conscious shopper',
    content: 'I love the quality of products from this store. Knowing they\'re good for the planet makes me feel even better about my purchases!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/43.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Sustainability advocate',
    content: 'Finally a store that aligns with my values. The packaging is minimal and eco-friendly, and the products are top-notch.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Organic lifestyle blogger',
    content: 'I\'ve tried many eco-stores, but this one stands out for its product selection and customer service. Highly recommend!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>
        
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-green-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 ${rating <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-base text-gray-600">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}