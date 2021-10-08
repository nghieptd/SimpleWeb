import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

import { loginRequest } from "../authConfig";

interface NavbarProps {
  onNewFile?: () => void;
  onNewFolder?: () => void;
}

const Navbar = ({
  onNewFile = () => {},
  onNewFolder = () => {},
}: NavbarProps) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const onLogin = () => {
    // console.log('Loggin in')
    instance.loginRedirect(loginRequest).catch((err) => console.log(err));
  };
  const onLogout = () => {
    instance.logoutRedirect().catch((err) => console.log(err));
  };

  const name = accounts[0]?.name || '';
  return (
    <BootstrapNavbar className="navigation" collapseOnSelect expand="lg">
      <BootstrapNavbar.Toggle aria-controls="basicNavbar" className="ml-auto" />
      <BootstrapNavbar.Collapse id="basicNavbar">
        <Nav>
          <NavDropdown
            title={
              <div className="item-wrap">
                <i className="ms-Icon ms-Icon--Add ms-fontColor-magentaLight"></i>
                <span>New</span>
                <i className="ms-Icon ms-Icon--ChevronDown ms-fontColor-gray120 ms-fontSize-12"></i>
              </div>
            }
            id="newDropdown"
          >
            <NavDropdown.Item onClick={onNewFile}>File</NavDropdown.Item>
            <NavDropdown.Item onClick={onNewFolder}>Folder</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="navbutton"
            title={
              <div className="item-wrap">
                <i className="ms-Icon ms-Icon--Upload ms-fontColor-magentaLight"></i>
                <span>Upload</span>
                <i className="ms-Icon ms-Icon--ChevronDown ms-fontColor-gray120 ms-fontSize-12"></i>
              </div>
            }
            id="uploadDropdown"
          >
            <NavDropdown.Item>From your PC</NavDropdown.Item>
            <NavDropdown.Item>Select from OneDrive</NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <div className="item-wrap">
              <i className="ms-Icon ms-Icon--SyncToPC ms-fontColor-magentaLight"></i>
              <span>Sync</span>
            </div>
          </Nav.Item>
          <Nav.Item>
            <div className="item-wrap">
              <i className="ms-Icon ms-Icon--ExcelDocument excelIcon"></i>
              <span>Export to Excel</span>
            </div>
          </Nav.Item>
          <NavDropdown
            title={
              <div className="item-wrap">
                <i className="ms-Icon ms-Icon--Flow ms-fontColor-magentaLight"></i>
                <span>Flow</span>
                <i className="ms-Icon ms-Icon--ChevronDown ms-fontColor-gray120 ms-fontSize-12"></i>
              </div>
            }
            id="flowDropdown"
          >
            <NavDropdown.Item>Flow 1</NavDropdown.Item>
            <NavDropdown.Item>Flow 2</NavDropdown.Item>
            <NavDropdown.Item>Flow 3</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <>
              <Nav.Item>Logged in as {name}</Nav.Item>
              <Nav.Item onClick={onLogout}>Logout</Nav.Item>
            </>
          ) : (
            <Nav.Item onClick={onLogin}>Login</Nav.Item>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
