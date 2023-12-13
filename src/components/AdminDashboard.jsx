import { FaUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";
import StudentTable from "./StudentTable";
import FetchAllStudents from "../hook/FetchAllStudents";

const AdminDashboard = () => {
    const {data} = FetchAllStudents()
  return (
    <>
        <div className="">
            <div className="md:p-5 p-2">
                <div className="flex flex-wrap justify-evenly md:justify-start items-center gap-2">
                    <div className="flex items-center gap-2 md:gap-5 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="">
                            <FaUser size={30} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Visitors</p>
                            <p className="font-bold">1101</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-5 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="">
                            <FaUserCheck size={30} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Total User</p>
                            <p className="font-bold">{data?.data?.response.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-5 md:p-3 p-1 bg-inputColor rounded-md">
                        <div className="">
                            <BsTruck size={30} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs md:text-base">Total Course</p>
                            <p className="font-bold">8</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="my-5 md:my-0 px-2 md:px-5 md:flex items-start md:gap-3">
            <div className="md:flex-[3] flex-1 md:p-2 min-h-[300px] bg-textColor rounded-md mb-5 md:mb-0 p-2">
                <h1 className="font-bold text-base md:text-xl md:mb-5">Registered Students</h1>
                <StudentTable />
            </div>
            <div className="md:flex-1 flex-1 flex justify-center items-center md:p-2 min-h-[300px] bg-textColor rounded-md">
                <div className="w-44 aspect-square bg-BLUE rounded-full"></div>
            </div>
        </div>
    </>

  )
}

export default AdminDashboard