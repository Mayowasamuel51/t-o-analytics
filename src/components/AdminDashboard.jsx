import { FaUser, FaDollarSign } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";

const AdminDashboard = () => {
    

  return (
    <>
        <div className="flex flex-wrap items-start gap-2 md:p-5">
            <div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 md:gap-5 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="border-2 md:border-4 md:p-2 p-1 rounded-full border-BLUE">
                            <FaUser size={20} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Visitors</p>
                            <p>1101</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="border-2 md:border-4 md:p-2 p-1 rounded-full border-BLUE">
                            <FaUserCheck size={20} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Total User</p>
                            <p>937</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="border-2 md:border-4 md:p-2 p-1 rounded-full border-BLUE">
                            <BsTruck size={20} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Total Course</p>
                            <p>8</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="border-2 md:border-4 md:p-2 p-1 rounded-full border-BLUE">
                            <FaDollarSign size={20} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Total Revenue</p>
                            <p>$9,300,000</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="md:p-2 min-h-[200px] bg-textColor rounded-md my-3">
                        <h1 className="font-semibold text-base md:text-xl">Total Earning</h1>
                    </div>
                </div>
            </div>
            <div className="md:p-2 min-h-[200px] bg-textColor flex-1 rounded-md">
                <h1 className="font-semibold text-base md:text-lg">Students by Country</h1>
            </div>
        </div>
        <div className="my-5 md:my-0 md:p-5 md:flex items-start md:gap-3">
            <div className="md:flex-[2] flex-1 md:p-2 min-h-[300px] bg-textColor rounded-md mb-5 md:mb-0">
                <h1 className="font-semibold text-base md:text-xl">Registered Students</h1>
            </div>
            <div className="md:flex-1 flex-1 flex justify-center items-center md:p-2 min-h-[300px] bg-textColor rounded-md">
                <div className="w-44 aspect-square bg-BLUE rounded-full"></div>
            </div>
        </div>
    </>

  )
}

export default AdminDashboard