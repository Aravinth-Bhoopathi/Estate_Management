import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import "../css/properties.css";

const Properties = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getProperties = () => {
    axios
      .get(
        `http://3.16.194.5:8000/api/v1/host/properties?page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + cookie.load("token"),
          },
        }
      )
      .then((response) => {
        setData(response.data.data.properties);
      })
      .catch((err) => {
        swal(err.message);
      });
  };

  useEffect(() => {
    getProperties();
  }, [page]);

  const handleEdit = (id) => {
    props.history.push("properties/edit/" + id);
  };

  const handleDelete = (id) => {
    if (id) {
      axios
        .delete(`http://3.16.194.5:8000/api/v1/host/properties/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + cookie.load("token"),
          },
        })
        .then((response) => {
          const result = response.data.success
          if(result){
            getProperties();
            swal({
              title: "Deleted!",
              icon: "success",
            });
          }
          else{
            swal({
              title: "Error!",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          swal(err.message);
        });
    }
  };

  return (
    <div className="properties">
      <div className="properties_head">
        <h2>My Properties</h2>
        <Link className="add_link" to="/properties/add">
          Add
        </Link>
      </div>
      <div className="properties_container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Occupancy</th>
              <th>Room</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((ele) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.name}</td>
                  <td>{ele.address?.city.name}</td>
                  <td>{ele.is_occupied ? "occupied" : "vacent"}</td>
                  <td>{ele.rental_type}</td>
                  <td>{ele.price}</td>
                  <td>
                    <button onClick={() => handleEdit(ele.property_id)}>
                      <BsPencilFill className="icon" />
                    </button>
                    <button onClick={() => handleDelete(ele.property_id)}>
                      <MdDelete className="icon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="nav_button button">
        <button
          disabled={page <= 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          disabled={data.length < limit}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Properties;
