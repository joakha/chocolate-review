import Typebar from "../Typebar"
import Create from "../Create"

const CreatePage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
        <Create />
        <Typebar />
    </div>
  )
}

export default CreatePage