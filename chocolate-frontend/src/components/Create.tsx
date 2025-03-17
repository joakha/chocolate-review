const Create = () => {
    return (
        <section className="basis-4/5 m-10">
            <article>
                <h1 className="text-center text-4xl font-bold mb-10">Create a New Review</h1>
                <form className="flex flex-col items-center"> 
                    <input className="w-[70vw] p-4 rounded-xl text-black" type="text" placeholder="Title" />
                    <textarea className="w-[70vw] h-[450px] mt-5 p-4 text-black rounded-xl" placeholder="Content" />
                </form>
            </article>
        </section>
    )
}

export default Create