import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../utils/settings';
const  ListOfProjects = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
  
   
  
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
                  <td>Name</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
              {data?.length > 0 && data.map((project) => {
                return (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                    </tr>
                    );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
     
    );
}

export default ListOfProjects;