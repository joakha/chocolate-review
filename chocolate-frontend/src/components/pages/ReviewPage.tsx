import Review from "../Review"
import Typebar from "../Typebar"

const ReviewPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
        <Review />
        <Typebar />
    </div>
  )
}

export default ReviewPage