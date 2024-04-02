/*import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminCreate = () => {

    const[id,idchange]=useState("");
    const[type,typechange]=useState("");
    const[name,namechange]=useState("");
    
    const[methods,methodschange]=useState("");
    const[author,authorchange]=useState("");
    const[url,urlchange]=useState("");
    const[ingredients,ingredientschange]=useState("");
    const[itemdetails,itemdetailschange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const recdata={name,type,ingredients,itemdetails,active};
      

      fetch("http://localhost:8000/recipies",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(recdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/RecListing');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Recipies Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                  

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>type</label>
                                            <input required value={type} onMouseDown={e=>valchange(true)} onChange={e=>typechange(e.target.value)} className="form-control"></input>
                                        {type.length==0 && validation && <span className="text-danger">Enter the type</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e=>namechange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                   

                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>url Details</label>
                                            <input value={url} onChange={e=>urlchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>


                                  

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Iteam Details</label>
                                            <input value={itemdetails} onChange={e=>itemdetailschange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ingredients</label>
                                            <input value={author} onChange={e=>authorchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ingredients</label>
                                            <input value={ingredients} onChange={e=>ingredientschange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Methods</label>
                                            <input value={methods} onChange={e=>methodschange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                        <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label  className="form-check-label">Is Active</label>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/RecListing" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AdminCreate;*/



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminCreate = () => {
  const [type, setType] = useState("");
  const [Name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [Description, setDescription] = useState("");
  const [Author, setAuthor] = useState("");
  const [Ingredients, setIngredients] = useState("");
  const [Method, setMethod] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    if (!type.trim()) {
      alert("Please enter the type.");
      return;
    }

    if (!Name.trim()) {
      alert("Please enter the name.");
      return;
    }

    // Prepare the recipe data to be sent to the server
    const recdata = {
      type,
      Name,
      url,
      Description,
      Author,
      Ingredients,
      Method,
    };

    // Send the recipe data to the server
    fetch("http://localhost:8000/recipies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(recdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Recipe created successfully:", data);
        alert("Recipe saved successfully.");
        navigate('/AdminList'); // Redirect to recipe listing page after successful submission
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Recipes Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Type</label>
                      <input
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>URL Details</label>
                      <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Author</label>
                      <input
                        value={Author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Ingredients</label>
                      <input
                        value={Ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Method</label>
                      <input
                        value={Method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/AdminList" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreate;
