import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { getLocalStorage } from '../../Utils/LocalStorage';
import { useDispatch } from 'react-redux';
import { getProfile, getuser, updateProfileData } from '../../Redux/Actions/ProfileActions';
const EditProfile = ({ isEdit, profileUserData, cancelEdit }) => {
    const dispatch = useDispatch()
    const [editProfileData, setEditProfileData] = useState({
        name: "",
        username: "",
        email: "",
        profile_for: "",
        date_of_birth: "",
        religion: "",
        community: "",
        living_in: "",
        mobile_number: "",
        gender: "",
        family_name: "",
        user: +getLocalStorage("user_id"),
    })
    const [startDate, setStartDate] = useState("");
    const [hobbiesList, setHobbiesList] = useState([])
    const [hobbies, setHobbies] = useState('')

    const handleEditProfile = (e) => {
        const { name, value } = e.target;
        setEditProfileData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleHobbies = () => {
        if (!!hobbies.length) {
            setHobbiesList((prev) => [...prev, hobbies])
            setHobbies("")
        }
    }

    useEffect(() => {
        if (profileUserData) {
            const obj = { ...hobbiesList }

            setEditProfileData({ ...profileUserData, name: profileUserData?.first_name?.charAt(0)?.toUpperCase() + profileUserData?.first_name?.slice(1) + " " + profileUserData?.last_name, hobbies: { ...obj }, date_of_birth: moment(startDate).utc().format('YYYY-MM-DD') })
            setStartDate(moment(profileUserData.date_of_birth).utc()._d)
        }
    }, [profileUserData, hobbiesList])

    useEffect(() => {
        setEditProfileData({ ...editProfileData, date_of_birth: moment(startDate).utc().format('YYYY-MM-DD') })
    }, [startDate])

    const handleSaveEditProfileData = () => {
        dispatch(updateProfileData(getLocalStorage("user_id"), editProfileData))
        cancelEdit();
    }

    return (
        <div>
            {isEdit ?
                <div class="row">
                    <div class="col-lg-4">
                        <div class="info-profile-one">
                            <ul>
                                <li>Name</li>
                                <li>Username</li>
                                <li>Email</li>
                                <li>Profile For</li>
                                <li>Between age</li>
                                <li>Religion</li>
                                <li>Community</li>
                                <li>Living In</li>
                                <li>Mobile Number</li>
                                <li>Gender</li>
                                <li>Family Name</li>
                            </ul>
                        </div>

                    </div>
                    <div class="col-lg-8">
                        <div class="info-profile-one">
                            <ul>
                                <li><input type="text" name="name" placeholder='Name' value={editProfileData?.name} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><input type="text" name="username" placeholder='Username' value={editProfileData?.username} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><input type="text" name="email" placeholder='Email' value={editProfileData?.email} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><input type="text" name="profile_for" placeholder='Profile For' value={editProfileData?.profile_for} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                /></li>
                                <li><input type='text' name="religion" placeholder='Religion' value={editProfileData.religion} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><input type='text' name="community" placeholder='Community' value={editProfileData.community} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><input type='text' name="living_in" placeholder='Living In' value={editProfileData.living_in} onChange={(e) => handleEditProfile(e)} /></li>
                                <li><input type='text' name="mobile_number" placeholder='Mobile Number' value={editProfileData.mobile_number} onChange={(e) => handleEditProfile(e)} /></li>
                                <li>
                                    <select name="gender" onChange={(e) => handleEditProfile(e)}>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </li>
                                <li><input type='text' name="family_name" placeholder='Family Name' value={editProfileData.family_name} onChange={(e) => handleEditProfile(e)} /></li>

                                {/* <li><select name="Marital_Status" onChange={(e) => handleEditProfile(e)}>
                                    <option>Single</option>
                                    <option>Widowed</option>
                                    <option>Divorced</option>
                                    <option>Separated</option>
                                    <option>Registered partnership</option>
                                </select></li> */}
                                {/* {editProfileData.caste && <li><input type='text' name="caste" value={editProfileData.caste} onChange={(e) => handleEditProfile(e)} /></li>}
                                {editProfileData.income && <li><input type='number' name="income" value={editProfileData.income} onChange={(e) => handleEditProfile(e)} /></li>}
                                {editProfileData.height && <li><input type='number' name="height" value={editProfileData.height} onChange={(e) => handleEditProfile(e)} /></li>}
                                {editProfileData.weight && <li><input type='number' name="weight" value={editProfileData.weight} onChange={(e) => handleEditProfile(e)} /></li>}
                                {editProfileData.education && <li><input type='text' name="education" value={editProfileData.education} onChange={(e) => handleEditProfile(e)} /></li>}
                                {editProfileData.occupation && <li><input type='text' name="occupation" value={editProfileData.occupation} onChange={(e) => handleEditProfile(e)} /></li>}
                                {hobbies && <li><input type="text" name="hobbies" maxlength="70" tabindex="4" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
                                    <input type="button" value="Add Hobbies" onClick={(e) => handleHobbies(e)} />
                                </li>} */}
                            </ul>
                        </div>
                    </div>
                    <div className='btn-box text-right'>
                        <button className='btn btn-primary mx-2' onClick={handleSaveEditProfileData}>Save</button>
                        <button className='btn btn-secondary mx-2' onClick={() => cancelEdit()}>Cancel</button>
                    </div>
                </div> : ""}
        </div>
    )
}

export default EditProfile