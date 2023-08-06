import { createContext, useEffect, useRef, useState } from 'react';
import Contact from './Contact';
import './Home.css';;

const ContactContext = createContext();

function Home(props) {
    const [data, setData] = useState([]);
    const [addVisible, setAddVisible] = useState(false); 
    const [id, setID] = useState(null);
    const name = useRef(null);
    const contact = useRef(null);
    const fetchUsers = async ()=>{
        await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => {setData(json)
        console.log(json)});
    }
    const save = async ()=>{
        const nn = await name.current.value;
        const cc = await contact.current.value;
        if(nn === '' || cc === '') {
            alert("Provide correct details");
        }
        if( id ) {
            for(var i =0; i<data.length; i++) {
                const d = data.slice(i,i+1)[0];
                if(d.id === id) {
                    d.name = nn;
                    d.phone = cc;
                    setID(null)
                    console.log('updated',data)
                    alert('updated');
                }
            }
            return;
        }
        
        data.push({"name":nn, "phone":cc, "id":Math.random(0, 10)});
        setAddVisible(false);
    }
    const handleCancel = ()=>{
        setAddVisible(false); 
        setID(null);
    }
    const handleAdd = ()=>{
        console.log(addVisible)
        setAddVisible(true); 
        setID(null);
        name && name.current && (name.current.value = "");
        contact && contact.current && (contact.current.value = "");
    }

    useEffect(()=>{
        if(data.length === 0){
            fetchUsers();
        }
        const getName = ()=>{
            console.log('getName')
            if(id) {
                for(var i =0; i<data.length; i++) {
                    const d = data.slice(i,i+1)[0];
                    if(d.id === id) {
                        name.current.value = d.name;
                    }
                }
            }
            return ''
        }
        const getNumber = ()=>{
            console.log('getPhone')
            if(id) {
                for(var i =0; i<data.length; i++) {
                    const d = data.slice(i,i+1)[0];
                    if(d.id === id) {
                        contact.current.value = d.phone;
                    }
                }
            }
        }
        getNumber();
        getName();
    },[props,id, data]);
    
    return (
        <ContactContext.Provider value={{data, setData, id, setID}} >
        <div className='bodyc'>
            <div className='body container-fluid bodyc'>
                <div className='container bodyc'>
                    <div className="card bodyc borderc">
                        <ul className="list-group list-group-flush ">
                            <li className="list-group-item bodyc colorf text-center">
                                <b>CONTACT LIST</b>
                                <div className='d-flex justify-content-end '>
                                    <div className="btn colorf" onClick={handleAdd}>
                                        Add New <i className="fa-solid fa-address-book fa-lg"></i></div>
                                </div>
                            </li>
                            {
                                (addVisible || id) && 
                                <li className="list-group-item bodyc colorf text-center m-1">
                                    Add details and Click Save
                                    <div className='position-absolute top-0 end-0'>
                                        <i className="fa-solid fa-circle-xmark fa-lg delete" 
                                        onClick={()=>handleCancel()}></i>
                                    </div>
                                    <div className='d-flex justify-content-end d-flex flex-column p-3'>
                                        <div className="input-group input-group-sm mb-3">
                                            <input type="text" className="form-control" id='name'
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                            placeholder='Enter Name' ref={name} />
                                        </div>
                                        <div className="input-group input-group-sm mb-3">
                                            <input type="text" className="form-control" id=''
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                            placeholder='Enter Contact Number' ref={contact}/>
                                        </div>
                                        <button type="submit" className='btn btn-info' onClick={save}>
                                            {id && <>Update Contact</>}
                                            {!id && <>Save Contact</>}
                                        </button>
                                    </div>
                                </li>
                            }
                        </ul>
                        <ul className="list-group list-group-flush">
                            {
                                data.map((d,id)=>{
                                    return <Contact data={[data,setData]} key={id} id={d.id} name={d.name} phone={d.phone} />
                                  })
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        </ContactContext.Provider>
    );
}

export default Home;
export {ContactContext};