import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import {
  BsGraphUpArrow,
  BsGraphUp,
  BsFillFileEarmarkTextFill,
  BsBasket,
  BsArrowDownRight,
} from "react-icons/bs";
import moment from "moment";
import DrawerPage from "./DrawerPage";
import "../css/dashboard.css";

const Dashboard = (props) => {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`http://3.16.194.5:8000/api/v1/host/dashboard?p_type=rental`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + cookie.load("token"),
        },
      })
      .then((response) => {
        setDetail(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getCommaSeperator = (value) => {
    return value ? "$ " + value.toLocaleString("en-US") : "$ " + 0;
  };

  const getMoment = (date) => {
    return date ? moment(date).format("MM-DD-YYYY") : "-";
  };

  const getStatus = (status) => {
    return status === "in_progress" ? "In Progress" : status;
  };


  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <DrawerPage /><br/>
      <div className="dashboard_container_card">
        <div className="dashboard_card_content">
          <div className="card">
            <div className="card_heading">
              <h4>TOTAL SALES</h4>
              <h6>
                <BsArrowDownRight />
                100 %
              </h6>
            </div>
            <div className="card_value">
              <h3>{getCommaSeperator(detail?.sales)}</h3>
              <button className="card_value_sale_button">
                <BsGraphUpArrow className="card_value_sale_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard_card_content">
          <div className="card">
            <div className="card_heading">
              <h4>TOTAL REVENUE</h4>
            </div>
            <div className="card_value">
              <h3>{getCommaSeperator(detail?.sales)}</h3>
              <button className="card_value_revenue_button">
                <BsGraphUp className="card_value_revenue_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard_card_content">
          <div className="card">
            <div className="card_heading">
              <h4>PENDING INVOICES</h4>
            </div>
            <div className="card_value">
              <h3>{getCommaSeperator(detail?.invoice)}</h3>
              <button className="card_value_invoice_button">
                <BsFillFileEarmarkTextFill className="card_value_invoice_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard_card_content">
          <div className="card">
            <div className="card_heading">
              <h4>INCOME</h4>
            </div>
            <div className="card_value">
              <h3>{getCommaSeperator(detail?.payout)}</h3>
              <button className="card_value_income_button">
                <BsBasket className="card_value_income_icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard_container_table">
        <div className="dashboard_table_container_1">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Customer</th>
                <th>Requested On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {detail.requests?.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{ele.property.name}</td>
                    <td>
                      {ele.user.name.first} {ele.user.name.last}
                    </td>
                    <td>{getMoment(ele.createdAt)}</td>
                    <td>
                      <b>{getStatus(ele.status)}</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="dashboard_table_container_2">
          <h4>Maintenance</h4>
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Title</th>
                <th>Last Schedule</th>
                <th>Next Schedule</th>
              </tr>
            </thead>
            <tbody>
              {detail.history?.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{ele.property.name}</td>
                    <td>{ele.service_name}</td>
                    <td>{getMoment(ele.createdAt)}</td>
                    <td>{getMoment(ele.service_date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
