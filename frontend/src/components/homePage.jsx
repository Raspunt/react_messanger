
import { Component } from "react";

import axios from "axios"

import "../static/homePage.css";


class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            is_open_chat: false,
            selected_chat: "",
            selected_chat_id: "",
            chats: [],
            messages: [],
            is_aunticated: false,
            user: "user"
        }

        this.openChat = this.openChat.bind(this);

    }


    componentDidMount() {
        this.getAllChats();
        

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
                _this.setState({
                    chats: res.data,
                });
            })

    }

    loadMessages(chat_id) {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        const _this = this


        const data = {
            "chat_id": chat_id
        };


        axios.get(`${serverUrl}/chat/getMessages`, { params: data })
            .then((res) => {
                if (!Array.isArray(res.data)) {
                    console.log("receving data is not array");
                    return
                }

                _this.setState({
                    messages: res.data,
                });
            })
    }


    getUserInfo() {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        const _this = this

        axios.post(`${serverUrl}/user/AuthToken/`)
        
        .then((res) => {

            const { user, status } = res.data

            if (!status) {
                _this.setState({
                    is_aunticated: false,
                })
            }

            _this.setState({
                is_aunticated: true,
                user: user,
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
                const { name, _id } = res.data;

                this.setState({
                    is_open_chat: true,
                    selected_chat: name,
                    selected_chat_id: _id

                });
            })
            .catch((error) => {
                console.error("Error fetching chat data:", error);
            });

        this.loadMessages(chat_id)
    }


    CreateMessage(props) {
        if (props.message._id) {
            
            return (
                <div className="">lol</div>
            )

        } else {
            
            return (
                <div className="message_pos">
                    <div className="message">
                        <h3>{props.message.username}</h3>
                        <p>{props.message.content}</p>
                    </div>
                </div>
            );
        }
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
                            <h1>{this.props.user.username}</h1>
                        </div>
                    </div>

                    <div className="content_box">



                        <div className="chat_name">

                            {this.state.is_open_chat &&
                                <h1>{this.state.selected_chat}</h1>
                            }
                        </div>

                        <div className="messages_box">

                            {this.state.messages.map(message => (
                                <this.CreateMessage user={this.state.user._id} message={message} />


                            ))}
                        </div>

                        <div className="enter_message">
                            <input type="text" placeholder="Message..." />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default HomeComponent;