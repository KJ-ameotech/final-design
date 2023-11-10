import react, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCustomSearchProfile } from '../Redux/Actions/ProfileActions';
import { getLocalStorage } from '../Utils/LocalStorage';

const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profile = useSelector(state => state.Profile);
    const { searchByIdRes } = profile;

    const [search, setSearch] = useState("")

    const [isOpened, setIsOpened] = useState(false);
    const [showError, setShowError] = useState(false);

    function toggle() {
        setShowError(false)
        if (searchByIdRes?.length > 0 && search != '') {
            setSearch("")
            navigate("/user-profile")
        }
        setIsOpened(wasOpened => !wasOpened);
    }

    useEffect(() => {
        if (searchByIdRes?.length == 0) {
            setShowError(true)
        }
    }, [searchByIdRes])

    const handleSearchSubmit = (val) => {
        setShowError(false)
        setSearch(val);
        if (val.length == 10) {
            let id = getLocalStorage("user_id")
            const quary = `?user_id=${id}&custom_id=${val}`
            dispatch(getCustomSearchProfile(quary))
        } else if (val.length > 10) {
            setShowError(true)
        }
    }

    return (
        <>
            <div className="search-box-btn">
                {isOpened && (
                    <div className='input-msg'>
                        <input id="text" className='search-text set-input'
                            placeholder='User Id' type="text" value={search}
                            onChange={(evt) => { handleSearchSubmit(evt.target.value) }} />
                        {showError && <span className='error-msg'>Sorry! No User</span>}
                    </div>
                )}
                <span className="flaticon-search" onClick={toggle}></span>
            </div>
        </>
    )
}

export default Search;