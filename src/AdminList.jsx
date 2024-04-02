/*
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminList = () => {
    const [recdata, recdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/recipies/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/recipies/edit/" + id);
    }
    const Removefunction = (id) => {

        
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/recipies/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        fetch("http://localhost:8000/recipies").then((res) => {
            return res.json();
        }).then((resp) => {
            recdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="admin-list-container">
            <div className="card">
                <div className="card-title">
                    <h2>Recipies Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/RecListing/recipies/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td> recipies type</td>
                                <td>Name recipies</td>
                                <td>recipies url</td>
                                
                                <td> item details</td>
                                <td>recipies Author</td>
                                <td> ingredients</td>
                                <td>Methods</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {recdata &&
                                recdata .map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.name}</td>
                                        <td>{item.url}</td>
                                        <td>{item.itemdetails}</td>
                                        <td>{item.Athour}</td>
                                        <td>{item.ingredients}</td>
                                        <td>{item.methods}</td>
                                       
                                       
                                        
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminList;*/
/*

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AdminList.css';

const AdminList = () => {
    const [recdata, recdatachange] = useState(null);
    const navigate = useNavigate();
   
    const LoadDetail = (id) => {
        navigate(`/admin/details/${id}`);
    }
    const LoadEdit = (id) => {
        
        navigate('/AdminEdit' );
    
    }
    const handleNew=(e)=>{
        e.preventDefault();
        navigate('/AdminCreate');
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/recipies/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.');
                // Instead of reloading the page, update the state to reflect the changes
                const updatedRecdata = recdata.filter(item => item.id !== id);
                recdatachange(updatedRecdata);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    };

    useEffect(() => {
        fetch("http://localhost:8000/recipies")
            .then((res) => res.json())
            .then((resp) => {
                recdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="admin-list-container">
            <div className="card">
                <div className="card-title">
                    <h2>Recipes Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link onClick={handleNew} className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Recipes Type</td>
                                <td>Name of Recipe</td>
                               <td>Recipe URL</td>
                                <td>Item Details</td>
                                <td>Recipe Author</td>
                                <td>Ingredients</td>
                                <td>Methods</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {recdata &&
                                recdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.Name}</td>
                                       {/* <td>{item.url}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.Author}</td>
                                        {/*<td>{item.Ingredients}</td>
                                        <td>{item.Method}</td>
                                        <td>
                                            <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminList;*/

/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminList.css';

const AdminList = () => {
  const [recdata, recdatachange] = useState([]);
  
  const navigate = useNavigate();

  

  const handleNew = (e) => {
    e.preventDefault();
    navigate('/AdminCreate');
  };

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch(`http://localhost:8000/recipies/${id}`, {
        method: "DELETE"
      }).then((res) => {
        if (res.ok) {
          alert('Removed successfully.');
          // Instead of reloading the page, update the state to reflect the changes
          const updatedRecdata = recdata.filter(item => item.id !== id);
          recdatachange(updatedRecdata);
        } else {
          alert('Failed to remove the recipe.');
        }
      }).catch((err) => {
        console.log(err.message);
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/recipies")
      .then((res) => res.json())
      .then((resp) => {
        recdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="admin-list-container">
      <div className="card">
        <div className="card-title">
          <h2>Recipes Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <button onClick={handleNew} className="btn btn-success">Add New (+)</button>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Recipes Type</td>
                <td>Name of Recipe</td>
                <td>Recipe Author</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {recdata.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.Name}</td>
                  <td>{item.Author}</td>
                  <td>
                    <button  className="btn btn-success">Edit</button>
                    <button onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
                    <button className="btn btn-primary">Details</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminList;*/


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './AdminList.css';

const AdminList = () => {
  const [recdata, recdatachange] = useState([]);
  
  const navigate = useNavigate();

  const handleDetails = (e, id) => { // Accept 'id' parameter
    e.preventDefault();
    navigate(`/RecDetails/${id}`); // Pass 'id' as part of the URL
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate(`/RecipeEdit/${id}`);
  };

  const handleNew = (e) => {
    e.preventDefault();
    navigate('/AdminCreate');
  };

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch(`http://localhost:8000/recipies/${id}`, {
        method: "DELETE"
      }).then((res) => {
        if (res.ok) {
          alert('Removed successfully.');
          // Instead of reloading the page, update the state to reflect the changes
          const updatedRecdata = recdata.filter(item => item.id !== id);
          recdatachange(updatedRecdata);
        } else {
          alert('Failed to remove the recipe.');
        }
      }).catch((err) => {
        console.log(err.message);
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/recipies")
      .then((res) => res.json())
      .then((resp) => {
        recdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="admin-list-container">
      <div className="card">
        <div className="card-title">
          <h2>Recipes Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <button onClick={handleNew} className="btn btn-success">Add New (+)</button>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Recipes Type</td>
                <td>Name of Recipe</td>
                <td>Recipe Author</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {recdata.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.Name}</td>
                  <td>{item.Author}</td>
                  <td>
                    <button onClick={(e) => handleEdit(e, item.id)} className="btn btn-success">Edit</button>
                    <button onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
                    <button onClick={(e) => handleDetails(e, item.id)} className="btn btn-primary">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
