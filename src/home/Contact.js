import { useContext, useEffect } from "react";
import { ContactContext } from "./Home";

function Contact(props) {
    const {data, setData, id, setID} = useContext(ContactContext);
    const deleteContact = (id)=>{
        var d = [];
        while(data.length > 0) {
            var c = data.pop();
            if(c.id === id) {
                continue;
            }
            d.push(c);
        }
        setData(d);
    }
    useEffect(()=>{
        console.log(id)
    },[id])
    return (
        <>
        <li className="list-group-item bodyc colorf">
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                    <div>
                        {props.name}
                    </div>
                    <div>
                        <b className="ps-2">{props.phone}</b>
                    </div>
                </div>
                <div className="d-flex flex-row p-2">
                    <div className="px-2 edit">
                        <i className="fa-solid fa-pen-to-square" onClick={()=>setID(props.id)}></i>
                    </div>
                    <div className="px-2 delete">
                        <i className="fa-solid fa-trash" onClick={()=>deleteContact(props.id)} ></i>
                    </div>
                </div>
            </div>
        </li>
        </>
    );
}

export default Contact;