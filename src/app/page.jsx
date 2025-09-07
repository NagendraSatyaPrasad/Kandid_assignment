'use client';
import {Clock, UserPlus, Send, Ban, CircleCheck, Megaphone, Trash2, Users, CircleX, PlusCircle, Search, MessageSquareQuote, UserCheck, Mail, MessageSquare, Calendar, BarChart, ArrowUpRight, Target, FileBarChart, FilePen, Settings, Timer} from 'lucide-react';
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
} from '../components/ui/table';
import { Button } from '../components/ui/button'; 
import { Input } from '../components/ui/input';
import { Progress } from '../components/ui/progress';

// Zustand Store for client-side state management
const useUIStore = create((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activePage: 'Dashboard',
  setActivePage: (page) => set({ activePage: page }),
  isAuthModalOpen: true,
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
  const navItems = {
    overview: [
      { name: 'Dashboard', icon: 'M12 18V15 M2.3516 13.2135C1.9986 10.9162 1.8221 9.76763 2.2564 8.74938C2.6907 7.73112 3.6543 7.03443 5.5814 5.64106L7.0212 4.6C9.4185 2.86667 10.6172 2 12 2C13.3833 2 14.582 2.86667 16.9793 4.6L18.4191 5.64106C20.3462 7.03443 21.3098 7.73112 21.7441 8.74938C22.1784 9.76763 22.0019 10.9162 21.6489 13.2135L21.3478 15.1724C20.8474 18.4289 20.5972 20.0572 19.4292 21.0286C18.2613 22 16.5539 22 13.1391 22H10.8614C7.4466 22 5.7391 22 4.5712 21.0286C3.4033 20.0572 3.1531 18.4289 2.6527 15.1724L2.3516 13.2135Z' },
      { name: 'Leads', icon: 'M14 9H18 M14 12.5H17 M2 3h20v18H2z M5 16c1.208-2.581 5.712-2.751 7-0.001M10.5 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z' },
      { name: 'Campaigns', icon: 'M14.5405 2V4.48622C14.5405 6.23417 14.5405 7.10814 14.7545 7.94715C14.9685 8.78616 15.3879 9.55654 16.2267 11.0973L17.3633 13.1852C19.5008 17.1115 20.5696 19.0747 19.6928 20.53L19.6792 20.5522C18.7896 22 16.5264 22 12 22C7.47357 22 5.21036 22 4.3208 20.5522L4.30725 20.53C3.43045 19.0747 4.49918 17.1115 6.63666 13.1852L7.7733 11.0973C8.61209 9.55654 9.03149 8.78616 9.24548 7.94715C9.45947 7.10814 9.45947 6.23417 9.45947 4.48622V2 M9 16.002L9.00868 15.9996 M15 18.002L15.0087 17.9996 M8 2L16 2 M7.5 11.5563C8.5 10.4029 10.0994 11.2343 12 12.3182C14.5 13.7439 16 12.65 16.5 11.6152' },
      { name: 'Messages', icon: 'M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6 M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z' },
      { name: 'LinkedIn Accounts', icon: 'M4.5 9.5H4C3.05719 9.5 2.58579 9.5 2.29289 9.79289C2 10.0858 2 10.5572 2 11.5V20C2 20.9428 2 21.4142 2.29289 21.7071C2.58579 22 3.05719 22 4 22H4.5C5.44281 22 5.91421 22 6.20711 21.7071C6.5 21.4142 6.5 20.9428 6.5 20V11.5C6.5 10.5572 6.5 10.0858 6.20711 9.79289C5.91421 9.5 5.44281 9.5 4.5 9.5Z M6.5 4.25C6.5 5.49264 5.49264 6.5 4.25 6.5C3.00736 6.5 2 5.49264 2 4.25C2 3.00736 3.00736 2 4.25 2C5.49264 2 6.5 3.00736 6.5 4.25Z M12.326 9.5H11.5C10.5572 9.5 10.0858 9.5 9.79289 9.79289C9.5 10.0858 9.5 10.5572 9.5 11.5V20C9.5 20.9428 9.5 21.4142 9.79289 21.7071C10.0858 22 10.5572 22 11.5 22H12C12.9428 22 13.4142 22 13.7071 21.7071C14 21.4142 14 20.9428 14 20L14.0001 16.5001C14.0001 14.8433 14.5281 13.5001 16.0879 13.5001C16.8677 13.5001 17.5 14.1717 17.5 15.0001V19.5001C17.5 20.4429 17.5 20.9143 17.7929 21.2072C18.0857 21.5001 18.5572 21.5001 19.5 21.5001H19.9987C20.9413 21.5001 21.4126 21.5001 21.7055 21.2073C21.9984 20.9145 21.9985 20.4432 21.9987 19.5006L22.0001 14.0002C22.0001 11.515 19.6364 9.50024 17.2968 9.50024C15.9649 9.50024 14.7767 10.1531 14.0001 11.174C14 10.5439 14 10.2289 13.8632 9.995C13.7765 9.84686 13.6531 9.72353 13.505 9.63687C13.2711 9.5 12.9561 9.5 12.326 9.5Z'},
    ],
    settings: [
      { name: 'Setting & Billing', icon: 'M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z' },
    ],
    admin: [
      { name: 'Activity logs', icon: 'M13 2L3 14h10l-1 8 10-12H13l1-8z' },
      { name: 'User logs', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
    ]
  };

  const renderNavGroup = (title, items) => (
    <div className="mt-6">
      {isSidebarOpen && <h3 className="text-gray-500 text-xs font-semibold uppercase px-4 mb-2">{title}</h3>}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => setActivePage(item.name)}
              className={`flex items-center w-full rounded-lg p-2 text-sm font-medium transition-colors ${activePage === item.name ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4">
                <path d={item.icon} />
              </svg>
              {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <aside className={`fixed h-screen flex-shrink-0 bg-white border-r transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-center h-16 p-4 border-b">
        <img src="https://linkbird.ai/images/linkbird-light-logo.svg" alt="LinkBird Logo" className="h-6 w-auto" />
      </div>
      <div className="p-4 border-b flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">PE</div>
        {isSidebarOpen && (
          <div className="flex-1">
            <div className="font-semibold text-sm">Kandid</div>
            <div className="text-xs text-gray-500">Personal</div>
          </div>
        )}
        {isSidebarOpen && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
        )}
      </div>
      <nav className="flex-1 p-2 overflow-y-auto">
        {renderNavGroup('Overview', navItems.overview)}
        {renderNavGroup('Settings', navItems.settings)}
        {renderNavGroup('Admin Panel', navItems.admin)}
      </nav>
      {isSidebarOpen && (
  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center p-2 rounded-xl bg-white border border-gray-200 shadow-sm">
    <button className="flex w-full items-center space-x-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-black-600 font-bold">
        NP
      </div>

      <div className="text-left overflow-hidden">
        <div className="font-semibold text-sm">Nagendra Pulapa</div>
        <div className="text-xs text-gray-500 truncate">nagpulapa@gmail.com</div>
      </div>
    </button>

    <button onClick={logout} className="ml-auto p-2 hover:bg-gray-200 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-log-out"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    </button>
  </div>
)}
    </aside>
  );
}

// Table Row for Leads
const LeadRow = ({ lead, onClick }) => {
  // Status colors and icons
  const statusColor = {
    'Pending Approval': 'bg-purple-100 text-purple-800',
    'Sent 7 mins ago': 'bg-orange-100 text-orange-800',
    'Connected 12 mins ago': 'bg-green-100 text-green-800',
    'Do Not Contact': 'bg-gray-200 text-black',
  };

  const statusIcon = {
    'Pending Approval': <Clock className="w-3 h-3 inline mr-1" />,
    'Sent 7 mins ago': <UserPlus className="w-3 h-3 inline mr-1" />,
    'Connected 12 mins ago': <CircleCheck className="w-3 h-3 inline mr-1" />,
    'Do Not Contact': <Ban className="w-3 h-3 inline mr-1" />,
  };

  return (
    <TableRow onClick={() => onClick(lead)} className="cursor-pointer hover:bg-gray-50">
      {/* Name and profile */}
      <TableCell className="flex items-center space-x-2">
        <img
          src={lead.detailedInfo.profilePicture}
          alt={lead.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-medium">{lead.name}</div>
          <div className="text-sm text-gray-500">{lead.detailedInfo.title}</div>
        </div>
      </TableCell>

      {/* Campaign */}
      <TableCell>{lead.campaign}</TableCell>

      {/* Activity: 4 vertical bars */}
<TableCell className="flex justify-center space-x-1">
  {(() => {
    // Determine number of completed steps
    let completedSteps = 0;

    if (lead.status.includes('Connected')) completedSteps = 3;
    else if (lead.status.includes('Sent')) completedSteps = 1;
    else if (lead.status.includes('Pending')) completedSteps = 2;
    else if (lead.status.includes('Do Not Contact')) completedSteps = 0;

    // Darker color map for completed steps
    const barColorMap = {
      'Pending Approval': 'bg-purple-700',
      'Sent 7 mins ago': 'bg-yellow-500',
      'Connected 12 mins ago': 'bg-green-700',
      'Do Not Contact': 'bg-gray-600',
    };
    const barColor = barColorMap[lead.status] || 'bg-gray-600';

    // Render 4 bars
    return [...Array(4)].map((_, idx) => {
      const isActive = idx < completedSteps;
      return (
        <div
          key={idx}
          className={`w-1 h-5 ${isActive ? barColor : 'bg-gray-300'} rounded-md`}
        />
      );
    });
  })()}
</TableCell>

      {/* Status */}
      <TableCell>
        <span
          className={`px-2 py-1 rounded-md text-sm font-semibold ${statusColor[lead.status] || 'bg-gray-200 text-gray-800'}`}
        >
          {statusIcon[lead.status]}
          {lead.status}
        </span>
      </TableCell>
    </TableRow>
  );
};

// Lead Detail Side Sheet
function LeadSideSheet({ lead, onClose }) {
  if (!lead) return null;

  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const getStatusColor = (status) => {
    if (status.includes("Pending"))
      return { color: "bg-purple-100 text-purple-800", icon: <Clock className="w-3 h-3 inline mr-1" /> };
    if (status.includes("Sent"))
      return { color: "bg-orange-100 text-orange-800", icon: <Send className="w-3 h-3 inline mr-1" /> };
    if (status.includes("Followup"))
      return { color: "bg-blue-100 text-blue-800", icon: <UserPlus className="w-3 h-3 inline mr-1" /> };
    if (status.includes("Do Not Contact"))
      return { color: "bg-gray-200 text-black", icon: <Ban className="w-3 h-3 inline mr-1" /> };
    if (status.includes("Connected"))
      return { color: "bg-green-100 text-green-800", icon: <CircleCheck className="w-3 h-3 inline mr-1" /> };
    return { color: "bg-red-100 text-red-800", icon: null };
  };

  const status = getStatusColor(lead.status);

  return (
    <>
      {/* Gradient overlay */}
<div
  className="fixed inset-0 bg-gradient-to-r from-black/75 via-black/75 to-black/75 z-30"
  onClick={onClose}
/>
      {/* Side sheet */}
      <div className="fixed inset-y-0 right-0 z-40 w-full max-w-lg bg-white border-l shadow-lg transition-transform duration-300 transform translate-x-0">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Lead Profile</h2>
          <Button variant="ghost" onClick={onClose}>
            &times;
          </Button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
          {/* Profile Box + Additional Info */}
          <div className="border rounded-lg p-4 shadow-sm space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={lead.detailedInfo.profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex justify-between items-start w-full">
                <div>
                  <div className="font-semibold text-lg">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.detailedInfo.title} at {lead.company}</div>
                  <div className="text-sm text-gray-500">{lead.detailedInfo.location}</div>
                </div>
                <Button variant="ghost" onClick={() => console.log("Delete lead")}>
                  <Trash2 className="w-5 h-5 text-red-600" />
                </Button>
              </div>
            </div>

            {/* Campaign + Status */}
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                <Megaphone className="h-3 w-3 text-gray-500" />
                <span>{lead.campaign}</span>
              </span>

              <span className={`flex items-center text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
                {status.icon}
                {lead.status}
              </span>
            </div>

            {/* Collapsible Additional Info */}
            <div>
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left"
                onClick={() => setShowProfileInfo(!showProfileInfo)}
              >
                <h3 className="font-semibold">Additional Profile Info</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-500 transform transition-transform duration-200 ${
                    showProfileInfo ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileInfo && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600">This section contains more detailed information about the lead.</p>
                </div>
              )}
            </div>
          </div>

          {/* Interaction History */}
          <div className="space-y-4">
            <h3 className="font-semibold">Interaction History</h3>
            <div className="relative ml-6">
              {lead.detailedInfo.history.map((interaction, index) => {
                const stepName = interaction.type;

                let completedSteps = [];
                if (lead.status.includes("Connected")) {
                  completedSteps = ["Invitation Request", "Connection Status", "Connection Acceptance Message"];
                } else if (lead.status.includes("Pending")) {
                  completedSteps = ["Invitation Request", "Connection Status", "Connection Acceptance Message", "Follow-Up 1"];
                } else if (lead.status.includes("Sent")) {
                  completedSteps = ["Invitation Request"];
                }

                const isStepCompleted = completedSteps.includes(stepName);
                const isLastStep = index === lead.detailedInfo.history.length - 1;
                const nextStepCompleted =
                  !isLastStep && completedSteps.includes(lead.detailedInfo.history[index + 1].type);

                return (
                  <div key={index} className="relative flex items-start space-x-3">
                    <div className="relative flex flex-col items-center">
                      {isStepCompleted ? (
                        <CircleCheck className="w-6 h-6 text-blue-600 z-10 bg-white rounded-full" />
                      ) : (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 150 150"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-500 z-10 bg-white rounded-full"
                        >
                          <circle cx="75" cy="75" r="70" stroke="black" strokeWidth="8" />
                          <circle cx="75" cy="75" r="15" stroke="black" strokeWidth="8" />
                          <line x1="25" y1="75" x2="60" y2="75" stroke="black" strokeWidth="8" strokeLinecap="round" />
                          <line x1="90" y1="75" x2="125" y2="75" stroke="black" strokeWidth="8" strokeLinecap="round" />
                        </svg>
                      )}

                      {!isLastStep && (
                        <div
                          className={`absolute top-6 left-1/2 -translate-x-1/2 w-0.5 ${
                            isStepCompleted && nextStepCompleted ? "bg-blue-600" : "bg-gray-300"
                          }`}
                          style={{ height: "calc(100% + 1.5rem)" }}
                        />
                      )}
                    </div>

                    <div className="pb-8">
                      <span className={`text-sm font-medium ${isStepCompleted ? "text-blue-600" : "text-gray-700"}`}>
                        {interaction.type}
                      </span>
                      <span className="block text-xs text-gray-500">{interaction.timestamp}</span>
                      <p className="text-sm text-gray-600">{interaction.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
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

  useEffect(() => {
  const names = [
    'Alice Smith', 'Bob Jones', 'Charlie Brown', 'Diana Lee', 'Evan Khan', 
    'Fiona Wang', 'George Ross', 'Hannah Miller', 'Ian Clark', 'Julia Adams', 
    'Kevin Choi', 'Linda Patel', 'Mike Turner', 'Nina Kumar', 'Oliver Stone', 
    'Paula Jenkins', 'Quinn Harris', 'Ryan Lee', 'Sophia Morris', 'Tommy White'
  ];

  const companies = [
    'Google', 'Apple', 'Microsoft', 'Amazon', 'Facebook', 
    'Tesla', 'Netflix', 'Adobe', 'Intel', 'Salesforce', 
    'Oracle', 'Spotify', 'Uber', 'Airbnb', 'Twitter', 
    'Snapchat', 'LinkedIn', 'Shopify', 'Zoom', 'PayPal'
  ];

  const campaigns = [
    'Gynoveda', 'EcoBoost', 'HealthPlus', 'SmartHome', 'EduTech', 
    'TravelMate', 'FitLife', 'GreenEnergy', 'FoodiesHub', 'StyleWave', 
    'AutoDrive', 'CleanWater', 'MindSpark', 'UrbanGrow', 'TechSavvy', 
    'WellnessWay', 'AquaPure', 'ShopEase', 'PowerUp', 'BrightFuture'
  ];

  const statuses = ['Pending Approval', 'Sent 7 mins ago', 'Connected 12 mins ago', 'Do Not Contact'];

  const titles = [
    'Marketing Manager', 'UI/UX Designer', 'Data Scientist', 'Business Analyst', 'Full Stack Developer', 
    'Customer Success Manager', 'Operations Lead', 'Software Engineer', 'Sales Executive', 'Project Coordinator', 
    'Product Owner', 'DevOps Engineer', 'Content Strategist', 'HR Manager', 'Tech Lead', 
    'Product Analyst', 'Regional Head', 'QA Engineer', 'Finance Manager', 'Account Manager'
  ];

  const locations = [
    'California, USA', 'Hyderabad, India', 'London, England', 'Paris, France', 'Berlin, Germany', 
    'Tokyo, Japan', 'New York, USA', 'Sydney, Australia', 'Toronto, Canada', 'Singapore', 
    'Dubai, UAE', 'Amsterdam, Netherlands', 'Barcelona, Spain', 'Rome, Italy', 'Mumbai, India', 
    'Chicago, USA', 'Vancouver, Canada', 'Beijing, China', 'Seoul, South Korea', 'Bangkok, Thailand'
  ];

  const generatedLeads = Array.from({ length: 20 }, (_, i) => ({
      id: `lead-${i + 1}`,
      name: names[i],
      company: companies[i],
      campaign: campaigns[i],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      detailedInfo: {
        title: titles[i],
        location: locations[i],
        profilePicture: `https://placehold.co/40x40/E5E7EB/4B5563?text=${names[i].split(' ').map(n => n[0]).join('')}`,
        history: [
          { type: 'Invitation Request', message: `Hi ${names[i].split(' ')[0]}, I'm building consultative AI...`, timestamp: '10:00 AM' },
          { type: 'Connection Status', message: 'Check connection status', timestamp: '10:05 AM' },
          { type: 'Connection Acceptance Message', message: `Awesome to connect, ${names[i].split(' ')[0]}!`, timestamp: '10:10 AM' },
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
        <div className="flex space-x-2">
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-full bg-white">
  <TableHeader className="bg-white">
    <TableRow>
      <TableHead className="bg-white">Name</TableHead>
      <TableHead className="bg-white">Campaign Name</TableHead>
      <TableHead className="text-center bg-white">Activity</TableHead>
      <TableHead className="bg-white">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody className="bg-white">
    {leads.map((lead) => (
      <LeadRow key={lead.id} lead={lead} onClick={setSelectedLead} />
    ))}
  </TableBody>
</Table>
           {isLoading && (
          <div className="text-center p-4">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-blue-500 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading more leads...
          </div>
        )}
        {!hasMore && (
          <div className="text-center text-gray-500 p-4">No more leads to load.</div>
        )}
      </div>

      <div ref={observerTarget} className="h-4" />
      <LeadSideSheet lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

// Campaigns Page Component (updated to be a sub-component for the Dashboard)
const CampaignsDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
  const names = ["Just Herbs", "Juicy chemistry", "Hyugalife 2", "Honeyveda", "HempStreet","HealthyHey 2"];

  const generatedCampaigns = names.map((name, i) => ({
    id: `campaign-${i + 1}`,
    name,
    status: "Active",
    totalLeads: Math.floor(Math.random() * 500) + 100,
    successfulLeads: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    createdDate: new Date(
      Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  }));
    setCampaigns(generatedCampaigns);
  }, []);
  
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Campaigns</h3>
        <Button
        variant="outline"
        className="flex items-center space-x-1 px-3 py-1 text-sm border rounded-md">
          <span>All Campaigns</span>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id} className="cursor-pointer hover:bg-gray-100 border-b-5 border-gray-100">
                <TableCell className="font-semibold">{campaign.name}</TableCell>
                <TableCell className="!p-0 text-left">
                  <span className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// LinkedIn Accounts Component for Dashboard
const LinkedInAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const generatedAccounts = [
      { 
        id: 'acc-1', 
        name: 'Pulkit Garg', 
        email: 'pulkitgarg@gmail.com', 
        status: 'Connected', 
        requests: 17, 
        totalRequests: 30, 
        profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=PG' 
      },
      { 
        id: 'acc-2', 
        name: 'Jivesh Lakhani', 
        email: 'jivesh@gmail.com', 
        status: 'Connected', 
        requests: 18, 
        totalRequests: 30, 
        profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=JL' 
      },
      { 
        id: 'acc-3', 
        name: 'Indrajit Sahani', 
        email: 'indrajit38@mg@gmail.com', 
        status: 'Connected', 
        requests: 18, 
        totalRequests: 30, 
        profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=IS' 
      },
      { 
        id: 'acc-4', 
        name: 'Bhavya Arora', 
        email: 'bhavyagarar@99bad@gmail.com', 
        status: 'Connected', 
        requests: 16, 
        totalRequests: 100, 
        profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=BA' 
      },
    ];
    setAccounts(generatedAccounts);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg border mt-4">
      <h3 className="font-semibold text-lg mb-4">LinkedIn Accounts</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500">Account</TableHead>
              <TableHead className="text-gray-500">Status</TableHead>
              <TableHead className="text-gray-500 pl-16">Requests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {accounts.map((account) => (
    <TableRow key={account.id}>
      <TableCell className="font-medium text-sm">
        <div className="flex items-center gap-2">
          {/* Profile picture */}
          <img
            src={account.profilePicture}
            alt={account.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="flex items-center gap-1">
              {account.name}
              {/* LinkedIn logo in solid yellow */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-4 h-4"
                style={{ filter: "invert(84%) sepia(76%) saturate(567%) hue-rotate(1deg) brightness(102%) contrast(101%)" }}
              />
            </div>
            <div className="text-xs text-gray-500">{account.email}</div>
          </div>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <span className="flex items-center px-2 py-1 rounded-sm text-xs font-semibold bg-blue-800 text-white gap-1">
          <CircleCheck className="h-3 w-3" />
          {account.status}
        </span>
      </TableCell>

      <TableCell className="text-sm w-40">
        <div className="flex items-center gap-2">
          <Progress
            value={(account.requests / account.totalRequests) * 100}
            className="h-2 w-16 [&>div]:bg-blue-500" 
          />
          <span className="text-xs text-gray-500">
            {account.requests}/{account.totalRequests}
          </span>
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </div>
    </div>
  );
};

// Recent Activity Component for Dashboard
const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const generatedActivities = [
      { id: 'act-1', name: 'Om Satyarthy', role: 'Regional Head', status: 'Pending Approval', sent: null, profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=OS' },
      { id: 'act-2', name: 'Dr. Bhuvaneshwari', role: "Health Administrator", status: 'Sent 7 mins ago', sent: '7 mins ago', profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=DB' },
      { id: 'act-3', name: 'Surdeep Singh', role: 'Product Lead', status: 'Sent 7 mins ago', sent: '7 mins ago', profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=SS' },
      { id: 'act-4', name: 'Dilbag Singh', role: 'Tech Lead', status: 'Sent 7 mins ago', sent: '7 mins ago', profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=DS' },
      { id: 'act-5', name: 'Vanshy Jain', role: 'Product Manager', status: 'Sent 7 mins ago', sent: '7 mins ago', profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=VJ' },
      { id: 'act-6', name: 'Sunil Patel', role: 'Helping Fashion', status: 'Pending Approval', sent: null, profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=SP' },
      { id: 'act-7', name: 'Utkarsh K.', role: 'Design Head', status: 'Do Not Contact', sent: null, profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=UK' },
      { id: 'act-8', name: 'Shreya Ramakrishna', role: 'Product Analyst', status: 'Followup 10 mins ago', sent: '10 mins ago', profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=SR' },
      { id: 'act-9', name: 'Deepak Kumar', role: 'Deputy Manager', status: 'Followup 10 mins ago', sent: '10 mins ago', profilePicture: 'https://placehold.co/40x40/E5E7EB/4B5563?text=DK' },
    ];
    setActivities(generatedActivities);
  }, []);

  const getStatusColor = (status) => {
    if (status.includes('Pending')) return { color: 'bg-purple-100 text-purple-800', icon: <Clock className="w-3 h-3 inline mr-1" /> };
    if (status.includes('Sent')) return { color: 'bg-orange-100 text-orange-800', icon: <UserPlus className="w-3 h-3 inline mr-1" /> };
    if (status.includes('Followup')) return { color: 'bg-blue-100 text-blue-800', icon: <Send className="w-3 h-3 inline mr-1" /> };
    if (status.includes('Do Not Contact')) return { color: 'bg-gray-200 text-black', icon: <Ban className="w-3 h-3 inline mr-1" /> };
    return { color: 'bg-red-100 text-red-800', icon: null };
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        <Button
          variant="outline"
          className="flex items-center space-x-1 px-3 py-1 text-sm border rounded-md"
        >
          <span>Most Recent</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500">Lead</TableHead>
              <TableHead className="text-gray-500">Campaign</TableHead>
              <TableHead className="text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => {
              const status = getStatusColor(activity.status);
              return (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <img src={activity.profilePicture} alt={activity.name} className="w-8 h-8 rounded-full" />
                      <div className="text-sm">
                        <div className="font-semibold">{activity.name}</div>
                        <div className="text-gray-500 text-xs">{activity.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{activity.campaign}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${status.color}`}>
                      {status.icon}{activity.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Campaigns Page Component
const CampaignRow = ({ campaign, onClick }) => {
  // Map campaign status to colors
  const statusColorMap = {
    Draft: "bg-gray-100 text-gray-800",
    Active: "bg-green-100 text-green-800",
    Paused: "bg-yellow-100 text-yellow-800",
    Completed: "bg-blue-100 text-blue-800",
  };

  return (
    <TableRow
      onClick={() => onClick(campaign)}
      className="cursor-pointer hover:bg-gray-50"
    >
      {/* Campaign Name */}
      <TableCell className="font-medium">{campaign.name}</TableCell>

      {/* Status */}
      <TableCell>
        <span
          className={`px-2 py-1 rounded-md text-sm font-semibold ${
            statusColorMap[campaign.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {campaign.status}
        </span>
      </TableCell>

      {/* Total Leads with Users icon */}
      <TableCell>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="text-black">{campaign.totalLeads}</span>
        </div>
      </TableCell>

      {/* Request Status logs */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <UserPlus className="w-4 h-4 text-green-600" />
            <span className="text-black">0</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-black">{campaign.totalLeads}</span>
          </div>
          <div className="flex items-center gap-1">
            <CircleX className="w-4 h-4 text-red-600" />
            <span className="text-black">0</span>
          </div>
        </div>
      </TableCell>

      {/* Connection Status logs */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span className="text-black">0</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareQuote className="w-4 h-4 text-purple-600" />
            <span className="text-black">0</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

// CampaignsPage component
const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedAccounts, setSelectedAccounts] = useState(0);

  const campaignNames = [
    "Gynoveda", "EcoBoost", "HealthPlus", "SmartHome", "EduTech",
    "TravelMate", "FitLife", "GreenEnergy", "FoodiesHub", "StyleWave",
    "AutoDrive", "CleanWater", "MindSpark", "UrbanGrow", "TechSavvy",
    "WellnessWay", "AquaPure", "ShopEase", "PowerUp", "BrightFuture",
  ];

  // Generate mock data
  useEffect(() => {
    const generatedCampaigns = campaignNames.map((name, i) => ({
      id: `campaign-${i + 1}`,
      name,
      status: ["Draft", "Active", "Paused", "Completed"][
        Math.floor(Math.random() * 4)
      ],
      totalLeads: Math.floor(Math.random() * 20) + 1,
      connectionStatus: ["Connected", "Disconnected", "Error"][
        Math.floor(Math.random() * 3)
      ],
    }));
    setCampaigns(generatedCampaigns);
  }, []);

  // Filter logic
  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Active") return c.status === "Active";
    if (filter === "Inactive") return c.status !== "Active";
    return true;
  });

  return (
    <div className="p-6">
      {/* Header row */}
      <div className="flex justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {selectedCampaign ? "Campaign Details" : "Campaigns"}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your campaigns and track their performance
          </p>

          {!selectedCampaign && (
            <div className="inline-flex rounded-md shadow-sm mt-3 border bg-gray-100">
  <Button
    size="sm"
    onClick={() => setFilter("All")}
    className={`rounded-l-md border-r ${
      filter === "All"
        ? "bg-white text-gray-900 font-semibold shadow-sm"
        : "bg-transparent text-gray-600 hover:bg-gray-200"
    }`}
  >
    All Campaigns
  </Button>
  <Button
    size="sm"
    onClick={() => setFilter("Active")}
    className={`border-r ${
      filter === "Active"
        ? "bg-white text-gray-900 font-semibold shadow-sm"
        : "bg-transparent text-gray-600 hover:bg-gray-200"
    }`}
  >
    Active
  </Button>
  <Button
    size="sm"
    onClick={() => setFilter("Inactive")}
    className={`rounded-r-md ${
      filter === "Inactive"
        ? "bg-white text-gray-900 font-semibold shadow-sm"
        : "bg-transparent text-gray-600 hover:bg-gray-200"
    }`}
  >
    Inactive
  </Button>
</div>
          )}
        </div>

        {!selectedCampaign && (
          <div className="flex flex-col gap-2 items-end">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Campaign
            </Button>
            <div className="relative w-[250px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search campaigns..." className="pl-8 w-full" />
            </div>
          </div>
        )}
      </div>

      {!selectedCampaign ? (
        // Show Campaigns Table
        <div className="overflow-x-auto rounded-lg border">
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Leads</TableHead>
                <TableHead>Request Status</TableHead>
                <TableHead>Connection Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  onClick={setSelectedCampaign}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        //Campaign Details Page
        <div>
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b mb-6">
            <button
              onClick={() => setActiveTab("Overview")}
              className={`flex items-center gap-2 text-sm font-medium pb-2 ${
                activeTab === "Overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FileBarChart className="w-4 h-4" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("Leads")}
              className={`flex items-center gap-2 text-sm font-medium pb-2 ${
                activeTab === "Leads"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Users className="w-4 h-4" /> Leads
            </button>
            <button
              onClick={() => setActiveTab("Sequence")}
              className={`flex items-center gap-2 text-sm font-medium pb-2 ${
                activeTab === "Sequence"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FilePen className="w-4 h-4" /> Sequence
            </button>
            <button
              onClick={() => setActiveTab("Settings")}
              className={`flex items-center gap-2 text-sm font-medium pb-2 ${
                activeTab === "Settings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <>
              {/* Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="border rounded-lg p-3 shadow-sm bg-white flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Leads</span>
                    <div className="p-2 rounded-full bg-blue-100">
                      <Users className="w-5 h-5 text-blue-800" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold mt-2">
                    {selectedCampaign.totalLeads}
                  </p>
                </div>
                <div className="border rounded-lg p-3 shadow-sm bg-white flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Request Sent</span>
                    <div className="p-2 rounded-full bg-blue-100">
                      <Mail className="w-5 h-5 text-blue-800" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold mt-2">0</p>
                </div>
                <div className="border rounded-lg p-3 shadow-sm bg-white flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Request Accepted</span>
                    <div className="p-2 rounded-full bg-blue-100">
                      <MessageSquare className="w-5 h-5 text-blue-800" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold mt-2">0</p>
                </div>
                <div className="border rounded-lg p-3 shadow-sm bg-white flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Request Replied</span>
                    <div className="p-2 rounded-full bg-blue-100">
                      <Target className="w-5 h-5 text-blue-800" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold mt-2">0</p>
                </div>
              </div>

              {/* Progress + Campaign Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 shadow-sm bg-white">
                  <h3 className="text-base font-medium mb-4">Campaign Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                        <span>Leads Contacted</span>
                        <span>0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-[0%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                        <span>Acceptance Rate</span>
                        <span>0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-[0%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                        <span>Reply Rate</span>
                        <span>0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-[0%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm bg-white">
                  <h3 className="text-base font-medium mb-4">Campaign Details</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" /> Start Date:
                      02/09/2025
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-gray-500" /> Status:{" "}
                      {selectedCampaign.status}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-gray-500" /> Conversion
                      Rate: 0.0%
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Leads" && <LeadsPage />}
          {activeTab === "Sequence" && (
  <div className="space-y-6">
    <h2 className="text-xl font-bold">Message Sequence</h2>

    {/* Request Message */}
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-gray-800">Request Message</h3>
      <p className="text-sm text-gray-500 mb-2">Edit your request message here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Fields */}
        <div className="p-3 border rounded bg-gray-50 text-sm">
          <p className="font-semibold mb-2">Available fields:</p>
          <p><code>{"{{fullName}}"}</code> - Full Name</p>
          <p><code>{"{{firstName}}"}</code> - First Name</p>
          <p><code>{"{{lastName}}"}</code> - Last Name</p>
          <p><code>{"{{jobTitle}}"}</code> - Job Title</p>
        </div>

        {/* Message Template */}
        <div>
          <label className="text-sm text-gray-600">Message Template</label>
          <textarea
            className="w-full border rounded p-2 text-sm mt-1"
            rows="4"
            placeholder="Write your request message here..."
          />
          <div className="flex justify-end mt-2 gap-2">
            <button className="px-3 py-1 border rounded text-sm">Preview</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
          </div>
        </div>
      </div>
    </div>

    {/* Connection Message */}
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-gray-800">Connection Message</h3>
      <p className="text-sm text-gray-500 mb-2">Edit your connection message here.</p>
      <textarea
        className="w-full border rounded p-2 text-sm mt-1"
        rows="4"
        placeholder="Write your connection message..."
      />
      <div className="flex justify-end mt-2 gap-2">
        <button className="px-3 py-1 border rounded text-sm">Preview</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
      </div>
    </div>

    {/* First Follow-up */}
<div className="border rounded-lg p-4 bg-white shadow-sm">
  <h3 className="font-semibold text-gray-800">First Follow-up Message</h3>
  <p className="text-sm text-gray-500 mb-2">Edit your first follow-up message here.</p>
  <textarea
    className="w-full border rounded p-2 text-sm mt-1"
    rows={4}
    placeholder="Write your first follow-up..."
  />
  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <Timer className="w-4 h-4" />
      <span>Send</span>
      <select className="border rounded px-1 py-0.5 text-sm mx-1">
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
      </select>
      <span>After Welcome Message</span>
    </div>
    <div className="flex gap-2">
      <button className="px-3 py-1 border rounded text-sm">Preview</button>
      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
    </div>
  </div>
</div>

{/* Second Follow-up */}
<div className="border rounded-lg p-4 bg-white shadow-sm">
  <h3 className="font-semibold text-gray-800">Second Follow-up Message</h3>
  <p className="text-sm text-gray-500 mb-2">Edit your second follow-up message here.</p>
  <textarea
    className="w-full border rounded p-2 text-sm mt-1"
    rows={4}
    placeholder="Write your second follow-up..."
  />
  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <Timer className="w-4 h-4" />
      <span>Send</span>
      <select className="border rounded px-1 py-0.5 text-sm mx-1">
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
      </select>
      <span>After First Follow-Up</span>
    </div>
    <div className="flex gap-2">
      <button className="px-3 py-1 border rounded text-sm">Preview</button>
      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
    </div>
  </div>
</div>
  </div>
)}
          {activeTab === "Settings" && (
  <div className="p-6 space-y-6">
    {/* Top Bar */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Campaign Settings</h2>
      <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700">
        Save All Changes
      </button>
    </div>

    {/* Campaign Details */}
    <div className="rounded-xl border bg-white shadow p-6 space-y-6">
      <h3 className="text-lg font-semibold">Campaign Details</h3>

      {/* Campaign Name */}
      <div>
        <label className="block text-sm font-medium">Campaign Name</label>
        <input
          type="text"
          placeholder="Enter campaign name"
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campaign Status */}
      <div className="flex items-center justify-start gap-4">
        <span className="text-sm font-medium">Campaign Status</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200 relative
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-full">
          </div>
        </label>
      </div>

      {/* Request without personalization */}
      <div className="flex items-center justify-start gap-4">
        <span className="text-sm font-medium">Request without personalization</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200 relative
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-full">
          </div>
        </label>
      </div>

      <hr className="my-4" />

      {/* AutoPilot Mode */}
      <div>
        <h3 className="text-md font-semibold mb-2">AutoPilot Mode</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Let the system automatically manage LinkedIn account assignments
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200 relative
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-full">
            </div>
          </label>
        </div>
      </div>

      {/* Account Selector */}
      <div>
        <select
          className={`w-full rounded-full border px-4 py-2 pr-8 bg-gray-100 text-sm 
            ${selectedAccounts ? "text-black" : "text-gray-400"}`}
          onChange={(e) => setSelectedAccounts(parseInt(e.target.value))}
          value={selectedAccounts || ""}
        >
          <option value="" disabled className="text-gray-400">
            Select
          </option>
          <option value="1">1 account selected</option>
          <option value="2">2 accounts selected</option>
          <option value="3">3 accounts selected</option>
        </select>
      </div>

      {/* Selected Accounts */}
      <div>
        <h4 className="text-sm text-gray-500 mb-2">Selected Account(s)</h4>
        <div className="space-y-2">
          {selectedAccounts >= 1 && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                JD
              </div>
              <span>John Doe</span>
            </div>
          )}
          {selectedAccounts >= 2 && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                JS
              </div>
              <span>Jane Smith</span>
            </div>
          )}
          {selectedAccounts >= 3 && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">
                AJ
              </div>
              <span>Alex Johnson</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Danger Zone */}
<div className="rounded-xl border bg-white shadow p-6">
  <h3 className="text-lg font-semibold text-black">Danger Zone</h3>
  <p className="text-sm text-gray-500 mt-1">
    Irreversible and destructive actions
  </p>

  {/* Delete Campaign Box */}
  <div className="rounded-lg border p-4 flex items-center justify-between mt-4">
    <div>
      <h4 className="text-md font-semibold">Delete Campaign</h4>
      <p className="text-sm text-gray-500">
        Permanently delete this campaign and all associated data
      </p>
    </div>
    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      Delete Campaign
    </button>
  </div>
</div>
  </div>
)}
        </div>
      )}
    </div>
  );
};

// Dashboard Page Component
const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="col-span-1">
        <CampaignsDashboard />
        <LinkedInAccounts />
      </div>
      <div className="col-span-1">
        <RecentActivity />
      </div>
    </div>
  );
};
// Main App Component
const App = () => {
  const { isSidebarOpen, activePage, isAuthModalOpen, closeAuthModal, isLoggedIn, login, logout, toggleSidebar } = useUIStore();

  const renderPage = () => {
  switch (activePage) {
    case 'Dashboard':
      return <DashboardPage />;
    case 'Leads':
      return <LeadsPage />;
    case 'Campaigns':
      return <CampaignsPage />;
    // Remove any pages that don't exist
    default:
      // Dynamic placeholder for any page without a component
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">{activePage}</h1>
          <p className="mt-4 text-gray-600">
            This is a placeholder for the {activePage} page.
          </p>
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
        <header className="flex items-center h-16 px-6 border-b bg-white shadow-sm space-x-2">
  <Button onClick={toggleSidebar} variant="ghost" className="p-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-layout-panel-left w-6 h-6"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="9" x2="9" y1="3" y2="21" />
    </svg>
  </Button>

  {/* Vertical separator */}
  <div className="h-5 border-1 border-gray-300 mx-1"></div>

  <nav className="flex items-center text-sm text-gray-500">
    <span className="text-gray-900 font-semibold">{activePage}</span>
  </nav>
</header>
        <main>
          {renderPage()}
        </main>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onLogin={login} />
    </div>
  );
};

export default App;