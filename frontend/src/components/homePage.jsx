
import { Component } from "react";

import axios from "axios"

import "../static/homePage.css";



class  HomeComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            is_open_chat:false,
            selected_chat:"",
            chats:[],
            chat_users:[]
        }

        this.openChat = this.openChat.bind(this);

    }


    componentDidMount() {
        const serverUrl =  process.env.REACT_APP_SERVER_URL;
        console.log("request");

        const _this = this

        axios.get(`${serverUrl}/chats`)
        .then((res)=>{
            // console.log(res.data);
            if (!Array.isArray(res.data)){
                console.log("receving data is not array");
                return
            }
                
                for (let i = 0; i < res.data.length; i++) {
                    // const el = res.data[i];
                    // console.log(el);

                    _this.setState({
                        chats: res.data
                    });
                }
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
                    chat_users: users
                });
            })
            .catch((error) => {
                console.error("Error fetching chat data:", error);
            });
    }





    render(){

        return (
        
            <div className="main_container">
                
                <div className="left_sidebar">
                
                    <div className="left_sidebar_content">
                        <div className="chats">


                        
                        {this.state.chats.map(chat => (
                            <button className="btn_collection" onClick={()=> this.openChat(chat._id)}>
                                <li key={chat.name}>{chat.name}</li>
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

                        <div className="text_area">

                            <div className="chat_background">
                                <div className="chat_padding">

                                    {this.state.is_open_chat &&
                                        <h1>
                                            {this.state.selected_chat}
                                        </h1>
                                    
                                    }
                                    
                                </div>
                            </div>


                        </div>




                </div>

            </div>


        );
    }
}

export default HomeComponent;