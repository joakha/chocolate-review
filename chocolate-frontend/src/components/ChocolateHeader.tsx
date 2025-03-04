const ChocolateHeader = () => {
    return (
        <div className="w-full h-20 bg-chocolate-dark text-zinc-200 sticky top-0 flex items-center z-50 font-serif">
            <div className="flex basis-1/6 justify-center">
                <div>Logo</div>
            </div>
            <div className="flex basis-4/6 justify-center gap-5">
                <div>Home</div>
                <div>About</div>
            </div>
            <div className="flex basis-1/6 justify-center gap-5">
                <div>Profile</div>
                <div>Logout</div>
            </div>
        </div>
    )
}

export default ChocolateHeader