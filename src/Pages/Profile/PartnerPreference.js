import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getLocalStorage } from '../../Utils/LocalStorage';
import { addUserPreferences, getUserPreferences } from '../../Redux/Actions/ProfileActions';

const PartnerPreference = ({ userPreferencesList }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)
    const [userPrefId, setUserPrefId] = useState(0)

    const [userPreference, setUserPreferences] = useState({
        min_age: '',
        max_age: '',
        min_height: '',
        max_height: '',
        religion_preference: '',
        caste_preference: '',
        marital_status_preference: '',
        education_preference: '',
        occupation_preference: '',
        country_of_residence: '',
        drinking_habits: '',
        diet: '',
        personal_value: '',
        any_disabblity: '',
        family_value: '',
        prefered_state: '',
        complexion: '',
        with_children_accpetance: '',
        smoking_habits: '',
        body_type: '',
        manglik: '',
        mother_tongue: '',
        prefered_country: '',
        prefered_status: '',
        user: getLocalStorage("user_id")
    })

    const handleUserPreferences = (e) => {
        const { name, value } = e.target;
        setUserPreferences((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSavePreferences = () => {
        const id = getLocalStorage("user_id");
        const isUpdate = userPrefId > 0 ? true : false;
        console.log("test", userPreference, isUpdate)
        setIsEdit(false);
        dispatch(addUserPreferences(id, userPreference, isUpdate))
        setTimeout(() => {
            dispatch(getUserPreferences(id));
        }, 800);
    }

    useEffect(() => {
        if (userPreferencesList?.length > 0) {
            setUserPreferences(userPreferencesList[0])
            setUserPrefId(userPreferencesList[0]?.id)
        }
    }, [userPreferencesList])

    return (
        <div class="information-card my-4 px-4 py-4">
            <div class="d-flex align-items-center justify-content-between mb-4 border-bottom-line">
                <div className='d-flex align-items-center mb-3'>
                <span class="mr-3 "><i class="fa fa-info-circle" aria-hidden="true"></i>
                </span>
                <h6 class="mb-1">Partner Preferences </h6>
                </div>
               <div className='mb-3'>
            <button className='btn btn-primary' onClick={() => { setIsEdit(!isEdit) }}>Edit Preference</button>

                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <div class="info-profile-one">
                        <ul>
                            <li>{userPreference?.min_age || isEdit ? "Min Age" : ""}</li>
                            <li>{userPreference?.min_height || isEdit ? "Min Height" : ""}</li>
                            <li>{userPreference?.religion_preference || isEdit ? "Religion Preference" : ""}</li>
                            <li>{userPreference?.marital_status_preference || isEdit ? "Marital Status" : ""}</li>
                            <li>{userPreference?.occupation_preference || isEdit ? "Occupation Preference" : ""}</li>
                            <li>{userPreference?.drinking_habits || isEdit ? "Drinking Habits" : ""}</li>
                            <li>{userPreference?.country_of_residence || isEdit ? "Country Of Residence" : ""}</li>
                            <li>{userPreference?.personal_value || isEdit ? "Personal Value" : ""}</li>
                            <li>{userPreference?.any_disabblity || isEdit ? "Any Disablity" : ""}</li>
                            <li>{userPreference?.family_value || isEdit ? "Family Value" : ""}</li>
                            <li>{userPreference?.prefered_state || isEdit ? "Prefered State" : ""}</li>
                            <li>{userPreference?.smoking_habits || isEdit ? "Smoking Habits" : ""}</li>
                            <li>{userPreference?.manglik || isEdit ? "Manglik" : ""}</li>
                            <li>{userPreference?.mother_tongue || isEdit ? "Mother Tongue" : ""}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="info-profile-one">
                        <ul>
                            <li>{isEdit ?
                                <>
                                    <input type="number" name="min_age" placeholder='Min Age' value={userPreference?.min_age} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.min_age}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="number" name="min_height" placeholder='Min Height' value={userPreference?.min_height} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.min_height}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="religion_preference" placeholder='Religion Preference' value={userPreference?.religion_preference} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.religion_preference}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="marital_status_preference" placeholder='Martial Status' value={userPreference?.marital_status_preference} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.marital_status_preference}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="occupation_preference" placeholder='Occupation' value={userPreference?.occupation_preference} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.occupation_preference}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="drinking_habits" placeholder='Drinking Habits' value={userPreference?.drinking_habits} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.drinking_habits}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="country_of_residence" placeholder='Country Of Residence' value={userPreference?.country_of_residence} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.country_of_residence}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="personal_value" placeholder='Personal Value' value={userPreference?.personal_value} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.personal_value}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="any_disabblity" placeholder='Any Disablity' value={userPreference?.any_disabblity} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.any_disabblity}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="family_value" placeholder='Family Value' value={userPreference?.family_value} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.family_value}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="prefered_state" placeholder='Prefered State' value={userPreference?.prefered_state} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.prefered_state}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="smoking_habits" placeholder='Smoking Habits' value={userPreference?.smoking_habits} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.smoking_habits}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="manglik" placeholder='Manglik' value={userPreference?.manglik} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.manglik}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="mother_tongue" placeholder='Mother Tongue' value={userPreference?.mother_tongue} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.mother_tongue}</>}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="info-profile-one">
                        <ul>
                            <li>{userPreference?.max_age || isEdit ? "Max Age" : ""}</li>
                            <li>{userPreference?.max_height || isEdit ? "Max Height" : ""}</li>
                            <li>{userPreference?.caste_preference || isEdit ? "Caste" : ""}</li>
                            <li>{userPreference?.education_preference || isEdit ? "Education" : ""}</li>
                            <li>{userPreference?.diet || isEdit ? "Diet" : ""}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="info-profile-one">
                        <ul>
                            <li>{isEdit ?
                                <>
                                    <input type="number" name="max_age" placeholder='Max Age' value={userPreference?.max_age} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.max_age}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="number" name="max_height" placeholder='Max Height' value={userPreference?.max_height} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.max_height}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="caste_preference" placeholder='Caste Preference' value={userPreference?.caste_preference} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.caste_preference}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="education_preference" placeholder='Education' value={userPreference?.education_preference} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.education_preference}</>}</li>
                            <li>{isEdit ?
                                <>
                                    <input type="text" name="diet" placeholder='Diet' value={userPreference?.diet} onChange={(e) => handleUserPreferences(e)} />
                                </> : <>{userPreference?.diet}</>}</li>
                        </ul>
                    </div>
                </div>
            </div>
            {isEdit && <div className='text-right'>
                <button className='btn btn-primary mr-2' onClick={handleSavePreferences}>Save</button>
                <button className='btn btn-secondary' onClick={() => { setIsEdit(false) }}>Cancel</button>
            </div>}
        </div>
    )
}

export default PartnerPreference