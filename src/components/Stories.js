import { memo } from "react";
import './Stories.css'
import { baseUrl } from "../Utils/ApiUrl";

const Stories = ({ storiesList }) => {

    return (
        <>
            <h3 className="mt-4  succes">Success Stories</h3>
            <div className="story">
                {storiesList?.length > 0 && storiesList?.map((item, index) => {
                    return (
                        <div className="item mr-4 mt-3" key={index}>
                            <div className="card p-0 pmd-card" style={{ position: "relative" }}>
                                <div className="pmd-card-media text-center">
                                    <img className="story-img img-fluid" src={item?.image ? baseUrl + item.image : "/assets/images/background/bg.jpg"} alt="" />
                                </div>

                                <div className="card-body text-cente p-3">
                                    <h2 className="card-title">{item.title}</h2>
                                    <p className="card-text ">{item.content}<a className="ml-1 card-span">Read more</a></p>
                                </div>

                            </div>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default memo(Stories)