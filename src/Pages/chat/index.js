import React, { useState } from "react";
import "./chat.css";
import Layout from "../../Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, getFriendList } from "../../Redux/Actions/ProfileActions";
import { getLocalStorage } from "../../Utils/LocalStorage";
import { baseUrl, chatPortUrl } from "../../Utils/ApiUrl";
import { BiSend } from "react-icons/bi"

// let chatPortURL = "ws://127.0.0.1:8001/ws/";

const Chat = () => {
    const dispatch = useDispatch();
    const friendListState = useSelector((state) => state.Profile)
    const { friendList, friendListLoading, chatRoomList, chatRoomLoading } = friendListState
    const [friendListData, setFriendListData] = useState([])

    const [userId, setUserId] = useState(getLocalStorage('user_id'));
    const [userData, setUserData] = useState(JSON.parse(getLocalStorage('profileData')));
    const [selectedFriend, setSelectedFriend] = useState({})
    const [roomName, setRoomName] = useState('');
    const [sendMessage, setSendMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [chatSocket, setChatSocket] = useState(null);

    useEffect(() => {
        if (roomName != '') {
            let webSocket = new WebSocket(chatPortUrl + roomName + '/');
            console.log("socket", webSocket)
            webSocket.onopen = function (e) {
                console.log("The connection was setup successfully !");
            };
            webSocket.onclose = function (e) {
                console.log("Something unexpected happened !");
            };
            webSocket.onmessage = function (e) {
                const data = JSON.parse(e.data);
                let msg = {};
                if (data.username == userId) {
                    msg = {
                        id: data.username,
                        message: data.message,
                        name: userData.first_name + ' ' + userData.last_name,
                        username: userData.username,
                        image: userData.profile_image,
                        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                }
                else {
                    msg = {
                        id: data.username,
                        message: data.message,
                        name: selectedFriend.first_name + ' ' + selectedFriend.last_name,
                        username: userData.username,
                        image: userData.profile_image,
                        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                }
                setMessages((messages) => [...messages, msg]);
            }

            setChatSocket(webSocket);

            if (chatRoomList?.messages?.length > messages.length) {
                for (let index = 0; index < chatRoomList?.messages?.length; index++) {
                    const element = chatRoomList?.messages[index];
                    let el = {};
                    if (element.user == userId) {
                        el = setItem(element, userData)
                    }
                    else {
                        el = setItem(element, selectedFriend)
                    }
                    setMessages((messages) => [...messages, el]);
                }
            }
        }
    }, [chatRoomList])

    const setItem = (req, data) => {
        return {
            id: req.user,
            message: req.content,
            name: data.first_name + ' ' + data.last_name,
            username: data.username,
            image: data.profile_image,
            date: new Date(req.created_on).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    useEffect(() => {
        let objDiv = document.getElementsByClassName("body-chat-message-user")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [messages]);

    const handleSendMessage = (e) => {
        if (sendMessage) {
            e.preventDefault();
            let data = { username: userId, message: sendMessage, room_name: roomName };
            setSendMessage('');
            chatSocket.send(JSON.stringify(data));
        }
    }

    useEffect(() => {
        if (friendList) {
            setFriendListData(friendList)
        }
    }, [friendList])

    useEffect(() => {
        dispatch(getFriendList(userId))
    }, [userId])

    const handleCurrentChatUser = (item) => {
        chatSocket?.close();
        setChatSocket(null);
        setSendMessage('');
        setSelectedFriend(item);
        dispatch(createRoom(item.slug));
        setRoomName(item.slug);
        setMessages([])
    }
    return (
        <Layout>
            <section style={{ padding: "100px 0" }}>
                <div className="content-chat mt-20">
                    <div className="content-chat-user">
                        <div className="head-search-chat">
                            <h4 className="text-center">Chat Finder</h4>
                        </div>

                        <div className="search-user mt-30">
                            <input id="search-input" type="text" placeholder="Search..." name="search" className="search" />
                            <span>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>

                        <div className="list-search-user-chat mt-20">
                            {friendListData?.subscription_name == "Gold" &&
                                <div>Please upgrade you plan to chat with the user</div>
                            }
                            {friendListData?.subscription_name == "Diamond" &&
                                friendListData?.user_data?.length > 0 && friendListData.user_data.map((item, index) => {
                                    return (
                                        <div className="user-chat" key={index}
                                            data-username={item?.first_name.charAt(0).toUpperCase() +
                                                item?.first_name.slice(1) + " " +
                                                item?.last_name.charAt(0).toUpperCase() +
                                                item?.last_name.slice(1)}
                                            onClick={() => handleCurrentChatUser(item)}>
                                            <div className="user-chat-img">
                                                <img src={item?.profile_image ? baseUrl + item?.profile_image :
                                                    "/assets/images/background/bg.jpg"} alt="user_image" />
                                                <div className="online"></div>
                                            </div>

                                            <div className="user-chat-text">
                                                <p className="mt-0 mb-0"><strong>{item?.first_name.charAt(0).toUpperCase() + item?.first_name.slice(1) + " " + item?.last_name.charAt(0).toUpperCase() + item?.last_name.slice(1)}</strong></p>
                                                <small>Hi, how are you?</small>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    {selectedFriend?.first_name ?
                        <div className="content-chat-message-user" data-username="Maria Dennis">
                            <div className="head-chat-message-user">
                                <img src={selectedFriend?.profile_image ? baseUrl + selectedFriend?.profile_image : "/assets/images/background/bg.jpg"} alt="" />
                                <div className="message-user-profile">
                                    <p className="mt-0 mb-0 text-white"><strong>{selectedFriend?.first_name?.charAt(0).toUpperCase() + selectedFriend?.first_name?.slice(1) + " " + selectedFriend?.last_name?.charAt(0).toUpperCase() + selectedFriend?.last_name?.slice(1)}</strong></p>
                                    <small className="text-white"><p className="online mt-0 mb-0"></p>Online</small>
                                </div>
                            </div>
                            <div className="body-chat-message-user">
                                {!!messages?.length && messages?.map((item) => {
                                    return (
                                        <div className={item?.id == userId ? "message-user-right" : "message-user-left"}>
                                            <div className={item?.id == userId ? "message-user-right-img" : "message-user-left-img"}>
                                                <img src={item.image ? baseUrl + item.image :
                                                    "/assets/images/background/bg.jpg"} alt="" />
                                                <p className="mt-0 mb-0"><strong>{item.name}</strong></p>
                                                <small>{item.date}</small>
                                            </div>
                                            <div className={item?.id == userId ? "message-user-right-text" : "message-user-left-text"}>
                                                <strong>{item.message}</strong>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="footer-chat-message-user">
                                <div className="message-user-send">
                                    <input type="text" value={sendMessage} placeholder="Please write message" onChange={(e) => setSendMessage(e.target.value)} />
                                </div>
                                <button type="button" onClick={handleSendMessage}>
                                    <BiSend size={25} />
                                </button>
                            </div>
                        </div>
                        :
                        <div className="content-chat-message-user chat-content-empty p-0 h-100%" data-username="Maria Dennis">
                            <div className="body-chat-message-user m-0">
                                <p classNameName="text-center pt-2">Tab on a chat to start conversation</p>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </Layout>
    );
};

export default Chat;
