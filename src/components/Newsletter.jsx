// components/Newsletter.jsx
export default function Newsletter() {
  return (
    <section className="bg-green-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-green-100">
              Subscribe to our newsletter for the latest eco-friendly products and sustainability tips.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-green-100">
              We care about your data. Read our{' '}
              <a href="#" className="text-white font-medium underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}