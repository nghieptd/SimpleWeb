import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { Content } from "../models/Content";

interface ContentModalProps {
  open?: boolean;
  editMode?: boolean;
  folderMode?: boolean;
  content?: Content;
  onSave?: (content?: any) => void;
  onClose?: () => void;
  onDelete?: () => void;
}

const ContentModal = ({
  open = false,
  editMode = false,
  folderMode = false,
  onSave = () => {},
  onClose = () => {},
  onDelete = () => {},
  ...rest
}: ContentModalProps) => {
  const [content, setContent] = useState({
    name: "",
    type: "",
  });

  useEffect(() => {
    if (rest.content) {
      setContent({
        name: rest.content.name,
        type: rest.content.type || '',
      });
    }
  }, [rest.content]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.name) {
      setContent((content) => ({
        ...content,
        [event.target.name]: event.target.value,
      }));
    }
  };

  let title = "";
  let body: React.ReactNode;
  if (editMode) {
    title = "Update content";
    body = (
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={content.name}
            onChange={onFieldChange}
          />
        </Form.Group>
      </Form>
    );
  } else {
    title = `New ${folderMode ? "Folder" : "File"}`;
    body = (
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={content.name}
            onChange={onFieldChange}
          />
        </Form.Group>
        {!folderMode && (
          <Form.Group>
            <Form.Label>File type</Form.Label>
            <Form.Control
              type="text"
              placeholder="File type"
              name="type"
              value={content.type}
              onChange={onFieldChange}
            />
          </Form.Group>
        )}
      </Form>
    );
  }
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {editMode && (
          <Button variant="danger" onClick={onDelete} className="mr-auto">
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSave(content)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContentModal;
