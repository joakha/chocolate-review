import Header from "./Header"
import Banner from "./Banner"
import Previews from "./Previews"
import Typebar from "./Typebar"

const Landing = () => {
    return (
        <>
            <Header />
            <Banner />
            <div className="flex flex-col lg:flex-row">
                <Previews />
                <Typebar />
            </div>
        </>
    )
}

export default Landing