import { Content } from "../models/Content";

const BASE_URL = 'https://localhost:44395/api/contents';

export const getContents = async (): Promise<Array<Content>> => {
  const res = await fetch(BASE_URL);
  const body = await res.json();
  return body;
};

export const addContent = async (content: Content, token: string): Promise<Content> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(content)
  });

  const body = await res.json();
  return body;
};

export const updateContent = async (content: Content, token: string): Promise<void> => {
  await fetch(`${BASE_URL}/${content.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(content)
  });
};

export const deleteContent = async (content: Content, token: string): Promise<void> => {
  await fetch(`${BASE_URL}/${content.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
