import React, { useState, useEffect } from "react";
import validator from "validator";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import "../css/add_property.css";

const Form = (props) => {
  const [streetName, setStreetName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [homeType, setHomeType] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [bathRoom, setBathRoom] = useState("");
  const [guest, setGuest] = useState("");
  const [price, setPrice] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState({});
  const errors = {};
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://3.16.194.5:8000/api/v1/host/states`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + cookie.load("token"),
        },
      })
      .then((response) => {
        setStateList(response.data.data.states);
      })
      .catch((err) => {
        swal(err.message);
      });
  }, []);

  useEffect(() => {
    if (state) {
      getAllCities();
    }
  }, [state]);

  const getAllCities = () => {
    axios
      .get(`http://3.16.194.5:8000/api/v1/host/cities/${state}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + cookie.load("token"),
        },
      })
      .then((response) => {
        setCityList(response.data.data.cities);
      })
      .catch((err) => {
        swal(err.message);
      });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://3.16.194.5:8000/api/v1/host/properties/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + cookie.load("token"),
          },
        })
        .then((response) => {
          const result = response.data.data.property;
          setStreetName(result.name);
          setState(result.address.state.name);
          setCity(result.address.city.name);
          setZip(result.address.zip);
          setHomeType(result.home_type);
          setRentalType(result.rental_type);
          setBedRoom(JSON.stringify(result.bedrooms));
          setBathRoom(JSON.stringify(result.bathrooms));
          setGuest(JSON.stringify(result.guests));
          setPrice(JSON.stringify(result.price));
        })
        .catch((err) => {
          swal(err.message);
        });
    }
  }, [id]);

  const validate = () => {
    if (streetName.trim().length === 0) {
      errors.streetName = "street_name is required";
    } else if (state.trim().length === 0) {
      errors.state = "state is required";
    } else if (city.trim().length === 0) {
      errors.city = "city is required";
    } else if (zip.trim().length === 0) {
      errors.zip = "zip coed is required";
    } else if (!validator.isNumeric(zip)) {
      errors.zip = "invalid zip code format";
    } else if (homeType.trim().length === 0) {
      errors.homeType = "home_type is required";
    } else if (rentalType.trim().length === 0) {
      errors.rentalType = "rental_type is required";
    } else if (bedRoom <= 0) {
      errors.bedRoom = "bedroom is required";
    } else if (!validator.isNumeric(bedRoom)) {
      errors.bedRoom = "invalid format";
    } else if (bathRoom <= 0) {
      errors.bathRoom = "bathroom is required";
    } else if (!validator.isNumeric(bathRoom)) {
      errors.bathRoom = "invalid format";
    } else if (guest <= 0) {
      errors.guest = "guest is required";
    } else if (!validator.isNumeric(guest)) {
      errors.guest = "invalid format";
    } else if (price <= 0) {
      errors.price = "price is required";
    } else if (!validator.isNumeric(price)) {
      errors.price = "invalid format";
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate();
    const data = {
      name: streetName,
      address: {
        state: { id: state, name: state },
        city: { id: city, name: city },
        zip: zip,
      },
      home_type: homeType,
      rental_type: rentalType,
      bedrooms: parseInt(bedRoom),
      bathrooms: parseInt(bathRoom),
      guests: parseInt(guest),
      price: parseInt(price),
    };

    if (valid) {
      if (id) {
        axios
          .patch(
            `http://3.16.194.5:8000/api/v1/host/properties/update/${id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + cookie.load("token"),
              },
            }
          )
          .then((response) => {
            swal({
              title: "Submitted!",
              icon: "success",
            });
            props.history.push("/properties");
            console.log(response);
          })
          .catch((err) => {
            swal(err.message);
          });
      } else {
        axios
          .post(`http://3.16.194.5:8000/api/v1/host/properties`, data, {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + cookie.load("token"),
            },
          })
          .then((response) => {
            swal({
              title: "Submitted!",
              icon: "success",
            });
            props.history.push("/properties");
            console.log(response);
          })
          .catch((err) => {
            swal(err.message);
          });
      }
    }
    setError(errors);
  };

  return (
    <div className="form_parent">
      <h3>Basic Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form_parent_container">
          <div className="form_child_container">
            <div className="form_child_1">
              <p className="form_child_heading">Street Name&#42;</p>
              <input
                className="form_child_input"
                type="text"
                name="streetName"
                value={streetName}
                placeholder="Street Name"
                onChange={(e) => {
                  setStreetName(e.target.value);
                }}
              />
              {error.streetName && (
                <p className="error_tag"> {error.streetName} </p>
              )}
            </div>
            <div className="form_child_1">
              <p className="form_child_heading">State&#42;</p>
              <select
                className="form_child_input"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option>Select</option>
                {stateList.map((ele) => {
                  return (
                    <option key={ele._id} value={ele.state_id}>
                      {ele.name}
                    </option>
                  );
                })}
              </select>
              {error.state && <p className="error_tag"> {error.state} </p>}
            </div>
            <div className="form_child_1">
              <p className="form_child_heading">City&#42;</p>
              <select
                className="form_child_input"
                name="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option>Select</option>
                {cityList.map((ele, i) => {
                  return <option key={i}>{ele.name}</option>;
                })}
              </select>
              {error.city && <p className="error_tag"> {error.city} </p>}
            </div>
          </div>

          <div className="form_child_container">
            <div className="form_child_1">
              <p className="form_child_heading">ZIP&#42;</p>
              <input
                className="form_child_input"
                type="text"
                name="zip"
                value={zip}
                placeholder="ZIP"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
              {error.zip && <p className="error_tag"> {error.zip} </p>}
            </div>
            <div className="form_child_1">
              <p className="form_child_heading">Home Type&#42;</p>
              <select
                className="form_child_input"
                name="homeType"
                value={homeType}
                onChange={(e) => {
                  setHomeType(e.target.value);
                }}
              >
                <option>Select</option>
                <option>Town House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Single Family Home</option>
                <option>Land</option>
              </select>
              {error.homeType && (
                <p className="error_tag"> {error.homeType} </p>
              )}
            </div>
            <div className="form_child_1">
              <p className="form_child_heading">Rental Type&#42;</p>
              <select
                className="form_child_input"
                name="rentalType"
                value={rentalType}
                onChange={(e) => {
                  setRentalType(e.target.value);
                }}
              >
                <option>Select</option>
                <option>Entire Room</option>
                <option>By Room</option>
              </select>
              {error.rentalType && (
                <p className="error_tag"> {error.rentalType} </p>
              )}
            </div>
          </div>

          <div className="form_child_container">
            <div className="form_child_1">
              <p className="form_child_heading">No of BedRooms&#42;</p>
              <input
                className="form_child_input"
                type="number"
                min="0"
                name="bedRoom"
                value={bedRoom}
                placeholder="No of BedRooms"
                onChange={(e) => {
                  setBedRoom(e.target.value);
                }}
              />
              {error.bedRoom && <p className="error_tag"> {error.bedRoom} </p>}
            </div>
            <div className="form_child_1">
              <p className="form_child_heading">No of BathRooms&#42;</p>
              <input
                className="form_child_input"
                type="number"
                min="0"
                name="bathRoom"
                value={bathRoom}
                placeholder="No of BathRooms"
                onChange={(e) => {
                  setBathRoom(e.target.value);
                }}
              />
              {error.bathRoom && (
                <p className="error_tag"> {error.bathRoom} </p>
              )}
            </div>
            <div className="form_child_1">
              <p className="form_child_heading">No of Guests&#42;</p>
              <input
                className="form_child_input"
                type="number"
                min="0"
                name="guest"
                value={guest}
                placeholder="No of Guests"
                onChange={(e) => {
                  setGuest(e.target.value);
                }}
              />
              {error.guest && <p className="error_tag"> {error.guest} </p>}
            </div>
          </div>

          <div className="form_child_container">
            <div className="form_child_1">
              <p className="form_child_heading">Price&#42;</p>
              <input
                className="form_child_input"
                type="text"
                name="price"
                value={price}
                placeholder="Price(per month)"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              {error.price && <p className="error_tag"> {error.price} </p>}
            </div>
          </div>
          <div className="create_form">
            {id ? (
              <button className="create_form_submit" onChange={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="create_form_submit" onChange={handleSubmit}>
                Create
              </button>
            )}
          </div>
          <Link className="create_form_back" to="/properties">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
