import React from 'react'

function page() {
    return (

        <div className="px-6 md:px-16 py-8 bg-gray-50 text-gray-800">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-blue-600">Contact Us</h1>
                <p className="text-lg text-gray-600">
                    Have questions or need assistance? We'd love to hear from you!
                </p>
            </div>

            {/* Contact Form Section */}
            <section className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
                <form>
                    {/* Name Field */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="5"
                            placeholder="Your Message"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </section>

            {/* Contact Information Section */}
            <section className="mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-purple-600">Get in Touch</h2>
                <p className="text-gray-700 mb-4">
                    You can also reach us directly via email or phone.
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> support@voiceassistant.com
                </p>
                <p className="text-gray-700">
                    <strong>Phone:</strong> +1 (123) 456-7890
                </p>
            </section>
        </div>
    );
}


export default page