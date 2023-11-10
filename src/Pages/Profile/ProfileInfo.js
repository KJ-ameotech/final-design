import React, { useEffect, useState } from 'react'
import { calculateAge } from '../../Utils/Function'
import EditProfile from './EditProfile';

const ProfileInfo = ({ profileUserData, isEdit, setIsEdit, cancelEdit }) => {
    return (
        <div class="information-card my-4 px-4 py-4 hhhh">
            <div class="d-flex align-items-center  justify-content-between mb-4 border-bottom-line">
                <div className='d-flex align-items-center mb-3'>
                <span class="mr-3 "><i class="fa fa-info-circle" aria-hidden="true"></i>
                </span>
                <h6 class="">Profile</h6>
                </div>
             
                <div className='mb-3'> 
                    <button className='btn btn-primary' onClick={() => setIsEdit(true)}>
                        Edit Profile
                    </button>
                </div>
            </div>
            {!isEdit ?
                <div class="row">
                    <div class="col-lg-4">
                        <div class="info-profile-one">
                            <ul>
                                <li>{profileUserData?.first_name && profileUserData?.last_name ? "Name" : ""}</li>
                                <li>{profileUserData?.username ? "Username" : ""}</li>
                                <li>{profileUserData?.email ? "Email" : ""}</li>
                                <li>{profileUserData?.profile_for ? "Profile for" : ""}</li>
                                <li>{profileUserData?.date_of_birth ? "Between age" : ""}</li>
                                <li>{profileUserData?.religion ? "Religion" : ""}</li>
                                <li>{profileUserData?.community ? "Community / Caste" : ""}</li>
                                <li>{profileUserData?.living_in && "Living in"}</li>
                                <li>{profileUserData?.mobile_number && "Mobile Number"}</li>
                                <li>{profileUserData?.gender && "Gender"}</li>
                                <li>{profileUserData?.family_name ? "Family Name" : ""}</li>
                            </ul>
                        </div>

                    </div>

                    <div class="col-lg-8">
                        <div class="info-profile-one">
                            <ul>
                                <li>{profileUserData && profileUserData?.first_name?.charAt(0)?.toUpperCase() + profileUserData?.first_name?.slice(1) + " " + profileUserData?.last_name}</li>
                                <li>{profileUserData?.username}</li>
                                <li>{profileUserData?.email}</li>
                                <li>{profileUserData?.profile_for}</li>
                                <li>{calculateAge(profileUserData?.date_of_birth)}</li>
                                <li>{profileUserData?.religion}</li>
                                <li>{profileUserData?.community}</li>
                                <li>{profileUserData?.living_in}</li>
                                <li>{profileUserData?.mobile_number}</li>
                                <li>{profileUserData?.gender}</li>
                                <li>{profileUserData?.family_name}</li>
                            </ul>
                        </div>

                    </div>
                </div> : ""}
            <EditProfile isEdit={isEdit} profileUserData={profileUserData} cancelEdit={cancelEdit} />
        </div>
    )
}

export default ProfileInfo