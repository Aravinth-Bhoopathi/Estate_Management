import React, { useState } from "react";
import { Button, Drawer, Space, Image, Radio } from "antd";
import image_1 from "../image/task.png";
import image_2 from "../image/money.png";
import "../css/drawer.css";

const DrawerPage = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [assign, setAssign] = useState("");

  console.log(assign);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </Button>
      <Drawer
        title="Assign Request"
        placement="right"
        closable={false}
        open={open}
        extra={
          <Space>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </Space>
        }
      >
        {step === 1 && (
          <div>
            <p className="drawer-ptag">
              To whom do you wandt to assign this work??
            </p>
            <div className="drawer-image">
              <Image width={250} src={image_1} />
            </div>
            <div>
              <Radio.Group
                value={assign}
                onChange={(e) => {
                  setAssign(e.target.value);
                }}
              >
                <Radio value={"myself"} className="drawer-content">
                  Assign to myself
                </Radio>
                <Radio value={"contractor"} className="drawer-content">
                  Assign to contractor
                </Radio>
              </Radio.Group>
              <div className="drawer-nav-button">
                <Button
                  type="link"
                  className="drawer-back"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  className="drawer-next"
                  onClick={() => {
                    setStep(step + 1);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="drawer-ptag">
              Who Should Pay the bill for this request?
            </p>
            <div className="drawer-image">
              <Image width={250} src={image_2} />
            </div>
            <div>
              <Radio.Group
                value={assign}
                onChange={(e) => {
                  setAssign(e.target.value);
                }}
              >
                <Radio value={"myself"} className="drawer-content">
                  I'll will pay the money
                </Radio>
                <Radio value={"contractor"} className="drawer-content">
                  Customer should pay the money
                </Radio>
              </Radio.Group>
              <div className="drawer-nav-button">
                <Button
                  type="link"
                  className="drawer-back"
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  Back
                </Button>
                {assign === "myself" ? (
                  <Button type="primary" className="drawer-next">
                    Assign
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className="drawer-next"
                    onClick={() => {
                      setStep(step + 1);
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <p className="drawer-ptag">Select the contractor for the work</p>
            <div className="drawer-nav-button">
              <Button
                type="link"
                className="drawer-back"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                Back
              </Button>
              {assign === "contractor" && (
                <Button type="primary" className="drawer-next">
                  Assign
                </Button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DrawerPage;
