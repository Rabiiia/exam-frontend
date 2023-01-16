import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../../utils/settings';

const AddDeveloperToProject = () => {
    
    const [data, setData] = useState(null);
    const[projectId,setProjectId]=useState("");
    const [developerList, setDeveloperList] = useState([{'name': '', 'email': '', 'billingPrHour': ''}])
    const[developerId,setDeveloperId]=useState("");

    const handlesubmit=(e)=>{
        e.preventDefault();
        const projectdata = {projectId, developerId};
   
        fetch(BASE_URL + "/api/project/" + projectId + "/developer/" + developerId ,{
          method:"POST",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(projectdata)
        }).then((res)=>{
          alert('Saved successfully.')

        }).catch((err)=>{
          console.log(err.message)
        })
    
       }

       // ALL PROJECTS LIST ALREADY THERE SO YOU CAN SEE ID'S
    useEffect(() => {
      fetch(BASE_URL + "/api/project/all")
        .then((res) => {
          return res.json()
        })
        .then(data => {
          console.log(data)
          setData(data)
      })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);

    // ALL DEVELOPER LIST BECAUSE YOU WANT TO MAKE DROP DOWN! 

    useEffect(() => {
      fetch(BASE_URL + "/api/developer/all")
        .then((res) => {
          return res.json()
        })
        .then(data => {
          console.log(data)
          setDeveloperList(data)
      })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
    
    return (
    <div className="container">
        <br></br>
        <div className="card">
          <div className="card-title">
            <h2>List</h2>
          </div>
          <div className="card-body">
            <table className="table table-default">
              <thead className="bg-dark text-white">
                <tr>
                <td>Id</td>
                  <td>Name</td>
                  <td>Project</td>
                </tr>
              </thead>
              <tbody>
              {data?.length > 0 && data.map((project) => {
                return (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                    </tr>
                    );
              })}
                  
              </tbody>
            </table>
          </div>
        </div>



        <form className="container" onSubmit={handlesubmit}>
        
        {/* DROP DOWN */}
        <div className="col-lg-12">
              <div className="form-group">
                  <label>Developers</label>
                  <select className="form-control" value={developerId} onChange={e=>setDeveloperId(e.target.value)}>
                    <option>Chose Developer</option>
                    {developerList.map(developer =>(
                      <option value={developer.id} key={developer.id}>  {developer.name} with id = {developer.id}  </option>
                    ))}
                  </select>
                  {/* <input value={harbourId} onChange={e=>setHarbourId(e.target.value)} className="form-control"></input> */}
              </div>
          </div>

          <div className="col-lg-12">
              <div className="form-group">
                  <label>Project Id</label>
                  <input value={projectId} onChange={e=>setProjectId(e.target.value)} className="form-control"></input>
              </div>
          </div>

          <div className="col-lg-12">
              <div className="form-group">
                  <button className="btn btn-success" type="submit">Save</button>
              </div>
          </div>
          </form>
      </div>
      

      
     
    );
}


export default AddDeveloperToProject;

