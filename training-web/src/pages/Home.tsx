import React, { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

import Navbar from "../components/Navbar";
import Documents from "../components/Documents";
import ContentModal from "../components/ContentModal";
import { Content } from "../models/Content";
import {
  getContents,
  addContent,
  updateContent,
  deleteContent,
} from "../api/Content";
import { loginRequest } from "../authConfig";

const Home = () => {
  const [documents, setDocuments] = useState<Array<Content>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [folderMode, setFolderMode] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<Content>();
  const [token, setToken] = useState("");
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const fetchData = async () => {
    const resData = await getContents();
    setDocuments(resData);
  };

  useEffect(() => {
    if (isAuthenticated && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent({
          account: accounts[0],
          scopes: loginRequest.scopes,
        })
        .then((res) => setToken(res.accessToken));
    }
  }, [isAuthenticated, accounts, inProgress, instance]);
  useEffect(() => {
    fetchData();
  }, []);

  const onNewFileModal = () => {
    setFolderMode(false);
    setEditContent(undefined);
    setOpenModal(true);
  };
  const onNewFolderModal = () => {
    setFolderMode(true);
    setEditContent(undefined);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setEditContent(undefined);
  }
  const onEditModal = (content: Content) => {
    setEditContent(content);
    setOpenModal(true);
  };
  const onSaveModal = async (content?: any) => {
    if (!isAuthenticated) {
      onCloseModal();
      alert("Please login first");
      return;
    }
    if (!token) {
      onCloseModal();
      alert("Missing token");
      return;
    }

    const name = accounts[0]?.name || "";
    const timestamp = new Date();
    try {
      if (editContent) {
        await updateContent(
          {
            ...editContent,
            name: content.name,
            updatedBy: name,
            updatedAt: timestamp.toISOString(),
          },
          token
        );
      } else {
        await addContent(
          {
            name: content.name,
            type: folderMode ? "folder" : content.type,
            owner: name,
            updatedBy: name,
            updatedAt: timestamp.toISOString(),
          },
          token
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      onCloseModal();
      fetchData();
    }
  };
  const onDeleteModal = async () => {
    if (!isAuthenticated) {
      onCloseModal();
      alert("Please login first");
      return;
    }
    if (!token) {
      onCloseModal();
      alert("Missing token");
      return;
    }

    try {
      if (editContent) {
        await deleteContent(editContent, token);
      }
    } catch (err) {
      console.log(err);
    } finally {
      onCloseModal();
      fetchData();
    }
  };

  return (
    <div className="App">
      <Navbar onNewFile={onNewFileModal} onNewFolder={onNewFolderModal} />
      <Documents onEdit={onEditModal} data={documents} />
      <ContentModal
        open={openModal}
        editMode={Boolean(editContent)}
        folderMode={folderMode}
        content={editContent}
        onClose={onCloseModal}
        onSave={onSaveModal}
        onDelete={onDeleteModal}
      />
    </div>
  );
};

export default Home;
