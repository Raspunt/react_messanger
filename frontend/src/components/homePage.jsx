
import { Component } from "react";

import axios from "axios"

import "../static/homePage.css";
import send_logo from "../static/img/send_logo.svg"


class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            is_open_chat: false,
            selected_chat: "",
            chats: [],
            chat_users: [],
            is_aunticated:false,
            user:{}
        }

        this.openChat = this.openChat.bind(this);

    }


    componentDidMount() {
        this.getAllChats();
        // this.getUserInfo();

   
    }

    getAllChats() {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        const _this = this

        axios.get(`${serverUrl}/chats`)
            .then((res) => {
                if (!Array.isArray(res.data)) {
                    console.log("receving data is not array");
                    return
                }

                for (let i = 0; i < res.data.length; i++) {

                    _this.setState({
                        chats: res.data
                    });
                }
            })
    }

    getUserInfo() {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const token = localStorage.getItem("token")

        const _this = this

        axios.post(`${serverUrl}/user/AuthToken/`,{
            'token':token
        })
            .then((res) => {
                
                const {user,status} = res.data

                if (!status){
                    _this.setState({
                        is_aunticated:false,
                    })
                }
                
                _this.setState({
                    is_aunticated:true,
                    user:user,
                })


            })
            .catch((res) => {
                // console.log(res);
            })
    }




    openChat(chat_id) {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        console.log("Requesting chat data...");

        axios.get(`${serverUrl}/chat/${chat_id}`)
            .then((res) => {
                const { name, users } = res.data;

                this.setState({
                    is_open_chat: true,
                    selected_chat: name,
                    chat_users: users,

                });
            })
            .catch((error) => {
                console.error("Error fetching chat data:", error);
            });
    }





    render() {

        return (

            <div className="main_container">
                <div className="left_sidebar">
                    <div className="left_sidebar_content">
                        <div className="chats">

                            {this.state.chats.map(chat => (
                                <button className="btn_collection" onClick={() => this.openChat(chat._id)}>
                                    <p>
                                        {chat.name}
                                    </p>
                                </button>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="top_header">
                        <input className="search_field" type="text" placeholder="search" />
                        <div className="profile_username">
                            <h1>kekes</h1>
                        </div>
                    </div>

                    <div className="content_box">

                        <div className="chat_name">

                            {this.state.is_open_chat &&
                                <h1>{this.state.selected_chat}</h1>
                            }
                            <h1>Chat name</h1>
                        </div>

                        <div className="messages_box">
                            
                        </div>

                        <div className="enter_message">
                            <img src={send_logo} alt="" />
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}

export default HomeComponent;