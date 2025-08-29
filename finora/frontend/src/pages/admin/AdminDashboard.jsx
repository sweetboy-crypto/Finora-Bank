import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await api.get('/api/admin/stats');
                setStats(res.data.data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch stats', err);
                setError('Could not load platform statistics.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div>Loading statistics...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    const UserIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 15a5.995 5.995 0 00-3-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
    const MoneyIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    const TransactionIcon = () => <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h.01M12 7h.01M16 7h.01M9 17h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">Platform-wide statistics overview.</p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Total Users" value={stats?.totalUsers} icon={<div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center"><UserIcon /></div>} />
                <StatCard title="Total Funds" value={`$${stats?.totalFunds.toLocaleString('en-US', {minimumFractionDigits: 2})}`} icon={<div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center"><MoneyIcon /></div>} />
                <StatCard title="Total Transactions" value={stats?.totalTransactions} icon={<div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center"><TransactionIcon /></div>} />
            </div>
        </div>
    );
};

export default AdminDashboard;
