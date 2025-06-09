// components/SustainabilityFeatures.jsx
import { Leaf, Recycle, Sun, Droplet } from 'lucide-react';

const features = [
  {
    name: '100% Organic',
    description: 'All our products are made from certified organic materials',
    icon: Leaf,
  },
  {
    name: 'Eco-Friendly Packaging',
    description: 'We use biodegradable or recyclable packaging materials',
    icon: Recycle,
  },
  {
    name: 'Carbon Neutral',
    description: 'We offset all carbon emissions from shipping',
    icon: Sun,
  },
  {
    name: 'Water Conservation',
    description: 'Our production processes minimize water usage',
    icon: Droplet,
  },
];

export default function SustainabilityFeatures() {
  return (
    <section className="py-12 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Sustainability</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Commitment to the Planet
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We're dedicated to making a positive environmental impact with every product we sell.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}