import FetchContacts from "../hook/FetchContacts";
import Loader from "./Loader";

const Contacts = () => {
  const { data, isLoading, error } = FetchContacts()

  if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>
  if (isLoading) return <Loader />

  console.log(data?.data?.data)

  return (
    <div className="p-2 md:p-5">
      <table className="border-2 table-auto border-separate border-spacing-1 border-textColor w-full">
        <thead className="text-left md:font-black text-xs md:text-xl">
          <tr className="">
            <th className="border-2">Date</th>
            <th className="border-2">Name</th>
            <th className="border-2">Email</th>
            <th className="border-2">Message</th>
            <th className="border-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data.map((contact, index)=> (
            <tr className="contact text-xs md:text-base" key={index}>
              <td className="border-2">{(new Date(contact.date)).toLocaleDateString()}</td>
              <td className="border-2">{contact.name}</td>
              <td className="border-2">{contact.email}</td>
              <td className="border-2">{contact.message}</td>
              <td className="border-2">{contact.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Contacts