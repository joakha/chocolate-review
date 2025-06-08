import { FormEvent, useState } from 'react';
import { useFind } from '../hooks/useFind'
import { PiSubtitlesBold } from 'react-icons/pi';
import { GiChocolateBar } from "react-icons/gi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const FindReviews = () => {

    const find = useFind();

    const navigate = useNavigate();

    //local states for this component
    const [title, setTitle] = useState<string>(find.title);
    const [editedAt, setEditedAt] = useState<Date>(find.editedAt)
    const [chocolate, setChocolate] = useState<string>(find.chocolate);

    //save to global state at the end to save performance
    const submitCriteria = (e: FormEvent) => {
        e.preventDefault();
        find.saveFindCriteria(title, chocolate, editedAt);
        navigate("/find-reviews");
    }

    return (
        <form
            onSubmit={submitCriteria}
            className='p-4 bg-chocolate-dark rounded-xl grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'
        >
            <div className='flex items-center bg-chocolate-light rounded-xl p-2 gap-2'>
                <PiSubtitlesBold size={24} />
                <input
                    id='title'
                    placeholder='Title...'
                    className='w-full text-md focus:outline-none bg-chocolate-light text-white placeholder-slate-300'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='flex items-center bg-chocolate-light rounded-xl p-2 gap-2'>
                <GiChocolateBar size={24} />
                <input
                    id='chocolate'
                    placeholder='Chocolate...'
                    className='w-full text-md focus:outline-none bg-chocolate-light text-white placeholder-slate-300'
                    value={chocolate}
                    onChange={(e) => setChocolate(e.target.value)}
                />
            </div>
            <div>
                <DatePicker
                    id='editedAt'
                    className='min-w-full bg-chocolate-light rounded-xl p-2 focus:outline-none text-white placeholder-slate-300'
                    selected={editedAt}
                    onChange={(date) => setEditedAt(date as Date)}
                    selectsStart
                    startDate={editedAt}
                    placeholderText='Date'
                    wrapperClassName='min-w-full'
                />
            </div>
            <div className='flex gap-2'>
                <button className='w-2/3 bg-chocolate-milk text-white h-full p-2 font-bold rounded-xl text-md hover:bg-chocolate-white hover:text-chocolate-milk'
                >
                    Find
                </button>
                <button className='w-1/3 bg-chocolate-milk text-white h-full p-2 font-bold rounded-xl text-md hover:bg-chocolate-white hover:text-chocolate-milk'
                >
                    Reset
                </button>
            </div>
        </form>
    )
}

export default FindReviews