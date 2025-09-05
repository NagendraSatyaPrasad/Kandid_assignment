'use client';

// This file is a single-file mockup of the Linkbird.ai UI as requested.
// It uses mock data and client-side state to simulate the functionality
// described in the video and PDF. A real Next.js application would
// separate these components into different files and use Server Actions,
// a database (PostgreSQL with Drizzle ORM), and TanStack Query for data fetching.

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { create } from 'zustand';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'; // Mocking shadcn/ui table imports
import { Button } from '../components/ui/button'; // Mocking shadcn/ui button imports
import { Input } from '../components/ui/input'; // Mocking shadcn/ui input imports
import { Progress } from '../components/ui/progress'; // Mocking shadcn/ui progress imports

// Zustand Store for client-side state management
const useUIStore = create((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activePage: 'Leads',
  setActivePage: (page) => set({ activePage: page }),
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true, isAuthModalOpen: false }),
  logout: () => set({ isLoggedIn: false, isAuthModalOpen: true }),
}));

// Auth Modal Component (Mock)
function AuthModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const [authView, setAuthView] = useState('initial'); // 'initial', 'login', 'register'

  const renderContent = () => {
    switch (authView) {
      case 'initial':
        return (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">Continue with an account</h2>
            <p className="text-gray-500 text-sm mb-4 text-center">You must log in or register to continue.</p>
            <div className="space-y-4">
              <Button className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#4285F4" d="M22.0001 12.1818C22.0001 11.4589 21.9329 10.749 21.8021 10.0577H11.5137V14.2831H17.7297C17.4582 15.6841 16.6418 16.8906 15.466 17.683V20.5731H18.9103C20.9157 18.7303 22.0001 16.0357 22.0001 12.1818Z"/><path fill="#34A853" d="M11.5137 22.0001C14.5126 22.0001 17.0784 21.0189 18.9103 19.3496L15.466 16.4595C14.5361 17.0772 13.1979 17.4984 11.5137 17.4984C8.42851 17.4984 5.88562 15.3414 4.96645 12.3888H1.47047V15.2282C3.33719 18.8142 7.15175 22.0001 11.5137 22.0001Z"/><path fill="#FBBC04" d="M4.96645 12.3887C4.72145 11.6669 4.58245 10.9079 4.58245 10.111C4.58245 9.31405 4.72145 8.55505 4.96645 7.83324V4.99389H1.47047C0.513473 6.80496 0 8.92484 0 11.111C0 13.2972 0.513473 15.417 1.47047 17.2282L4.96645 14.3887V12.3887Z"/><path fill="#EA4335" d="M11.5137 4.58245C13.2982 4.58245 14.8967 5.25305 16.1554 6.46083L19.0195 3.6558C17.0722 1.81057 14.5126 0.888916 11.5137 0.888916C7.15175 0.888916 3.33719 4.07478 1.47047 7.66083L4.96645 10.5002C5.88562 7.54763 8.42851 5.40557 11.5137 5.40557V4.58245Z"/>
                </svg>
                <span>Continue with Google</span>
              </Button>
              <Button onClick={() => setAuthView('login')} className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white border border-blue-600 rounded-full hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>Login with Email</span>
              </Button>
            </div>
            <div className="text-center mt-4 text-sm text-gray-500">
              New User? <a href="#" onClick={() => setAuthView('register')} className="text-blue-600 hover:underline">Create New Account</a>
            </div>
            <p className="text-center mt-6 text-xs text-gray-500">By continuing, you agree to our <a href="#" className="underline hover:text-gray-900">Privacy Policy</a> and <a href="#" className="underline hover:text-gray-900">T&Cs</a></p>
          </>
        );
      case 'login':
        return (
          <>
            <button onClick={() => setAuthView('initial')} className="flex items-center text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left mr-1"><path d="m15 18-6-6 6-6"/></svg> Back
            </button>
            <h2 className="text-xl font-semibold mb-2">Login with email</h2>
            <p className="text-gray-500 text-sm mb-4">Login using your email address.</p>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email or Username</label>
                <Input placeholder="Enter your email or username" className="h-10" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
                <Input type="password" placeholder="Enter your password" className="h-10" />
              </div>
              <Button onClick={onLogin} className="w-full bg-blue-600 text-white rounded-full hover:bg-blue-700">Login</Button>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <a href="#" className="text-gray-800 hover:text-black hover:underline">Forgot password</a>
              <a href="#" onClick={() => setAuthView('register')} className="text-gray-800 hover:text-black hover:underline">Create New Account</a>
            </div>
          </>
        );
      case 'register':
        return (
          <>
            <button onClick={() => setAuthView('initial')} className="flex items-center text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left mr-1"><path d="m15 18-6-6 6-6"/></svg> Back
            </button>
            <h2 className="text-xl font-semibold mb-2">Register with email</h2>
            <p className="text-gray-500 text-sm mb-4">Register using your email address.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                <Input placeholder="First Name" className="h-10" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                <Input placeholder="Last Name" className="h-10" />
              </div>
            </div>
            <div className="space-y-6 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                <Input placeholder="Enter your email" className="h-10" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
                <Input type="password" placeholder="Enter your password" className="h-10" />
              </div>
              <Button className="w-full bg-blue-600 text-white rounded-full hover:bg-blue-700">Create my account</Button>
            </div>
            <div className="text-center mt-4 text-sm text-gray-500">
              Already have an account? <a href="#" onClick={() => setAuthView('login')} className="text-gray-800 hover:text-black hover:underline">Login</a>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {renderContent()}
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  const { isSidebarOpen, toggleSidebar, activePage, setActivePage, logout } = useUIStore();

  const navItems = [
    { name: 'Dashboard', icon: 'M4 4v.76A2 2 0 0 0 5 6h16a2 2 0 0 0 1-1.76V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM4 10v.76A2 2 0 0 0 5 12h16a2 2 0 0 0 1-1.76V10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2zM4 16v.76A2 2 0 0 0 5 18h16a2 2 0 0 0 1-1.76V16a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z' },
    { name: 'Leads', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    { name: 'Campaigns', icon: 'M16 11H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2zM12 18v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zM18 18v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z' },
    { name: 'Messages', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { name: 'Settings', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z' },
  ];

  return (
    <aside className={`fixed h-screen flex-shrink-0 bg-gray-50 border-r transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between h-16 p-4 border-b">
        {isSidebarOpen && <span className="font-bold text-xl">LinkBird</span>}
        <Button onClick={toggleSidebar} variant="ghost" className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name)}
                className={`flex items-center w-full rounded-lg p-2 text-sm font-medium transition-colors hover:bg-gray-200 ${activePage === item.name ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4">
                  <path d={item.icon} />
                </svg>
                {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {isSidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center p-2 rounded-xl bg-white border border-gray-200 shadow-sm">
          <button className="flex w-full items-center space-x-2">
            <img src="https://placehold.co/32x32/CBD5E1/475563?text=JD" alt="User Profile" className="rounded-full" />
            <div className="text-left overflow-hidden">
              <div className="font-semibold text-sm">John Doe</div>
              <div className="text-xs text-gray-500 truncate">johndoe@example.com</div>
            </div>
          </button>
          <button onClick={logout} className="ml-auto p-2 hover:bg-gray-200 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          </button>
        </div>
      )}
    </aside>
  );
}

// Table Row for Leads
const LeadRow = ({ lead, onClick }) => {
  return (
    <TableRow onClick={() => onClick(lead)} className="cursor-pointer hover:bg-gray-100">
      <TableCell className="font-medium">{lead.name}</TableCell>
      <TableCell>{lead.campaign}</TableCell>
      <TableCell>{lead.email}</TableCell>
      <TableCell>
        <div className="w-16 h-2 bg-blue-500 rounded-full" />
      </TableCell>
      <TableCell>{lead.status}</TableCell>
      <TableCell>{lead.lastContact}</TableCell>
    </TableRow>
  );
};

// Table Row for Campaigns
const CampaignRow = ({ campaign, onClick }) => {
  return (
    <TableRow onClick={() => onClick(campaign)} className="cursor-pointer hover:bg-gray-100">
      <TableCell className="font-medium">{campaign.name}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
          campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {campaign.status}
        </span>
      </TableCell>
      <TableCell>{campaign.totalLeads}</TableCell>
      <TableCell>{campaign.successfulLeads}</TableCell>
      <TableCell className="flex items-center">
        <Progress value={campaign.progress} className="w-[100px] h-2 bg-gray-200 rounded-full [&>div]:bg-blue-500" />
        <span className="ml-2 text-sm">{campaign.progress}%</span>
      </TableCell>
      <TableCell>{campaign.createdDate}</TableCell>
      <TableCell>
        <Button variant="ghost">Actions</Button>
      </TableCell>
    </TableRow>
  );
};

// Lead Detail Side Sheet
function LeadSideSheet({ lead, onClose }) {
  if (!lead) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-lg bg-white border-l shadow-lg transition-transform duration-300 transform translate-x-0">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Lead Profile</h2>
        <Button variant="ghost" onClick={onClose}>&times;</Button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
        <div className="flex items-center space-x-4">
          <img src={lead.detailedInfo.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <div className="font-semibold text-lg">{lead.name}</div>
            <div className="text-sm text-gray-500">{lead.detailedInfo.title} at {lead.company}</div>
            <div className="text-sm text-gray-500">{lead.detailedInfo.location}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Additional Profile Info</h3>
          {/* Mock content for additional info section */}
          <p className="text-sm text-gray-600">This section would contain more detailed information about the lead.</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Interaction History</h3>
          {lead.detailedInfo.history.map((interaction, index) => (
            <div key={index} className="space-y-1 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>{interaction.type}</span>
                <span className="text-gray-500 text-xs">{interaction.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">{interaction.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Leads Page Component
const LeadsPage = () => {
  const [mockLeads, setMockLeads] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const observerTarget = useRef(null);

  // Generate mock data only on the client side to avoid hydration errors
  useEffect(() => {
    const generatedLeads = Array.from({ length: 100 }, (_, i) => ({
      id: `lead-${i + 1}`,
      name: `John Doe ${i + 1}`,
      email: `john.doe${i + 1}@example.com`,
      company: `Company ${i + 1}`,
      campaign: `Campaign ${Math.floor(Math.random() * 5) + 1}`,
      status: ['Pending', 'Contacted', 'Responded', 'Converted'][Math.floor(Math.random() * 4)],
      lastContact: `Sent ${Math.floor(Math.random() * 24)} hours ago`,
      detailedInfo: {
        title: `Regional Head`,
        location: `California, USA`,
        profilePicture: `https://placehold.co/40x40/E5E7EB/4B5563?text=JD`,
        history: [
          { type: 'Invitation Request', message: 'Hi {{firstName}}, I\'m building consultative AI...', timestamp: '10:00 AM' },
          { type: 'Connection Status', message: 'Check connection status', timestamp: '10:05 AM' },
          { type: 'Connection Acceptance Message', message: 'Awesome to connect, {{firstName}}!', timestamp: '10:10 AM' },
          { type: 'Follow-Up 1', message: 'Hey, did you get a chance to go through...', timestamp: '11:00 AM' },
        ],
      },
    }));
    setMockLeads(generatedLeads);
    setLeads(generatedLeads.slice(0, 20));
  }, []);

  const fetchMoreLeads = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // Simulate an API call with a delay
    setTimeout(() => {
      const startIndex = leads.length;
      const newLeads = mockLeads.slice(startIndex, startIndex + 20);
      setLeads((prev) => [...prev, ...newLeads]);
      setIsLoading(false);
      if (newLeads.length === 0) {
        setHasMore(false);
      }
    }, 1000);
  }, [leads, isLoading, hasMore, mockLeads]);

  // Infinite scroll logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          fetchMoreLeads();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, isLoading, hasMore, fetchMoreLeads]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex space-x-2">
          <Input placeholder="Search leads..." className="w-[300px]" />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Name</TableHead>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} onClick={setSelectedLead} />
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="text-center p-4">
            <svg className="animate-spin h-5 w-5 mr-3 text-blue-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading more leads...
          </div>
        )}
        {!hasMore && (
          <div className="text-center text-gray-500 p-4">No more leads to load.</div>
        )}
      </div>
      <div ref={observerTarget} className="h-1" />
      <LeadSideSheet lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

// Campaigns Page Component
const CampaignsPage = () => {
  const [mockCampaigns, setMockCampaigns] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Generate mock data only on the client side to avoid hydration errors
  useEffect(() => {
    const generatedCampaigns = Array.from({ length: 50 }, (_, i) => ({
      id: `campaign-${i + 1}`,
      name: `Campaign ${i + 1}`,
      status: ['Draft', 'Active', 'Paused', 'Completed'][Math.floor(Math.random() * 4)],
      totalLeads: Math.floor(Math.random() * 500) + 100,
      successfulLeads: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      createdDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }));
    setMockCampaigns(generatedCampaigns);
    setCampaigns(generatedCampaigns);
  }, []);

  const stats = useMemo(() => {
    const totalLeads = campaigns.reduce((sum, c) => sum + c.totalLeads, 0);
    const successfulLeads = campaigns.reduce((sum, c) => sum + c.successfulLeads, 0);
    return {
      totalLeads,
      successfulLeads,
      responseRate: ((successfulLeads / totalLeads) * 100).toFixed(2),
    };
  }, [campaigns]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <div className="flex space-x-2">
          <Input placeholder="Search campaigns..." className="w-[300px]" />
          <Button variant="outline">Filter</Button>
          <Button>Create Campaign</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500">Total Leads</h3>
          <p className="text-2xl font-bold">{stats.totalLeads}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500">Successful Leads</h3>
          <p className="text-2xl font-bold">{stats.successfulLeads}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500">Response Rate</h3>
          <p className="text-2xl font-bold">{stats.responseRate}%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-sm text-gray-500">Active Campaigns</h3>
          <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'Active').length}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Leads</TableHead>
              <TableHead>Successful Leads</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <CampaignRow key={campaign.id} campaign={campaign} onClick={setSelectedCampaign} />
            ))}
          </TableBody>
        </Table>
      </div>

      <LeadSideSheet lead={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
    </div>
  );
};

// Main App Component
const App = () => {
  const { isSidebarOpen, activePage, isAuthModalOpen, closeAuthModal, isLoggedIn, login, logout } = useUIStore();

  const renderPage = () => {
    switch (activePage) {
      case 'Leads':
        return <LeadsPage />;
      case 'Campaigns':
        return <CampaignsPage />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4 text-gray-600">This is a placeholder for the Dashboard page.</p>
          </div>
        );
    }
  };

  // If the user is not logged in, show the AuthModal.
  if (!isLoggedIn) {
    return <AuthModal isOpen={true} onClose={closeAuthModal} onLogin={login} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased text-gray-800">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>

      <Sidebar />
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <header className="flex items-center h-16 px-6 border-b bg-white shadow-sm">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Home</span> / <span className="text-gray-900 font-semibold">{activePage}</span>
          </nav>
        </header>
        <main className="p-4">
          {renderPage()}
        </main>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onLogin={login} />
    </div>
  );
};

export default App;
