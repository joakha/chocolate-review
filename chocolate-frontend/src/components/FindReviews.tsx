import { FormEvent, useState } from 'react';
import { useFind } from '../hooks/useFind'
import { PiSubtitlesBold } from 'react-icons/pi';
import { GiChocolateBar } from "react-icons/gi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const FindReviews = () => {

    const find = useFind();

    //local states for this component
    const [title, setTitle] = useState<string>(find.title);
    const [editedAt, setEditedAt] = useState<Date>(find.editedAt)
    const [chocolate, setChocolate] = useState<string>(find.chocolate);

    //save to global state at the end to save performance
    const submitCriteria = (e: FormEvent) => {
        e.preventDefault();
        find.saveFindCriteria(title, chocolate, editedAt);
    }

    return (
        <form
            onSubmit={submitCriteria}
            className='p-4 bg-chocolate-dark rounded-xl grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4'
        >
            <div className='flex items-center bg-chocolate-light rounded-xl p-2 gap-2'>
                <PiSubtitlesBold />
                <input
                    placeholder='Title...'
                    className='text-md focus:outline-none bg-chocolate-light text-white placeholder-slate-300'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='flex items-center bg-chocolate-light rounded-xl p-2 gap-2'>
                <GiChocolateBar />
                <input
                    placeholder='Chocolate...'
                    className='text-md focus:outline-none bg-chocolate-light text-white placeholder-slate-300'
                    value={chocolate}
                    onChange={(e) => setChocolate(e.target.value)}
                />
            </div>
            <div>
                <DatePicker
                    className='min-w-full bg-chocolate-light rounded-xl p-2 focus:outline-none text-white placeholder-slate-300'
                    selected={editedAt}
                    onChange={(date) => setEditedAt(date as Date)}
                    selectsStart
                    startDate={editedAt}
                    placeholderText='Date'
                />
            </div>
        </form>
    )
}

export default FindReviews