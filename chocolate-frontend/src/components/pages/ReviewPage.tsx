import Review from "../Review"
import Typebar from "../Typebar"

export const ReviewPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
        <Review />
        <Typebar />
    </div>
  )
}
