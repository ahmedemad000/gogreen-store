import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: '10 Easy Ways to Reduce Plastic Waste',
    excerpt: 'Simple changes you can make today to cut down on single-use plastics.',
    date: 'May 15, 2023',
    image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg'
  },
  {
    id: 2,
    title: 'The Benefits of a Plant-Based Diet',
    excerpt: 'Discover how switching to plant-based meals can improve your health and the environment.',
    date: 'June 01, 2023',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
  },
  {
    id: 3,
    title: 'How to Start Composting at Home',
    excerpt: 'Learn step-by-step how to turn kitchen scraps into nutrient-rich compost for your garden.',
    date: 'July 10, 2023',
    image: 'https://images.pexels.com/photos/347139/pexels-photo-347139.jpeg'
  },
  {
    id: 4,
    title: 'Eco-Friendly Travel Tips for 2023',
    excerpt: 'Explore the world sustainably with these practical tips for reducing your carbon footprint.',
    date: 'August 20, 2023',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
  },
  {
    id: 5,
    title: 'The Rise of Upcycled Fashion',
    excerpt: 'See how upcycling old clothes is revolutionizing the fashion industry sustainably.',
    date: 'September 05, 2023',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS98snqtjiKyfqG2fERBt7F5jD-4Y0HzDmeog&s'
  },
  {
    id: 6,
    title: 'Why Solar Panels Are Worth the Investment',
    excerpt: 'Understand the long-term benefits and savings of switching to solar energy for your home.',
    date: 'October 12, 2023',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg'
  }
  // Add more blog posts
];

export default function Blog() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Eco Living Blog</h1>
        <p className="mt-2 text-lg text-gray-600">
          Tips, guides, and inspiration for sustainable living
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500">{post.date}</p>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  <Link to={`/blog/${post.id}`} className="hover:text-green-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-gray-600">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-block text-green-600 hover:text-green-700 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}