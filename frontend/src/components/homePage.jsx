
import { Component } from "react";

import axios from "axios"

import socketIO from 'socket.io-client';

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
            user: "user",
            scrollTop: 0,
            page: 1

        }

        this.openChat = this.openChat.bind(this);

    }


    componentDidMount() {
        this.getAllChats();
        this.loadUser();

        this.socket = socketIO.connect(process.env.REACT_APP_SERVER_URL)


    }

    handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

        const scrollThreshold = 100;
        const isAtBottom = scrollHeight - scrollTop <= clientHeight + scrollThreshold;


        if (isAtBottom) {
            this.setState((prevState) => ({
                page: prevState.page + 1,
            }));


            this.loadMessages(this.state.selected_chat_id);
        }

        this.setState({
            scrollTop,
        });

    };


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

        const data = {
            "chat_id": chat_id,
            "page": this.state.page,
            "perPage": 20
        };

        this.socket.emit("get_messages", data);

        this.socket.on("set_messages", (data) => {
            this.setState({
                messages: [...this.state.messages, ...data]
            })
        });

    }

    loadUser() {

        const _this = this;

        axios.get(`${process.env.REACT_APP_SERVER_URL}/user/Token`, {
            withCredentials: true
        })
            .then(res => {
                // console.log(res);
                _this.setState({
                    user: res.data
                })
            })

            .catch(err => {
                console.log(err);
            })

    }







    openChat(chat_id) {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        console.log("Requesting chat data...");

        this.setState({
            page: 1,
            messages: []
        })

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

        if (props.message.sender_id === props.user._id) {
            return (
                <div className="message_pos_our">
                    <div className="message_our">
                        <h3>{props.message.username}</h3>
                        <p>{props.message.content}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="message_pos_another">
                    <div className="message_another">
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
                            <h1>{this.state.user.username}</h1>
                        </div>
                    </div>

                    <div className="content_box">

                        

                        <div className="chat_name">
                            {this.state.is_open_chat &&
                                <h1>{this.state.selected_chat}</h1>
                            }
                        </div>
                        
                        <div className="messages_box" onScroll={this.handleScroll}>

                            {this.state.messages.map(message => (
                                <this.CreateMessage user={this.state.user} message={message} />

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