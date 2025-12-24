import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    imageUrl: string;
    category: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Top 5 Grooming Tips for Show Dogs",
        excerpt: "Preparing your dog for the ring involves more than just a quick brush. Discover the professional secrets to a winning coat.",
        date: "Dec 15, 2025",
        author: "Sarah Jenkins",
        imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Grooming"
    },
    {
        id: 2,
        title: "Understanding Judge Criteria",
        excerpt: "What exactly are judges looking for? We break down the breed standards and presentation points that score high.",
        date: "Dec 10, 2025",
        author: "Michael Ross",
        imageUrl: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Education"
    },
    {
        id: 3,
        title: "Upcoming Regional Qualifiers",
        excerpt: "Mark your calendars! The dates for the Spring Regional Qualifiers have been announced. Check if your city is on the list.",
        date: "Dec 05, 2025",
        author: "Event Team",
        imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "News"
    }
];

const BlogSection = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        News & Updates
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Stay informed with the latest tips, news, and insights from the dog show world.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <div key={post.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-orange-600">
                                        {post.category}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 text-base text-gray-500">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <div className="flex items-center mr-4">
                                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link to="#" className="flex items-center text-base font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                                        Read full article
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
