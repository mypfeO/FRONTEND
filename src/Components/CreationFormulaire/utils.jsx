// src/Components/utils.js

import { v4 as uuidv4 } from 'uuid';
import { encode } from 'base64-arraybuffer';

export const normalizeData = (bodyItems) => {
  return bodyItems.map(item => ({
    ...item,
    id: uuidv4(),
    titre: item.titre,
    Required: item.Required || false,
  }));
};

export const constructPayload = (formTitle, formFooter, bodyItems, design, siteWebId) => {
  const body = bodyItems.map(item => ({
    titre: item.titre,
    type: item.type,
    respenseText: item.respenseText,
    required: item.Required || false,
  }));
  const footer = formFooter.map(item => ({
    titre: item.titre,
    linkNextForm: item.linkNextForm
  }));
  return {
     siteWebId, // Replace with actual site web ID
    formulaire: {
      head: {
        title: formTitle
      },
      body: body,
      footer: footer
    },
    excelFileLink: design.excelFileLink,
    codeBoard:design.codeBoard,
    design: {
      productImages: design.productImages,
      backgroundColor: design.backgroundColor,
      logo: design.logo,
      
    }
  };
};

export const encodeFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const base64String = encode(reader.result);
      resolve(base64String);
    };
    reader.onerror = reject;
  });
};

export const encodeMultipleFilesToBase64 = async (files) => {
  const base64Promises = files.map(file => encodeFileToBase64(file));
  return Promise.all(base64Promises);
};

export const base64ToBlob = (base64, mimeType) => {
  const byteString = atob(base64.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
};
