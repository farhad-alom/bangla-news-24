import Image from 'next/image';
import React from 'react';
import NavLinks from './Navlinks';

const Header = () => {
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    })

    return (
        <header className='py-4 border-b border-gray-200 mb-2'>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                
                {/* বাম পাশ খালি রাখা হয়েছে ব্যালেন্স করার জন্য */}
                <div className='hidden md:block'></div>

                {/* লোগো ও তারিখ */}
                <div className='flex gap-3 items-center justify-center'>
                    <Image 
                        className='w-10 h-10 object-contain' 
                        src={"/logo.webp"} 
                        alt="LOGO" 
                        width={40} 
                        height={40} 
                        priority
                    />
                    <div>
                        <span className='text-red-600 font-bold text-2xl tracking-wide'>Bangla News 24</span>
                        <div className='text-gray-500 text-sm'>{date}</div>
                    </div>
                </div>

                {/* সাইন ইন ও সাইন আপ বাটন */}
                <div className='flex gap-3 justify-center md:justify-end'>
                    <button className='text-gray-700 hover:text-black text-sm font-medium px-3 py-1.5'>সাইন ইন</button>
                    <button className='bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors'>সাইন আপ</button>
                </div>

                {/* নেভবার বা ক্যাটাগরি লিংকস */}
                <div className="col-span-1 md:col-span-3 mt-2">
                    <NavLinks />
                </div>

            </div>
        </header>
    );
};

export default Header;
// [cite: 3]