import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../../utils/settings';


const CreateProject = () => {
 
  //const[id,idchange]=useState("");
  const[name,namechange]=useState("");
  const[description,descriptionchange]=useState("");


 

  const handlesubmit=(e)=>{
    e.preventDefault();
    const projectdata = {name, description }
    console.log(projectdata)

    fetch(BASE_URL + "/api/project",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(projectdata)
    }).then((res)=>{

      alert('Saved successfully.')
      navigate('/');
    }).catch((err)=>{
      console.log(err.message)
    })

   }


  return (
 

<div className="row">
<div className="offset-lg-3 col-lg-6">
<form className="container" onSubmit={handlesubmit}>

<div className="card" style={{"textAlign":"left"}}>
  <div className="card-title">
      <h2>Create</h2>
  </div>
  <div className="card-body">

      <div className="row">

          <div className="col-lg-12">
              <div className="form-group">
                  <label>Name</label>
                  <input required value={name}  onChange={e=>namechange(e.target.value)} className="form-control"></input>
              </div>
          </div>

          <div className="col-lg-12">
              <div className="form-group">
                  <label>Description</label>
                  <input value={description} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
              </div>
          </div>
      

          <div className="col-lg-12">
              <div className="form-group">
                  <button className="btn btn-success" type="submit">Save</button>
              </div>
          </div>

          

      </div>

  </div>

</div>

</form>

</div>
</div>

  );
}


export default CreateProject;


       
        {/* <div className="col-lg-12">
              <div className="form-group">
                  <label>Harbours</label>
                  <select className="form-control" value={harbourId} onChange={e=>setHarbourId(e.target.value)}>
                    <option>Chose harbour</option>
                    {harbourList.map(harbour =>(
                      <option value={harbour.id} key={harbour.id}>  {harbour.name}  </option>
                    ))}
                  </select>
                  {/* <input value={harbourId} onChange={e=>setHarbourId(e.target.value)} className="form-control"></input> */}
              {/* </div> */}
          {/* </div> */} 



          // const[harbourId,setHarbourId]=useState("");
  // const [harbourList, setHarbourList] = useState([{'name': '', 'address': '', 'capacity': ''}])


  // useEffect(() => {
  //   fetch(BASE_URL + "/api/harbour/all")
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then(data => {
  //       console.log(data)
  //       setHarbourList(data)
  //   })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // const handlesubmit=(e)=>{
  //   e.preventDefault();
  //   const projectdata = {name, description }
  //   // const boatdata = {name,project: description,image, harbour:{id:harbourId} }
  
  //   console.log(projectdata)

  //   fetch(BASE_URL + "/api/project",{
  //     method:"POST",
  //     headers:{"content-type":"application/json"},
  //     body:JSON.stringify(projectdata)
  //   }).then((res)=>{

  //     alert('Saved successfully.')
  //     navigate('/');
  //   }).catch((err)=>{
  //     console.log(err.message)
  //   })

  //  }