import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getLocalStorage } from '../../Utils/LocalStorage';
import { updateAboutData } from '../../Redux/Actions/ProfileActions';

const AboutMe = ({ profileUserData }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)
    let [aboutData, setAboutData] = useState();

    const handleAboutData = (e) => {
        const value = e.target.value;
        setAboutData(prevAboutData => value);
    }

    const handleSaveEditAboutData = () => {
        dispatch(updateAboutData(getLocalStorage("user_id"), aboutData))
        setIsEdit(false);
    }

    return (
        <div className="second-card my-4 px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mx-4 mt-2 mb-3 pt-3">
                <div className='d-flex align-items-center'>
                <span className="user-profile" > <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                <h6 className="ml-3 ">About me</h6>
                </div>
        
                <div>
                    <button className='btn btn-primary' onClick={() => {
                        setIsEdit(true)
                        setAboutData(profileUserData.about_me)
                    }}>
                        Edit About
                    </button>
                </div>
            </div>
            <div className="border-bottom-line mx-4 my-4"></div>
            <div className="profile-image">
                {isEdit ?
                    <>
                        <input type="text" name="name" placeholder='About me' value={aboutData} onChange={handleAboutData} />
                        <div className='btn-box text-right'>
                            <button className='btn btn-primary mx-2' onClick={handleSaveEditAboutData} >Save</button>
                            <button className='btn btn-secondary mx-2' onClick={() => setIsEdit(false)} >Cancel</button>
                        </div>
                    </>
                    :
                    <p className='desh'>{profileUserData.about_me}</p>}
            </div>
        </div>
    )
}

export default AboutMe