import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Content } from '../models/Content';

interface DocumentsProps {
  data?: Array<Content>;
  onEdit(content?: Content): void
};

const Documents = ({ data = [], onEdit = () => {}}: DocumentsProps) => {
  const getTypeClasses = (type: string | undefined): string => {
    const prefix = 'ms-Icon ms-Icon--';
    switch (type) {
      case 'folder':
        return `${prefix}FabricFolderFill`;
      case 'xlsx':
        return `${prefix}ExcelDocument excelType`;
      default:
        return `${prefix}SurveyQuestions`;
    }
  };

  return (
    <Container fluid>
      <h4 className="header-h4">Documents</h4>
      <div>
        <Table className="custom-table" id="table-desktop">
          <thead>
            <tr>
              <th scope="col" className="typeCell">
                <i className="ms-Icon ms-Icon--TextDocument"></i>
              </th>
              <th scope="col" className="headerClickable">
                Name
                <i className="ms-Icon ms-Icon--ChevronDown ms-fontColor-gray120 ms-fontSize-12"></i>
              </th>
              <th scope="col" className="headerClickable">
                Modified
                <i className="ms-Icon ms-Icon--ChevronDown ms-fontColor-gray120 ms-fontSize-12"></i>
              </th>
              <th scope="col" className="headerClickable">
                Modified By
                <i className="ms-Icon ms-Icon--ChevronDown ms-fontColor-gray120 ms-fontSize-12"></i>
              </th>
              <th scope="col" className="headerClickable">
                <i className="ms-Icon ms-Icon--Add ms-fontColor-gray120 ms-fontSize-12"></i>
                Add column
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} onClick={() => onEdit(item)}>
                <td className="typeCell">
                  <i className={getTypeClasses(item.type)}></i>
                </td>
                <td>
                  <a role="button">{item.name}</a>
                </td>
                <td className="modifiedCell">{item.updatedAt}</td>
                <td className="modByCell">{item.updatedBy}</td>
                <td />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Documents;