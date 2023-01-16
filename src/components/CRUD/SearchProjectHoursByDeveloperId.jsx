import React, { useRef, useState } from "react";
import { BASE_URL } from "../../utils/settings";

const Search = (props) => {
  const [projecthours, setProjecthours] = useState({});

  const inputRef = useRef();
  console.log(inputRef.current);

  const DeleteProjecHour = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(BASE_URL + "/api/projecthour/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchProjecthour = async (id) => {
    return fetch(BASE_URL + "/api/projecthour/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProjecthours(data);
        return data;
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h1>search projecthours by developer id</h1>

        <input ref={inputRef} required type="search" placeholder="Search...." />
        <button
          type="submit"
          onClick={async () => {
            console.log(inputRef.current.value);
            inputRef.current.focus();
            console.log(await fetchProjecthour(inputRef.current.value));
          }}
        >
          Submit
        </button>
        <br></br>
        <br></br>
      </form>

      <table className="table table-default">
        <thead className="bg-dark text-white">
          <tr>
            <td>hourspendt</td>
            <td>userstory</td>
            <td>description</td>
            <td>project name</td>
            <td>project description</td>
          </tr>
        </thead>
        <tbody>
          {projecthours.length > 0 &&
            projecthours.map((projecthour) => (
              <tr key={projecthour.id}>
                <td>{projecthour.hoursSpendt}</td>
                <td>{projecthour.userStory}</td>
                <td>{projecthour.description}</td>
                <td>{projecthour.project.name}</td>
                <td>{projecthour.project.description}</td>
                <td><a onClick={() => { LoadEdit(object.index) }} className="btn btn-success">Edit</a>
                    <a onClick={() => { DeleteProjecHour(projecthour.id) }} className="btn btn-danger">Remove</a>
                        {/* <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a> */}
                    </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
