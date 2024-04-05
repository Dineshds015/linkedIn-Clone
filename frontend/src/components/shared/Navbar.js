import logo from "../../assets/images/li.png";
import { Icon } from '@iconify/react';
const Navbar=()=>{
    return (
        <div className="navbar w-full h-1/10 px-40 flex item-center justify-between py-2">
        <img src={logo} className="h-10" alt="logo"/>
        <div className="flex h-full items-center justify-between w-1/2">
          <div className="cursor-pointer text-gray-400 hover:text-gray-500 flex flex-col items-center justify-center">
            <Icon icon="ooui:articles-ltr" className="text-2xl"/>
            <div className="text-sm">Articles</div>
          </div>
          <div className="cursor-pointer text-gray-400 hover:text-gray-500 flex flex-col items-center justify-center">
            <Icon icon="fluent:people-16-filled" className="text-2xl"/>
            <div className="text-sm">People</div>
          </div>
          <div className="cursor-pointer text-gray-400 hover:text-gray-500 flex flex-col items-center justify-center">
            <Icon icon="arcticons:linkedin-learning" className="text-2xl"/>
            <div className="text-sm">Learning</div>
          </div>
          <div className="cursor-pointer text-gray-400 hover:text-gray-500 flex flex-col items-center justify-center">
            <Icon icon="ion:briefcase" className="text-2xl"/>
            <div className="text-sm">Jobs</div>
          </div>
          <div className="border-r border-gray-400 h-3/4"></div>
          <div className="text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-100 cursor-pointer">Join Now</div>
          <div className="text-sm font-semibold text-blue-400 border border-blue-400 px-5 py-3 rounded-full hover:bg-blue-100 cursor-pointer">Sign In</div>
        </div>
      </div>
    );
};

export default Navbar;