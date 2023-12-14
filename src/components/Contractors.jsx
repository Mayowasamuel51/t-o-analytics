import FetchContractors from "../hook/FetchContractors"

const Contractors= () => {
  const { data } = FetchContractors()

  console.log(data?.data?.response)
  return (
    <div className="text-center font-bold md:text-4xl">Contractors</div>
  )
}

export default Contractors