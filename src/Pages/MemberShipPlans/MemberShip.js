import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import "./MemberShipPlans.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getsubscription } from '../../Redux/Actions/ProfileActions';

const MemberShip = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileState = useSelector((state) => state.Profile)
    const { subsriptionRes } = profileState;
    const [membershipList, setMembershipList] = useState([])

    const handlePayment = (e) => {
        openInNewTab(e.payment_url)
    }

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    useEffect(() => {
        dispatch(getsubscription())
    }, []);

    useEffect(() => {
        setMembershipList(subsriptionRes)
    }, [subsriptionRes])

    return (
        <Layout>
            <section className="cards-wrapper" style={{ padding: "150px 0" }}>
                <div className="container">
                    <div className="row">
                        {membershipList && membershipList.map((item, index) => {
                            return (
                                <div key={index} className=" col-md-6 col-lg-3 col-xl-3 col-sm-12 ">
                                    <div className="card-one-silver">
                                        <h4>{item.subscription_name}</h4>
                                        <h5>${item.price} / month</h5>
                                        <div className="border-line">
                                        </div>
                                        <div className="inner-list">
                                            {item.description}
                                        </div>
                                        <div className="last-button">
                                            <button type="button" onClick={() => handlePayment(item)}> All Promises</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default MemberShip