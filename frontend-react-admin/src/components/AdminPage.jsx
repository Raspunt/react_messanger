
import { useEffect,Component,useState } from "react";

import axios from "axios"

import "../static/AdminPage.css";



class  AdminComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            selected_collection:"",
            collections:[]
        }

    }


    componentDidMount() {
        const serverUrl =  import.meta.env.VITE_SERVER_URL;
        console.log("request");

        axios.post(`${serverUrl}/collections/all`)
        .then((res)=>{
            // console.log(res.data);
            if (!Array.isArray(res.data)){
                console.log("receving data is not array");
                return
            }
                
                for (let i = 0; i < res.data.length; i++) {
                    const el = res.data[i];
                    // console.log(el);

                    this.setState({
                        collections: res.data
                    });
                }
        })
    }


    ShowCollection(collection_name){
        console.log(collection_name);
        

    }
    
  





    render(){

        return (
        
            <div className="main_container">
                
                <div className="left_sidebar">
                
                    <div className="left_sidebar_content">
                        <h1>db Tables</h1>
                        
                        <ul className="collections">

                        {this.state.collections.map(collection => (
                            <button className="btn_collection" onClick={()=> this.ShowCollection(collection.modelName)}>
                                <li key={collection.modelName}>{collection.modelName}</li>
                            </button>
                        ))}
                        
                        </ul>

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

                            <div className="collection_field">
                                <div>
                                    <h1 className="little_margin">Collection</h1>
                                    
                                </div>
                            </div>


                        </div>




                </div>

            </div>


        );
    }
}

export default AdminComponent;