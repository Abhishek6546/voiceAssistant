import React from 'react'

function page() {
  return (
    
        <div className="px-6 md:px-16 py-12 bg-gray-50 text-gray-800">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">About Us</h1>
            <p className="text-lg text-gray-600">
              Learn more about our mission, vision, and the team behind Voice Assistant.
            </p>
          </div>
    
          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At Voice Assistant, our mission is to empower individuals and organizations with cutting-edge AI-powered tools
              that enhance learning, productivity, and communication. We believe in making technology accessible and
              intuitive for everyone.
            </p>
          </section>
    
          {/* Vision Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to create a world where technology seamlessly integrates into daily life, enabling people to
              achieve their goals with ease. We strive to be at the forefront of innovation, delivering solutions that
              inspire and transform.
            </p>
          </section>
    
          {/* Team Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <img
                  src="/team-member-1.jpg"
                  alt="Team Member 1"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">Alex Johnson</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="text-center">
                <img
                  src="/team-member-2.jpg"
                  alt="Team Member 2"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">Sarah Lee</h3>
                <p className="text-gray-600">Head of Product</p>
              </div>
              {/* Team Member 3 */}
              <div className="text-center">
                <img
                  src="/team-member-3.jpg"
                  alt="Team Member 3"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">Michael Brown</h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
          </section>
    
          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Join Us on Our Journey</h2>
            <p className="text-gray-700 mb-6">
              Be a part of our mission to revolutionize the way people interact with technology. Whether you're a user,
              partner, or developer, there's a place for you in our community.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Contact Us
            </button>
          </section>
        </div>
      );
    }
    
export default page