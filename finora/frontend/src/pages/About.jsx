import React from 'react';
import PageWrapper from '../components/PageWrapper';

const teamMembers = [
  { name: 'Alex Johnson', role: 'Co-Founder & CEO', imageUrl: `https://i.pravatar.cc/150?u=a042581f4e29026704d`},
  { name: 'Maria Garcia', role: 'Co-Founder & CTO', imageUrl: `https://i.pravatar.cc/150?u=a042581f4e29026704e`},
  { name: 'James Smith', role: 'Head of Investments', imageUrl: `https://i.pravatar.cc/150?u=a042581f4e29026704f`},
  { name: 'Emily White', role: 'Lead Designer', imageUrl: `https://i.pravatar.cc/150?u=a042581f4e29026704a`},
];

const About = () => {
  return (
    <PageWrapper>
      <div className="bg-white">
        <main>
          {/* Hero section */}
          <div className="relative bg-gray-800">
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Team collaborating on a project"
              />
              <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" aria-hidden="true" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Finora</h1>
              <p className="mt-6 max-w-3xl text-xl text-indigo-100">
                We are a team of financial experts, technologists, and designers passionate about making modern banking and investing accessible to everyone.
              </p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="py-16 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Mission</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
                  Democratizing Your Financial Future
                </p>
              </div>
              <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
                <p className="text-lg text-gray-500">
                  At Finora, our mission is to empower individuals to take control of their financial lives with confidence and ease. We believe that everyone deserves access to powerful, intuitive, and secure financial tools, regardless of their background or experience level. We're committed to breaking down the barriers of traditional banking and investing through technology, transparency, and education.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                  <h2 className="text-3xl font-extrabold text-text-primary tracking-tight sm:text-4xl">Meet our team</h2>
                  <p className="text-xl text-gray-500">
                    The passionate people behind the platform.
                  </p>
                </div>
                <ul role="list" className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                  {teamMembers.map((person) => (
                    <li key={person.name}>
                      <div className="space-y-4">
                        <div className="aspect-w-3 aspect-h-2">
                          <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                        </div>
                        <div className="text-lg leading-6 font-medium space-y-1">
                          <h3>{person.name}</h3>
                          <p className="text-primary">{person.role}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default About;
