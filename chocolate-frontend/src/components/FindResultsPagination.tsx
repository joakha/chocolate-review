import { PaginationProps } from '../types/types'

const FindResultsPagination = ({ pageTotal, paginationChange, selectedPage }: PaginationProps) => {

    const paginationNumbers = [];

    for (let i = 1; i <= pageTotal; i++) {
        paginationNumbers.push(i);
    }

    return (
        <div className='flex justify-center'>
            <ul className='flex gap-5'>
                {paginationNumbers.map((number) => (
                    <li className={`w-[50px] h-[50px] rounded-full flex justify-center ${selectedPage === number ? "bg-chocolate-milk" : "bg-chocolate-dark"}`}>
                        <button className='w-full h-full' onClick={() => paginationChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FindResultsPagination