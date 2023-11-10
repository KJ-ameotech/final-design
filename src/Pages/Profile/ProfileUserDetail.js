import React, { useEffect, useState } from 'react';
import "./Profile.css"
import Layout from '../../Layout';
import { firstNameAndLastNameValidation } from '../../Utils/Validation';
import defaultImage from "../../assets/images/background/bg.jpg"
import { IoIosAlert } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage, removeLocalStorage } from '../../Utils/LocalStorage';
import { ProfilePost, getProfile, getProfileImage, getuser, uploadProfileImage } from '../../Redux/Actions/ProfileActions';
import { toast } from 'react-toastify';
import { toastify } from '../../Utils/Function';
import { useNavigate } from 'react-router-dom';

const ProfileUserDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profileState = useSelector((state) => state.Profile)
    const { postProfileData, uploadImageRes: { response } } = profileState
    const [profileData, setProfileData] = useState({
        height: "",
        weight: "",
        marital_status: "",
        hobbies: "",
        headline: "",
        caste: "",
        about_me: "",
        occupation: "",
        user: +getLocalStorage("user_id"),
        income: "",
        education: "",
        family_name: ""

    })
    const [profileImage, setProfileImage] = useState(null)
    const [file, setFile] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (postProfileData != null) {
            dispatch(getuser(postProfileData?.user))
            dispatch(getProfile(postProfileData?.user))
            dispatch(getProfileImage(postProfileData?.user))
            setTimeout(() => {
                // navigate("/");
                removeLocalStorage('access_token')
                removeLocalStorage('refresh_token')
                removeLocalStorage('user_id')
                window.location.href = "/login"
            }, 1000)
        }
    }, [postProfileData])

    const handleProfilePersonalInfo = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => {
            return {
                ...prev,
                [name]: name === "weight" ? +value : name === "height" ? +value : value
            }
        })
    }

    const handleProfleInfo = (e) => {
        e.preventDefault()
        // (
        //     !!(profileData.height + "")?.length
        //     && !!(profileData.weight + "").length
        //     && !!profileData.about_me?.length
        //     && !!profileData.caste?.length
        //     && !!profileData.headline?.length
        //     && !!profileData.marital_status?.length
        //     && !!profileData.occupation?.length &&
        //     !!profileData.education?.length &&
        //     !!profileData.income?.length &&
        //     !!profileImage.name?.length) 

        // (profileData.height + "")?.length > 1
        // && (profileData.weight + "")?.length > 1
        // && profileData.about_me?.length > 4
        // && profileData.caste?.length > 4
        // && profileData.headline?.length > 5
        // && profileData.occupation?.length > 4 &&

        if (
            !!profileImage?.name?.length) {
            dispatch(uploadProfileImage(profileImage))
            dispatch(ProfilePost(profileData))
        } else {
            setError(true)
        }
    }
    const handleProfileImage = (e) => {
        let { files } = e.target;
        const imageType = files[0].name.split(".")[1]
        if (imageType === "JPEG" ||
            imageType === "PNG" ||
            imageType === "png" ||
            imageType === "jpeg" ||
            imageType === "jpg" ||
            imageType === "JPG" ||
            imageType === "gif") {
            let image = files[0]
            setProfileImage(image)
            setFile(URL.createObjectURL(image));

        } else {
            toastify(toast.info, 'Please select valid image.')
        }
    }

    return (
        <Layout>
            <div className='user_profile' style={{ padding: "100px 0" }}>
                <div className='container mt-4'>
                <div class="row">
                    <div class="image-container col-lg-4 col-sm-12">
                        <div className='bg-main mt-2'>
                        
                        <div class="avatar-upload">
                            <div class="avatar-edit kils">
                                <input type='file' id="imageUpload" accept="image/*" onChange={handleProfileImage} />
                                <label for="imageUpload " className='pensil' ><i class="fa fa-camera" aria-hidden="true"></i>
</label>
                            </div>
                            <div class="avatar-preview">
                                <div id="imagePreview" style={{ backgroundImage: `url(${file || defaultImage})` }}>
                                </div>
                               
                            </div>
                            <div className='text-center'>
                                <h1>Profile Image Upload
                        </h1>                                                                                                                                                                                                                                                                                                                                                                                                        
                                </div>
                        </div>
                        <p className="form-text text-center mt-3" style={{ color: "red" }}>{(!profileImage?.name?.length && error) ? "Profile Image is Required" : ""}</p>
                        </div>
                    </div>
                    <div className="contact-form col-lg-8 col-sm-12 mt-2">
<div className='bg-main'>
                        <form method="post" action="emailsend" id="contact-form" onSubmit={(e) => handleProfleInfo(e)} encType="multipart/form-data">
                            <div className="row clearfix">

                                <div className="col-md-6 form-group">
                                    <input  type="number" maxlength="35" placeholder="Height (Optional)" name="height" tabindex="3" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.height && error) ? "Height is Required" : ((profileData.height + "")?.length == 1 && error) ? "Invalid Height." : ""}</p> */}
                                </div>

                                <div className="col-md-6 form-group">
                                    <input type="number" name="weight" maxlength="70" placeholder="Weight (Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.weight && error) ? "Weight is Required" : ((profileData.weight + "").length == 1 && error) ? "Invalid Weight." : ""}</p> */}
                                </div>
                                <div className="col-md-6 form-group">
                                    <select className="custom-select-box" name="marital_status" tabindex="7" id="MaritalStatus" onChange={(e) => handleProfilePersonalInfo(e)}>
                                        <option value="" disabled selected hidden>Marital Status (Optional)</option>
                                        <option value="single">Single</option>
                                        <option value="Widowed">Widowed</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Separated">Separated</option>
                                        <option value="Registered partnership">Registered partnership</option>
                                    </select>
                                </div>
                                {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.marital_status?.length && error) ? "Marital Status is Required" : ""}</p> */}
                                <div className="col-md-6 form-group">
                                    <input type="text" name="hobbies" maxlength="70" placeholder="Hobbies(Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                </div>
                                {/* <div className="col-lg-4 col-md-4 col-sm-12 form-group">
                                    <input type="button" value="Add Hobbies" style={{ width: "100%", height: "100%" }} onClick={(e) => handleHobbies(e)} />
                                </div> */}
                                <div className="col-md-6 form-group">
                                    <input type="text" name="headline" maxlength="70" placeholder="Headline (Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.headline.length && error) ? "Headline is Required" : (profileData.headline.length < 6 && error) ? "Invalid Headline. " : ""}</p> */}
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="text" name="caste" maxlength="70" placeholder="Caste (Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.caste.length && error) ? "Caste is Required" : (profileData.caste.length < 4 && error) ? "Invalid caste." : ""}</p> */}
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="text" name="occupation" maxlength="70" placeholder="Occupation (Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.occupation.length && error) ? "Occupation is Required" : (profileData.occupation.length < 5 && error) ? "Invalid Occupation." : ""}</p> */}
                                </div>
                                <div className="col-md-6 form-group">
                                    {/* <select className="custom-select-box" name="education" tabindex="7" id="education" onChange={(e) => handleProfilePersonalInfo(e)}>
                                        <option value="" disabled selected hidden>Education (Optional)</option>
                                        <option value="bachelor">Bachelor's</option>
                                        <option value="master">Master</option>
                                        <option value="phd">Phd</option>
                                    </select> */}
                                    <input type="text" name="education" maxlength="70" placeholder="Education (Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.education.length && error) ? "education is Required" : ""}</p> */}
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <input type="number" name="income" maxlength="70" placeholder="Income (Optional)" tabindex="4" onChange={(e) => handleProfilePersonalInfo(e)} />
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.income.length && error) ? "income is Required" : ""}</p> */}
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <textarea name="about_me" maxlength="250" placeholder="About me (Optional)" tabindex="5" onChange={(e) => handleProfilePersonalInfo(e)}></textarea>
                                    {/* <p className="form-text " style={{ color: "red" }}>{(!profileData.about_me.length && error) ? "About Me is Required" : (profileData.about_me.length < 5 && error) ? "Invalid About Me." : ""}</p> */}
                                </div>
                                <div className="col-md-12 text-right">
                                    <a><button className="btn btn-primary mt-4 mb-4" type="submit" name="submit" > <span tabindex="11" className="btn-title">Submit  </span></button></a>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
</div>
            </div>
        </Layout>
    )
}

export default ProfileUserDetail;