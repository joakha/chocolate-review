import Banner from "../Banner"
import Previews from "../Previews"
import Typebar from "../Typebar"

const LandingPage = () => {
    return (
        <>
            <Banner />
            <div className="flex flex-col lg:flex-row">
                <Previews />
                <Typebar />
            </div>
        </>
    )
}

export default LandingPage