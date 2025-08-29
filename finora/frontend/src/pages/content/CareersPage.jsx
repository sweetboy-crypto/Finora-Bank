import React from 'react';
import PageWrapper from '../../components/PageWrapper';

const positions = [
  {
    title: 'Senior Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
  },
];

const CareersPage = () => {
  return (
    <PageWrapper>
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">Join Our Team</h1>
          <p className="mt-4 text-lg text-gray-500 text-center">
            We're building the future of finance and are looking for passionate, talented people to join us on our mission.
          </p>
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900">Open Positions</h2>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <ul className="divide-y divide-gray-200">
                {positions.map((position) => (
                  <li key={position.title} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-primary">{position.title}</p>
                      <p className="text-sm text-gray-500">{position.department} &middot; {position.location}</p>
                    </div>
                    <a href="#" className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                      Apply
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CareersPage;
